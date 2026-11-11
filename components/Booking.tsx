'use client';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { site } from '@/lib/config';
import { estimate, money } from '@/lib/pricing';
import Reveal from './Reveal';

const init = { service: '', property: 'House', beds: 2, baths: 2, sqft: 1500, depth: 'standard', freq: 'once', addons: [] as string[], name: '', email: '', phone: '', address: '', zip: '', date: '', slot: '', notes: '' };
type F = typeof init;
const steps = ['Service', 'Property', 'Preferences', 'Extras', 'Your details', 'Review'];
const digits = (s: string) => [...s].filter((c) => c >= '0' && c <= '9').join('');
const okEmail = (s: string) => { const i = s.indexOf('@'); return i > 0 && s.indexOf('.', i) > i + 1 && s.indexOf(' ') < 0 && !s.endsWith('.'); };

function check(f: F, s: number) {
  const e: Record<string, string> = {};
  const today = new Date().toISOString().slice(0, 10);
  if (s === 0 && !f.service) e.service = 'Please choose a service to continue.';
  if (s === 1 && (!(f.sqft >= 300 && f.sqft <= 20000))) e.sqft = 'Enter square footage between 300 and 20,000.';
  if (s === 4) {
    if (f.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!okEmail(f.email)) e.email = 'Enter a valid email address.';
    const d = digits(f.phone);
    if (d.length < 10 || d.length > 11) e.phone = 'Enter a valid 10-digit US phone number.';
    if (f.address.trim().length < 5) e.address = 'Please enter the property address.';
    if (digits(f.zip).length !== 5 || f.zip.trim().length !== 5) e.zip = 'Enter a 5-digit ZIP code.';
    if (!f.date) e.date = 'Choose a preferred date.';
    else if (f.date < today) e.date = 'Date cannot be in the past.';
    if (!f.slot) e.slot = 'Choose a preferred time slot.';
  }
  return e;
}

function Field({ label, err, children }: { label: string; err?: string; children: React.ReactNode }) {
  return (
    <label className='block'>
      <span className='mb-1.5 block text-sm font-medium text-forest'>{label}</span>
      {children}
      {err && <span role='alert' className='mt-1 block text-xs text-red-700'>{err}</span>}
    </label>
  );
}

