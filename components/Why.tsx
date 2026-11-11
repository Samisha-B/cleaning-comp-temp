import { BadgeCheck, CalendarClock, Leaf, ShieldCheck } from 'lucide-react';
import { site } from '@/lib/config';
import Img from './Img';
import Reveal from './Reveal';

const icons: Record<string, any> = { shield: ShieldCheck, leaf: Leaf, calendar: CalendarClock, badge: BadgeCheck };

export default function Why() {
  return (
    <section id='why' className='section grid items-center gap-14 lg:grid-cols-2'>
      <Reveal>
        <Img src={site.why.image} alt='Professional cleaning supplies' className='aspect-[4/5] w-full rounded-[2rem] shadow-xl' />
      </Reveal>
      <div>
        <Reveal><span className='eyebrow'>Why Choose Us</span><h2 className='h-display text-4xl sm:text-5xl'>Quiet confidence in every detail</h2></Reveal>
        <div className='mt-10 grid gap-8 sm:grid-cols-2'>
          {site.why.items.map((it, i) => {
            const I = icons[it.icon] || BadgeCheck;
            return (
              <Reveal key={it.title} delay={i * 100}>
                <span className='flex h-12 w-12 items-center justify-center rounded-full bg-sage-light text-forest'><I size={22} strokeWidth={1.5} /></span>
                <h3 className='mt-4 font-serif text-2xl text-forest'>{it.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-charcoal/70'>{it.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
