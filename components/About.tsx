import { site } from '@/lib/config';
import Img from './Img';
import Reveal from './Reveal';

export default function About() {
  const a = site.about;
  return (
    <section id='about' className='section grid items-center gap-14 lg:grid-cols-2'>
      <Reveal>
        <span className='eyebrow'>About {site.brand.name}</span>
        <h2 className='h-display text-4xl sm:text-5xl lg:text-6xl'>{a.headline}</h2>
        <p className='mt-6 text-lg leading-relaxed text-charcoal/75'>{a.intro}</p>
        <dl className='mt-10 grid gap-6 sm:grid-cols-2'>
          {a.values.map((v) => (
            <div key={v.title} className='border-t border-taupe/30 pt-4'>
              <dt className='font-serif text-xl text-forest'>{v.title}</dt>
              <dd className='mt-1 text-sm leading-relaxed text-charcoal/70'>{v.text}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal delay={150}>
        <Img src={a.image} alt='Our professional cleaning team' className='aspect-[4/5] w-full rounded-[2rem] shadow-xl' />
      </Reveal>
    </section>
  );
}
