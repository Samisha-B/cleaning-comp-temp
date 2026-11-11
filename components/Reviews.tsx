'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { site } from '@/lib/config';
import Reveal from './Reveal';

export default function Reviews() {
  const items = site.reviews.items;
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  const go = (n: number) => setI((n + items.length) % items.length);
  useEffect(() => {
    if (pause) return;
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 6000);
    return () => clearInterval(t);
  }, [pause, items.length]);
  return (
    <section id='reviews' className='bg-forest text-ivory'>
      <div className='section text-center' onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)}>
        <Reveal>
          <span className='eyebrow !text-sage'>Reviews</span>
          <h2 className='font-serif text-4xl font-medium sm:text-5xl'>Loved by our neighbors</h2>
        </Reveal>
        <div className='mx-auto mt-12 max-w-3xl overflow-hidden'>
          <div className='flex transition-transform duration-700 ease-out' style={{ transform: `translateX(-${i * 100}%)` }}>
            {items.map((r) => (
              <figure key={r.name} className='w-full shrink-0 px-2'>
                <div className='flex justify-center text-sage'>{Array.from({ length: r.rating }).map((_, k) => <Star key={k} size={20} fill='currentColor' />)}</div>
                <blockquote className='mt-6 font-serif text-2xl leading-snug sm:text-3xl'>{r.text}</blockquote>
                <figcaption className='mt-6 text-sm tracking-wide text-sage'>{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className='mt-10 flex items-center justify-center gap-4'>
          <button onClick={() => go(i - 1)} aria-label='Previous review' className='rounded-full border border-ivory/30 p-2 transition hover:bg-ivory hover:text-forest'><ChevronLeft size={20} /></button>
          <div className='flex gap-2'>{items.map((_, k) => <button key={k} onClick={() => go(k)} aria-label={`Review ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-ivory' : 'w-2 bg-ivory/40'}`} />)}</div>
          <button onClick={() => go(i + 1)} aria-label='Next review' className='rounded-full border border-ivory/30 p-2 transition hover:bg-ivory hover:text-forest'><ChevronRight size={20} /></button>
        </div>
        <a href={site.reviews.reviewUrl} target='_blank' rel='noopener noreferrer' className='mt-10 inline-flex rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-forest transition hover:-translate-y-0.5 hover:shadow-lg'>Leave Us a Review</a>
        <p className='mt-6 text-xs text-ivory/50'>{site.reviews.note}</p>
      </div>
    </section>
  );
}
