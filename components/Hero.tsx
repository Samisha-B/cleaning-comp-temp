import { Check, Star } from 'lucide-react';
import { site } from '@/lib/config';
import Img from './Img';
import Reveal from './Reveal';

export default function Hero() {
  const h = site.hero;
  return (
    <section id='home' className='mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-2 lg:pt-36'>
      <Reveal>
        <span className='eyebrow'>{h.eyebrow}</span>
        <h1 className='h-display text-5xl sm:text-6xl lg:text-7xl'>{h.headline}</h1>
        <p className='mt-6 max-w-lg text-lg leading-relaxed text-charcoal/75'>{h.text}</p>
        <div className='mt-9 flex flex-wrap gap-4'>
          <a href='#quote' className='btn-primary'>Get a Free Quote</a>
          <a href='#services' className='btn-ghost'>Explore Our Services</a>
        </div>
        <ul className='mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-7'>
          {h.trust.map((t) => (
            <li key={t} className='flex items-center gap-2 text-sm text-charcoal/80'>
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-sage-light text-forest'><Check size={12} /></span>{t}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={150} className='relative'>
        <Img src={h.image} alt='Spotless modern living room' eager className='aspect-[4/5] w-full rounded-[2rem] shadow-2xl sm:aspect-[5/5]' />
        <div className='absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl bg-ivory p-4 shadow-xl sm:-left-6'>
          <div className='font-serif text-4xl text-forest'>{h.badge.stat}</div>
          <div>
            <div className='flex text-sage'>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={14} fill='currentColor' />)}</div>
            <div className='text-xs text-taupe'>{h.badge.label}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
