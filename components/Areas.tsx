'use client';
import { useState } from 'react';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/lib/config';
import Reveal from './Reveal';

export default function Areas() {
  const [zip, setZip] = useState('');
  const [res, setRes] = useState<null | boolean | 'bad'>(null);
  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    const z = zip.trim();
    if (z.length !== 5 || [...z].some((c) => c < '0' || c > '9')) return setRes('bad');
    setRes(site.areas.zips.includes(z));
  };
  const c = site.contact;
  return (
    <section id='areas' className='bg-beige/60'>
      <div className='section'>
        <Reveal className='mx-auto max-w-2xl text-center'>
          <span className='eyebrow'>Service Areas</span>
          <h2 className='h-display text-4xl sm:text-5xl'>Where we clean</h2>
        </Reveal>
        <div className='mt-12 grid gap-8 lg:grid-cols-2'>
          <Reveal className='space-y-6'>
            <form onSubmit={lookup} className='rounded-3xl bg-ivory p-6 shadow-sm'>
              <label htmlFor='zip' className='font-serif text-2xl text-forest'>Do we serve your ZIP code?</label>
              <div className='mt-4 flex gap-3'>
                <input id='zip' className='input' inputMode='numeric' maxLength={5} placeholder='Enter ZIP' value={zip} onChange={(e) => { setZip(e.target.value); setRes(null); }} />
                <button className='btn-primary shrink-0'>Check</button>
              </div>
              <div aria-live='polite' className='mt-3 min-h-[1.5rem] text-sm'>
                {res === 'bad' && <span className='text-red-700'>Please enter a valid 5-digit ZIP code.</span>}
                {res === true && <span className='text-forest'>Great news, we serve {zip}. <a href='#quote' className='underline'>Get your quote</a>.</span>}
                {res === false && <span className='text-charcoal/80'>We do not list {zip} yet, but call us at <a href={`tel:${c.phoneHref}`} className='underline'>{c.phone}</a> and we will check.</span>}
              </div>
            </form>
            <div className='grid gap-4 sm:grid-cols-2'>
              {site.areas.cities.map((a) => (
                <div key={a.city} className='rounded-2xl bg-ivory p-5'>
                  <h3 className='font-serif text-xl text-forest'>{a.city}</h3>
                  <p className='mt-1 text-sm text-charcoal/70'>{a.neighborhoods.join(' / ')}</p>
                </div>
              ))}
            </div>
            <ul className='space-y-2 text-sm'>
              <li className='flex gap-3'><Phone size={18} className='text-forest' /><a href={`tel:${c.phoneHref}`}>{c.phone}</a></li>
              <li className='flex gap-3'><Mail size={18} className='text-forest' /><a href={`mailto:${c.email}`}>{c.email}</a></li>
              <li className='flex gap-3'><MapPin size={18} className='text-forest' />{c.address}</li>
              <li className='flex gap-3'><Clock size={18} className='text-forest' />{site.hours[0].days}: {site.hours[0].time}</li>
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <iframe title='Service area map' loading='lazy' referrerPolicy='no-referrer-when-downgrade' className='h-full min-h-[420px] w-full rounded-3xl border-0 shadow-md' src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
