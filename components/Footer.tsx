import Link from 'next/link';
import { site } from '@/lib/config';
import { links } from '@/lib/nav';
import { Logo } from './Nav';

export default function Footer() {
  const c = site.contact;
  return (
    <footer id='contact' className='bg-forest-dark text-ivory/80'>
      <div className='mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-5'>
        <div className='lg:col-span-2'>
          <Logo light />
          <p className='mt-4 max-w-sm text-sm leading-relaxed'>{site.brand.description}</p>
          <div className='mt-5 flex gap-4 text-sm'>{site.social.map((s) => <a key={s.label} href={s.href} target='_blank' rel='noopener noreferrer' className='underline-offset-4 hover:text-ivory hover:underline'>{s.label}</a>)}</div>
        </div>
        <div>
          <h3 className='mb-4 font-serif text-xl text-ivory'>Explore</h3>
          <ul className='space-y-2 text-sm'>{links.map((l) => <li key={l.href}><a href={l.href} className='hover:text-ivory'>{l.label}</a></li>)}</ul>
        </div>
        <div>
          <h3 className='mb-4 font-serif text-xl text-ivory'>Services</h3>
          <ul className='space-y-2 text-sm'>{site.services.map((s) => <li key={s.id}><a href='#services' className='hover:text-ivory'>{s.title}</a></li>)}</ul>
        </div>
        <div>
          <h3 className='mb-4 font-serif text-xl text-ivory'>Contact</h3>
          <ul className='space-y-2 text-sm'>
            <li><a href={`tel:${c.phoneHref}`} className='hover:text-ivory'>{c.phone}</a></li>
            <li><a href={`mailto:${c.email}`} className='hover:text-ivory'>{c.email}</a></li>
            <li>{c.address}</li>
            <li className='pt-2 text-ivory'>Hours</li>
            {site.hours.map((h) => <li key={h.days}>{h.days}: {h.time}</li>)}
            <li className='pt-2 text-ivory'>Service area</li>
            <li>{site.areas.cities.map((a) => a.city).join(', ')}</li>
          </ul>
        </div>
      </div>
      <div className='border-t border-ivory/10 px-5 py-6 text-center text-xs sm:flex sm:justify-between sm:px-8 sm:text-left'>
        <p>&copy; {new Date().getFullYear()} {site.brand.name}. All rights reserved.</p>
        <p className='mt-2 flex justify-center gap-5 sm:mt-0'><Link href='/privacy' className='hover:text-ivory'>Privacy Policy</Link><Link href='/terms' className='hover:text-ivory'>Terms & Conditions</Link></p>
      </div>
    </footer>
  );
}