function Choice({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type='button' onClick={onClick} aria-pressed={on} className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${on ? 'border-forest bg-forest text-ivory' : 'border-taupe/30 bg-white hover:border-forest'}`}>{children}</button>
  );
}

export default function Booking() {
  const [f, setF] = useState<F>(init);
  const [step, setStep] = useState(0);
  const [err, setErr] = useState<Record<string, string>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [delivered, setDelivered] = useState(false);
  const [fail, setFail] = useState('');
  const set = (p: Partial<F>) => setF((x) => ({ ...x, ...p }));
  const est = estimate(f);
  const svc = site.services.find((s) => s.id === f.service);

  useEffect(() => {
    const h = (e: Event) => { const id = (e as CustomEvent).detail as string; setF((x) => ({ ...x, service: id, depth: id === 'deep' ? 'deep' : x.depth })); setStep(1); setErr({}); };
    window.addEventListener('select-service', h);
    return () => window.removeEventListener('select-service', h);
  }, []);

  const next = () => { const e = check(f, step); setErr(e); if (!Object.keys(e).length) setStep(step + 1); };
  const submit = async () => {
    const e = { ...check(f, 0), ...check(f, 1), ...check(f, 4) };
    if (Object.keys(e).length) { setErr(e); setStep(check(f, 0).service ? 0 : check(f, 1).sqft ? 1 : 4); return; }
    setState('sending'); setFail('');
    try {
      const r = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, serviceName: svc?.title, estimate: est.total, business: site.brand.name }) });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || 'Something went wrong.');
      setDelivered(!!j.delivered); setState('done');
    } catch (x: any) { setFail(x.message || 'Something went wrong.'); setState('idle'); }
  };
  const reset = () => { setF(init); setStep(0); setState('idle'); setErr({}); };

  return (
    <section id='quote' className='bg-beige/60'>
      <div className='section'>
        <Reveal className='mx-auto max-w-2xl text-center'>
          <span className='eyebrow'>Free Quote</span>
          <h2 className='h-display text-4xl sm:text-5xl'>Get your instant estimate</h2>
          <p className='mt-4 text-charcoal/70'>Answer a few quick questions. We will review your request and confirm your final quote.</p>
        </Reveal>
        <Reveal className='mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] bg-ivory shadow-xl'>
          {state === 'done' ? (
            <div className='px-6 py-16 text-center sm:px-16'>
              <span className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sage-light text-forest'><Check size={30} /></span>
              <h3 className='h-display mt-6 text-4xl'>Thank you, {f.name.split(' ')[0]}.</h3>
              {delivered ? (
                <p className='mx-auto mt-4 max-w-lg text-charcoal/75'>We have received your quote request for {svc?.title}. Our team will contact you at {f.email} shortly to confirm details and your final price. <strong>This is not yet a confirmed booking.</strong></p>
              ) : (
                <p className='mx-auto mt-4 max-w-lg rounded-xl bg-beige p-4 text-sm text-charcoal/75'>Demo mode: no form backend is connected yet, so this request was not sent to a business. Set FORM_ENDPOINT to receive real requests.</p>
              )}
              <p className='mt-4 text-sm text-taupe'>Estimated range: {money(est.low)} - {money(est.high)} (estimate only)</p>
              <button onClick={reset} className='btn-ghost mt-8'>Start another request</button>
            </div>
          ) : (
            <div className='grid lg:grid-cols-[1fr_300px]'>
              <div className='p-6 sm:p-10'>
                <ol className='mb-8 flex gap-1.5' aria-label='Progress'>
                  {steps.map((s, i) => <li key={s} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-forest' : 'bg-taupe/20'}`} title={s} />)}
                </ol>
                <p className='text-xs uppercase tracking-widest text-taupe'>Step {step + 1} of {steps.length}</p>
                <h3 className='mb-6 font-serif text-3xl text-forest'>{['Select your service', 'About your property', 'Cleaning preferences', 'Additional services', 'Your details', 'Review your request'][step]}</h3>

                {step === 0 && (
                  <div>
                    <div className='grid gap-3 sm:grid-cols-2'>
                      {site.services.map((s) => <Choice key={s.id} on={f.service === s.id} onClick={() => set({ service: s.id, depth: s.id === 'deep' ? 'deep' : f.depth })}>{s.title}</Choice>)}
                    </div>
                    {err.service && <p role='alert' className='mt-3 text-xs text-red-700'>{err.service}</p>}
                  </div>
                )}

                {step === 1 && (
                  <div className='space-y-5'>
                    <div className='grid grid-cols-2 gap-3'>{site.propertyTypes.map((p) => <Choice key={p} on={f.property === p} onClick={() => set({ property: p })}>{p}</Choice>)}</div>
                    <div className='grid gap-4 sm:grid-cols-3'>
                      <Field label='Bedrooms'><select className='input' value={f.beds} onChange={(e) => set({ beds: +e.target.value })}>{[0, 1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n === 0 ? 'Studio / none' : n}</option>)}</select></Field>
                      <Field label='Bathrooms'><select className='input' value={f.baths} onChange={(e) => set({ baths: +e.target.value })}>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}</select></Field>
                      <Field label='Approx. square feet' err={err.sqft}><input type='number' className='input' value={f.sqft || ''} min={300} max={20000} onChange={(e) => set({ sqft: +e.target.value })} /></Field>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className='space-y-6'>
                    <div><p className='mb-2 text-sm font-medium text-forest'>Cleaning level</p><div className='grid grid-cols-2 gap-3'><Choice on={f.depth === 'standard'} onClick={() => set({ depth: 'standard' })}>Standard cleaning</Choice><Choice on={f.depth === 'deep'} onClick={() => set({ depth: 'deep' })}>Deep cleaning</Choice></div></div>
                    <div><p className='mb-2 text-sm font-medium text-forest'>Frequency</p><div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>{site.frequencies.map((q) => <Choice key={q.id} on={f.freq === q.id} onClick={() => set({ freq: q.id })}>{q.label}{site.pricing.frequencyDiscount[q.id] ? <span className='block text-xs opacity-70'>Save {Math.round(site.pricing.frequencyDiscount[q.id] * 100)}%</span> : null}</Choice>)}</div></div>
                  </div>
                )}

                {step === 3 && (
                  <div className='grid gap-3 sm:grid-cols-2'>
                    {site.pricing.addons.map((a) => {
                      const on = f.addons.includes(a.id);
                      return <Choice key={a.id} on={on} onClick={() => set({ addons: on ? f.addons.filter((x) => x !== a.id) : [...f.addons, a.id] })}>{a.label}<span className='block text-xs opacity-70'>+{money(a.price)}</span></Choice>;
                    })}
                  </div>
                )}

                {step === 4 && (
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <Field label='Full name' err={err.name}><input className='input' autoComplete='name' value={f.name} onChange={(e) => set({ name: e.target.value })} /></Field>
                    <Field label='Email' err={err.email}><input type='email' className='input' autoComplete='email' value={f.email} onChange={(e) => set({ email: e.target.value })} /></Field>
                    <Field label='Phone number' err={err.phone}><input type='tel' className='input' autoComplete='tel' value={f.phone} onChange={(e) => set({ phone: e.target.value })} /></Field>
                    <Field label='ZIP code' err={err.zip}><input className='input' inputMode='numeric' maxLength={5} autoComplete='postal-code' value={f.zip} onChange={(e) => set({ zip: e.target.value })} /></Field>
                    <div className='sm:col-span-2'><Field label='Property address' err={err.address}><input className='input' autoComplete='street-address' value={f.address} onChange={(e) => set({ address: e.target.value })} /></Field></div>
                    <Field label='Preferred date' err={err.date}><input type='date' className='input' min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={(e) => set({ date: e.target.value })} /></Field>
                    <Field label='Preferred time slot' err={err.slot}><select className='input' value={f.slot} onChange={(e) => set({ slot: e.target.value })}><option value=''>Select a time</option>{site.timeSlots.map((t) => <option key={t}>{t}</option>)}</select></Field>
                    <div className='sm:col-span-2'><Field label='Additional instructions (optional)'><textarea rows={3} className='input' value={f.notes} onChange={(e) => set({ notes: e.target.value })} /></Field></div>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    <dl className='divide-y divide-taupe/15 rounded-2xl bg-white px-5 text-sm'>
                      {[
                        ['Service', svc?.title], ['Property', `${f.property}, ${f.beds} bed, ${f.baths} bath, ${f.sqft} sq ft`],
                        ['Cleaning', `${f.depth === 'deep' ? 'Deep' : 'Standard'}, ${site.frequencies.find((q) => q.id === f.freq)?.label}`],
                        ['Add-ons', f.addons.length ? f.addons.map((id) => site.pricing.addons.find((a) => a.id === id)?.label).join(', ') : 'None'],
                        ['Contact', `${f.name} | ${f.email} | ${f.phone}`], ['Address', `${f.address}, ${f.zip}`], ['Preferred time', `${f.date} | ${f.slot}`], ['Notes', f.notes || 'None']
                      ].map(([k, v]) => <div key={k} className='flex flex-col gap-1 py-3 sm:flex-row sm:gap-6'><dt className='w-32 shrink-0 text-taupe'>{k}</dt><dd>{v}</dd></div>)}
                    </dl>
                    <p className='mt-4 rounded-xl bg-beige p-4 text-sm'>Estimated price: <strong>{money(est.low)} - {money(est.high)}</strong>. This is an estimate, not a guaranteed final quote. Submitting sends a request; it is not a confirmed booking.</p>
                    {fail && <p role='alert' className='mt-3 text-sm text-red-700'>{fail}</p>}
                  </div>
                )}

                <div className='mt-8 flex items-center justify-between'>
                  <button onClick={() => { setErr({}); setStep(step - 1); }} disabled={step === 0} className='flex items-center gap-2 text-sm text-forest disabled:invisible'><ArrowLeft size={16} /> Back</button>
                  {step < 5 ? <button onClick={next} className='btn-primary'>Continue <ArrowRight size={16} /></button> : <button onClick={submit} disabled={state === 'sending'} className='btn-primary disabled:opacity-60'>{state === 'sending' ? 'Sending...' : 'Request My Quote'}</button>}
                </div>
              </div>
              <aside className='bg-forest p-8 text-ivory'>
                <p className='text-xs uppercase tracking-widest text-sage'>Estimated price</p>
                <p className='mt-3 font-serif text-5xl'>{f.service ? money(est.total) : '--'}</p>
                {f.service && <p className='mt-1 text-sm text-sage'>Range {money(est.low)} - {money(est.high)}</p>}
                <p className='mt-6 text-xs leading-relaxed text-ivory/70'>Estimate only, not a guaranteed final quote. Final pricing is confirmed after we review your property details.</p>
                {svc && <p className='mt-6 border-t border-ivory/20 pt-4 text-sm'>{svc.title}</p>}
              </aside>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
