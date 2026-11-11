'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { site } from '@/lib/config';
import Reveal from './Reveal';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id='faq' className='section max-w-4xl'>
      <Reveal className='text-center'>
        <span className='eyebrow'>FAQ</span>
        <h2 className='h-display text-4xl sm:text-5xl'>Questions, answered</h2>
      </Reveal>
      <div className='mt-12 divide-y divide-taupe/20 border-y border-taupe/20'>
        {site.faq.map((f, i) => (
          <div key={f.q}>
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className='flex w-full items-center justify-between gap-4 py-6 text-left'>
              <span className='font-serif text-xl text-forest sm:text-2xl'>{f.q}</span>
              <Plus className={`shrink-0 text-forest transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`} />
            </button>
            <div className={`grid transition-all duration-500 ${open === i ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <p className='overflow-hidden text-charcoal/70'>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
