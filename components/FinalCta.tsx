import { site } from '@/lib/config';
import Img from './Img';

export default function FinalCta() {
  const c = site.cta;
  return (
    <section className='relative isolate overflow-hidden'>
      <Img src={c.image} alt='' className='absolute inset-0 -z-10 h-full w-full' />
      <div className='absolute inset-0 -z-10 bg-forest/80' />
      <div className='mx-auto max-w-3xl px-5 py-28 text-center text-ivory sm:py-36'>
        <h2 className='font-serif text-4xl font-medium leading-tight sm:text-6xl'>{c.headline}</h2>
        <p className='mt-5 text-lg text-ivory/80'>{c.text}</p>
        <a href='#quote' className='mt-10 inline-flex rounded-full bg-ivory px-8 py-4 text-sm font-medium text-forest transition hover:-translate-y-0.5 hover:shadow-xl'>Get Your Free Quote</a>
      </div>
    </section>
  );
}
