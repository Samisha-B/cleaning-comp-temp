import { MessageCircle, Phone } from 'lucide-react';
import { site } from '@/lib/config';

export default function Floating() {
  const c = site.contact;
  return (
    <div className='fixed bottom-5 right-4 z-40 flex flex-col gap-3'>
      <a href={`https://wa.me/${c.whatsapp}`} target='_blank' rel='noopener noreferrer' aria-label='Chat on WhatsApp' className='flex h-12 w-12 items-center justify-center rounded-full bg-sage text-forest-dark shadow-lg transition hover:scale-110'><MessageCircle size={22} /></a>
      <a href={`tel:${c.phoneHref}`} aria-label='Call now' className='flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-medium text-ivory shadow-lg transition hover:scale-105'><Phone size={18} /><span className='hidden sm:inline'>Call Now</span></a>
    </div>
  );
}
