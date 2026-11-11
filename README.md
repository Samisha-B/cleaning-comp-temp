# Maison Clean Co. - Cleaning Company Website Template

Next.js 14 (App Router) + Tailwind. Deploy on Vercel with zero config.

## Customize
Everything lives in `lib/config.ts`: brand, contact, hours, services, pricing, gallery, reviews, FAQ, service areas, map location, images.

## Quote form backend
Copy `.env.example` to `.env.local` and set `FORM_ENDPOINT` (Formspree, Getform, Basin, or your own webhook). Without it the form runs in demo mode and says so honestly.

## Run
```
npm install
npm run dev
```

## Before selling
- Replace Unsplash photos with the client's own (edit image URLs in `lib/config.ts`).
- Replace the before/after demo pairs with real before and after photos.
- Replace placeholder reviews with verified ones.
- Have the Privacy and Terms pages reviewed by counsel.
