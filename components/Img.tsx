'use client';
import { useState } from 'react';

export default function Img({ src, alt, className = '', style, eager = false }: { src: string; alt: string; className?: string; style?: React.CSSProperties; eager?: boolean }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div role='img' aria-label={alt} className={`bg-gradient-to-br from-sage-light to-beige ${className}`} style={style} />;
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setBad(true)} className={`object-cover ${className}`} style={style} />;
}
