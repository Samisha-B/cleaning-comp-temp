'use client';
import { useState } from 'react';
import { site } from '@/lib/config';
import Img from './Img';
import Reveal from './Reveal';

const beforeFilter = 'grayscale(0.7) brightness(0.72) contrast(0.9) sepia(0.35) blur(0.6px)';

function Compare({ src, title }: { src: string; title: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className='relative aspect-[4/3] select-none overflow-hidden rounded-3xl bg-beige shadow-md'>
      <Img src={src} alt={`${title} after cleaning`} className='absolute inset-0 h-full w-full' />
      <div className='absolute inset-0' style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img src={src} alt={`${title} before cleaning`} className='h-full w-full' style={{ filter: beforeFilter }} />
      </div>
      <span className='absolute left-3 top-3 rounded-full bg-charcoal/70 px-3 py-1 text-xs text-ivory'>Before</span>
      <span className='absolute right-3 top-3 rounded-full bg-forest/80 px-3 py-1 text-xs text-ivory'>After</span>
      <div className='pointer-events-none absolute inset-y-0 w-0.5 bg-ivory shadow' style={{ left: `${pos}%` }}>
        <span className='absolute top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-ivory text-forest shadow-lg'>&#8596;</span>
      </div>
      <input type='range' min={0} max={100} value={pos} onChange={(e) => setPos(+e.target.value)} aria-label={`Compare before and after: ${title}`} className='absolute inset-0 h-full w-full cursor-ew-resize opacity-0' />
    </div>
  );
}

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const cats = ['All', ...site.gallery.categories];
  const items = site.gallery.items.filter((i) => cat === 'All' || i.category === cat);
  return (
    <section id='gallery' className='bg-sage-light/50'>
      <div className='section'>
        <Reveal className='mx-auto max-w-2xl text-center'>
          <span className='eyebrow'>Before & After</span>
          <h2 className='h-display text-4xl sm:text-5xl'>See the difference</h2>
          <p className='mt-4 text-charcoal/70'>Drag the slider to reveal each transformation.</p>
        </Reveal>
        <div className='mt-8 flex flex-wrap justify-center gap-2'>
          {cats.map((c) => <button key={c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2 text-sm transition ${cat === c ? 'bg-forest text-ivory' : 'bg-ivory text-charcoal/70 hover:bg-white'}`}>{c}</button>)}
        </div>
        <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {items.map((i) => (
            <Reveal key={i.id}>
              <Compare src={i.img} title={i.title} />
              <p className='mt-3 font-serif text-xl text-forest'>{i.title}</p>
              <p className='text-xs uppercase tracking-widest text-taupe'>{i.category}</p>
            </Reveal>
          ))}
          {items.length === 0 && <p className='col-span-full text-center text-taupe'>No projects in this category yet.</p>}
        </div>
        <p className='mt-8 text-center text-xs text-taupe'>{site.gallery.note}</p>
      </div>
    </section>
  );
}
