'use client';
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { site } from '@/lib/config';
import Img from './Img';
import Reveal from './Reveal';

const tabs = ['All', 'Residential', 'Commercial'];

export default function Services() {
  const [tab, setTab] = useState('All');
  const [open, setOpen] = useState<string | null>(null);
  const list = site.services.filter((s) => tab === 'All' || s.category === tab);
  const book = (id: string) => {
    window.dispatchEvent(new CustomEvent('select-service', { detail: id }));
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section id='services' className='section'>
      <Reveal className='mx-auto max-w-2xl text-center'>
        <span className='eyebrow'>Our Services</span>
        <h2 className='h-display text-4xl sm:text-5xl'>Care for every kind of space</h2>
      </Reveal>
      <div className='mt-8 flex justify-center gap-2'>
        {tabs.map((t) => (
          <button key={t} onClick={() => { setTab(t); setOpen(null); }} className={`rounded-full px-5 py-2 text-sm transition ${tab === t ? 'bg-forest text-ivory' : 'bg-beige text-charcoal/70 hover:bg-sage-light'}`}>{t}</button>
        ))}
      </div>
      <div className='mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {list.map((s) => (
          <article key={s.id} className='group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl'>
            <div className='overflow-hidden'>
              <Img src={s.img} alt={s.title} className='h-52 w-full transition duration-700 group-hover:scale-105' />
            </div>
            <div className='flex flex-1 flex-col p-6'>
              <span className='text-[11px] uppercase tracking-widest text-taupe'>{s.category}</span>
              <h3 className='mt-1 font-serif text-2xl leading-tight text-forest'>{s.title}</h3>
              <p className='mt-3 text-sm leading-relaxed text-charcoal/70'>{s.desc}</p>
              {open === s.id && (
                <div className='mt-4 rounded-2xl bg-sage-light/60 p-4'>
                  <ul className='space-y-2 text-sm'>
                    {s.includes.map((i) => <li key={i} className='flex gap-2'><Check size={16} className='mt-0.5 shrink-0 text-forest' />{i}</li>)}
                  </ul>
                  <button onClick={() => book(s.id)} className='btn-primary mt-4 w-full !py-2.5'>Get a quote for this</button>
                </div>
              )}
              <button onClick={() => setOpen(open === s.id ? null : s.id)} aria-expanded={open === s.id} className='mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-forest'>
                {open === s.id ? 'Show Less' : 'Learn More'} <ArrowRight size={16} className={`transition ${open === s.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
