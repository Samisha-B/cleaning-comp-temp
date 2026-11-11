import Link from 'next/link';
import { site } from '@/lib/config';

export default function Legal({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className='mx-auto max-w-3xl px-5 py-20'>
      <Link href='/' className='text-sm text-taupe hover:text-forest'>&larr; Back to {site.brand.name}</Link>
      <h1 className='h-display mt-6 text-5xl'>{title}</h1>
      <div className='mt-8 space-y-4 leading-relaxed text-charcoal/80'>
        <p className='rounded-xl bg-beige p-4 text-sm'>Template notice: this is placeholder text and not legal advice. Replace it with counsel-reviewed policy before going live.</p>
        {children}
      </div>
    </main>
  );
}
