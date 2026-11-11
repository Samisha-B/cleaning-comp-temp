'use client';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/lib/config';
import { links } from '@/lib/nav';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href='#home' className='flex items-center gap-3'>
      {site.brand.logoImage ? <img src={site.brand.logoImage} alt={site.brand.name} className='h-9 w-auto' /> : (
        <span className={`flex h-10 w-10 items-center justify-center rounded-full font-serif text-xl ${light ? 'bg-ivory text-forest' : 'bg-forest text-ivory'}`}>{site.brand.name.charAt(0)}</span>
      )}
      <span className={`font-serif text-2xl ${light ? 'text-ivory' : 'text-forest'}`}>{site.brand.name}</span>
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 20);
    f();
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${sc || open ? 'bg-ivory/90 shadow-sm backdrop-blur-md' : 'bg-transparent'}`}>
      <div className='mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8'>
        <Logo />
        <nav className='hidden items-center gap-8 lg:flex' aria-label='Main'>
          {links.map((l) => <a key={l.href} href={l.href} className='text-sm text-charcoal/80 transition hover:text-forest'>{l.label}</a>)}
        </nav>
        <a href='#quote' className='btn-primary hidden !py-2.5 lg:inline-flex'>Get a Free Quote</a>
        <button className='rounded-full p-2 text-forest lg:hidden' onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <div className={`overflow-hidden bg-ivory transition-all duration-500 lg:hidden ${open ? 'max-h-[100vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className='flex h-[calc(100vh-5rem)] flex-col gap-1 px-6 pt-6' aria-label='Mobile'>
          {links.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className='border-b border-taupe/15 py-4 font-serif text-3xl text-forest'>{l.label}</a>)}
          <a href='#quote' onClick={() => setOpen(false)} className='btn-primary mt-6'>Get a Free Quote</a>
        </nav>
      </div>
    </header>
  );
}
