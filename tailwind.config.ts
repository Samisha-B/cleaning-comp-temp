import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F0', sage: '#A9B8A0', 'sage-light': '#E1E8DB', forest: '#1F3B2D', 'forest-dark': '#162b21',
        beige: '#EBE2D2', taupe: '#8C7F6D', charcoal: '#2D2D2B'
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
export default config;
