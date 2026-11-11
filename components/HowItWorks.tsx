import { site } from '@/lib/config';
import Reveal from './Reveal';

export default function HowItWorks() {
  return (
    <section id='how' className='section'>
      <Reveal className='mx-auto max-w-2xl text-center'>
        <span className='eyebrow'>How It Works</span>
        <h2 className='h-display text-4xl sm:text-5xl'>Three simple steps</h2>
      </Reveal>
      <div className='relative mt-14 grid gap-10 md:grid-cols-3'>
        <div className='absolute left-[16%] right-[16%] top-8 hidden border-t border-dashed border-taupe/40 md:block' />
        {site.steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 120} className='relative text-center'>
            <span className='relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest font-serif text-2xl text-ivory'>{s.n}</span>
            <h3 className='mt-5 font-serif text-2xl text-forest'>{s.title}</h3>
            <p className='mx-auto mt-2 max-w-xs text-sm text-charcoal/70'>{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
