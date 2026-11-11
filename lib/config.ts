const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Service = { id: string; title: string; desc: string; category: 'Residential' | 'Commercial'; img: string; includes: string[] };

export const site = {
  brand: {
    name: 'Maison Clean Co.',
    tagline: 'Premium Home & Office Care',
    logoImage: '',
    description: `A boutique cleaning company bringing hotel-level care to homes and workplaces. Placeholder copy: replace with your own brand description.`
  },
  contact: {
    phone: '(555) 010-2030',
    phoneHref: '+15550102030',
    email: 'hello@maisonclean.example',
    whatsapp: '15550102030',
    address: '100 Placeholder Ave, Austin, TX 78701',
    mapQuery: 'Austin, TX'
  },
  hours: [
    { days: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { days: 'Saturday', time: '9:00 AM - 4:00 PM' },
    { days: 'Sunday', time: 'Closed' }
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Facebook', href: 'https://facebook.com' },
    { label: 'Google', href: 'https://google.com' }
  ],
  hero: {
    eyebrow: 'Residential & Commercial Cleaning',
    headline: 'A Cleaner Space. A Calmer Mind.',
    text: 'Thoughtful cleaning services designed around your home, your schedule, and your peace of mind.',
    image: u('photo-1600210492486-724fe5c67fb0', 1800),
    badge: { stat: '4.9', label: 'Average rating (placeholder)' },
    trust: ['Trusted Local Professionals', 'Flexible Scheduling', 'Satisfaction Guaranteed']
  },
  services: [
    { id: 'standard', title: 'Standard House Cleaning', category: 'Residential', img: u('photo-1600585154340-be6161a56a0c', 900), desc: 'Everyday upkeep that keeps your home fresh, tidy, and welcoming.', includes: ['Dusting all surfaces', 'Kitchen and bathroom sanitizing', 'Vacuuming and mopping', 'Trash removal'] },
    { id: 'deep', title: 'Deep Cleaning', category: 'Residential', img: u('photo-1581578731548-c64695cc6952', 900), desc: 'A top-to-bottom reset that reaches the places routine cleans miss.', includes: ['Baseboards and door frames', 'Inside cabinets (empty)', 'Detailed grout and fixture scrubbing', 'Light fixtures and vents'] },
    { id: 'move', title: 'Move-In / Move-Out Cleaning', category: 'Residential', img: u('photo-1560448204-e02f11c3d0e2', 900), desc: 'Leave it spotless or start fresh in your new place.', includes: ['Empty-home deep clean', 'Inside appliances', 'Closets and shelving', 'Windowsills and tracks'] },
    { id: 'recurring', title: 'Recurring Cleaning', category: 'Residential', img: u('photo-1556911220-bff31c812dba', 900), desc: 'Weekly, biweekly, or monthly visits with a consistent team.', includes: ['Same trusted team each visit', 'Discounted recurring rates', 'Flexible rescheduling', 'Custom checklist'] },
    { id: 'apartment', title: 'Apartment Cleaning', category: 'Residential', img: u('photo-1522708323590-d24dbb6b0267', 900), desc: 'Efficient, detail-focused cleaning for apartments and condos.', includes: ['Kitchen and bath refresh', 'Floors and surfaces', 'Balcony sweep', 'Building-access friendly scheduling'] },
    { id: 'office', title: 'Office & Commercial Cleaning', category: 'Commercial', img: u('photo-1497366216548-37526070297c', 900), desc: 'Polished, healthy workspaces cleaned around your business hours.', includes: ['After-hours service', 'Restrooms and break rooms', 'Desk and common area sanitizing', 'Custom service contracts'] },
    { id: 'postconstruction', title: 'Post-Construction Cleaning', category: 'Commercial', img: u('photo-1504307651254-35680f356dfd', 900), desc: 'Dust, debris, and residue removed so your new space is move-in ready.', includes: ['Fine dust removal', 'Adhesive and paint splatter removal', 'Window and glass detailing', 'Final walkthrough polish'] },
    { id: 'airbnb', title: 'Airbnb / Vacation Rental Cleaning', category: 'Commercial', img: u('photo-1502672260266-1c1ef2d93688', 900), desc: 'Hotel-standard turnovers that earn five-star guest reviews.', includes: ['Same-day turnovers', 'Linen change and staging', 'Restock supplies', 'Photo report on request'] }
  ] as Service[],
  pricing: {
    currency: '$',
    minimum: 90,
    range: 0.1,
    baseByService: { standard: 90, deep: 140, move: 170, recurring: 85, apartment: 75, office: 160, postconstruction: 260, airbnb: 95 } as Record<string, number>,
    perBedroom: 18,
    perBathroom: 25,
    sqftTiers: [{ upTo: 1000, add: 0 }, { upTo: 2000, add: 40 }, { upTo: 3000, add: 90 }, { upTo: 4000, add: 150 }, { upTo: 1000000, add: 230 }],
    propertyMultiplier: { House: 1, Apartment: 0.9, Condo: 0.95, Office: 1.1 } as Record<string, number>,
    depthMultiplier: { standard: 1, deep: 1.5 } as Record<string, number>,
    frequencyDiscount: { once: 0, weekly: 0.2, biweekly: 0.15, monthly: 0.1 } as Record<string, number>,
    addons: [
      { id: 'fridge', label: 'Inside refrigerator', price: 35 },
      { id: 'oven', label: 'Inside oven', price: 40 },
      { id: 'windows', label: 'Interior windows', price: 60 },
      { id: 'laundry', label: 'Laundry (wash, dry, fold)', price: 30 },
      { id: 'organization', label: 'Organization', price: 75 },
      { id: 'carpet', label: 'Carpet cleaning', price: 90 }
    ]
  },
  propertyTypes: ['House', 'Apartment', 'Condo', 'Office'],
  frequencies: [{ id: 'once', label: 'One-time' }, { id: 'weekly', label: 'Weekly' }, { id: 'biweekly', label: 'Biweekly' }, { id: 'monthly', label: 'Monthly' }],
  timeSlots: ['Morning (8am - 11am)', 'Midday (11am - 2pm)', 'Afternoon (2pm - 5pm)'],
  why: {
    image: u('photo-1563453392212-326f5e854473', 1200),
    items: [
      { icon: 'shield', title: 'Vetted & Trusted Professionals', text: 'Background-checked, trained, and insured team members you can welcome into your home.' },
      { icon: 'leaf', title: 'Eco-Friendly Cleaning Options', text: 'Gentle, plant-based products available on request for every visit.' },
      { icon: 'calendar', title: 'Flexible Scheduling', text: 'Pick the day and time window that fits your life, and reschedule with ease.' },
      { icon: 'badge', title: 'Satisfaction Guaranteed', text: 'Not happy? Tell us within 24 hours and we will make it right.' }
    ]
  },
  gallery: {
    categories: ['Kitchens', 'Bathrooms', 'Living Spaces', 'Bedrooms', 'Commercial Spaces'],
    note: 'Demo images: the Before view is a filtered copy of the After photo. Replace with real project photos.',
    items: [
      { id: 'g1', title: 'Chef kitchen reset', category: 'Kitchens', img: u('photo-1556911220-bff31c812dba', 1200) },
      { id: 'g2', title: 'Spa bathroom shine', category: 'Bathrooms', img: u('photo-1584622650111-993a426fbf0a', 1200) },
      { id: 'g3', title: 'Living room refresh', category: 'Living Spaces', img: u('photo-1600585154340-be6161a56a0c', 1200) },
      { id: 'g4', title: 'Primary bedroom', category: 'Bedrooms', img: u('photo-1560448204-e02f11c3d0e2', 1200) },
      { id: 'g5', title: 'Open-plan office', category: 'Commercial Spaces', img: u('photo-1497366216548-37526070297c', 1200) },
      { id: 'g6', title: 'Apartment lounge', category: 'Living Spaces', img: u('photo-1522708323590-d24dbb6b0267', 1200) }
    ]
  },
  steps: [
    { n: '01', title: 'Request Your Quote', text: 'Tell us about your space and cleaning needs.' },
    { n: '02', title: 'Choose Your Schedule', text: 'Select a convenient date and time.' },
    { n: '03', title: 'Enjoy Your Fresh Space', text: 'Our professionals handle the rest.' }
  ],
  reviews: {
    note: 'Placeholder testimonials. Replace with verified customer reviews before launch.',
    reviewUrl: 'https://g.page/r/your-review-link',
    items: [
      { name: 'Emily R.', rating: 5, text: 'The team left our home feeling brand new. Every detail was handled with care, and the booking process was effortless.' },
      { name: 'James T.', rating: 5, text: 'Reliable, polite, and thorough. Our office has never looked better, and the crew works around our schedule.' },
      { name: 'Priya S.', rating: 5, text: 'Our move-out clean saved the deposit. Spotless inside the oven and every cabinet.' },
      { name: 'Marcus L.', rating: 5, text: 'We use them for our vacation rental turnovers and guests keep mentioning how fresh it smells.' }
    ]
  },
  about: {
    image: u('photo-1581578017093-cd30b3b4c6b1', 1200),
    headline: `More Than Cleaning. It's Care.`,
    intro: `Placeholder story: we started with a simple belief that a clean space changes how you feel. Today our trained team brings the same care to every home and workplace we enter.`,
    values: [
      { title: 'Mission', text: 'Give people back their time with spaces that feel calm and cared for.' },
      { title: 'Professionalism & Reliability', text: 'We show up on time, communicate clearly, and respect your property.' },
      { title: 'Attention to Detail', text: 'Checklists, quality walk-throughs, and a team that notices the small things.' },
      { title: 'Customer Satisfaction', text: 'If something is not right, we return and fix it at no cost.' }
    ]
  },
  areas: {
    cities: [
      { city: 'Austin', neighborhoods: ['Downtown', 'Zilker', 'Hyde Park', 'East Austin'] },
      { city: 'Round Rock', neighborhoods: ['Old Settlers', 'Brushy Creek'] },
      { city: 'Cedar Park', neighborhoods: ['Buttercup Creek', 'Lakeline'] },
      { city: 'Pflugerville', neighborhoods: ['Falcon Pointe', 'Windermere'] }
    ],
    zips: ['78701', '78702', '78703', '78704', '78705', '78745', '78613', '78664', '78681', '78660']
  },
  faq: [
    { q: 'Do I need to provide cleaning supplies?', a: 'No. We bring professional-grade supplies and equipment. If you prefer specific products, just let us know.' },
    { q: 'Are your cleaners insured and bonded?', a: 'Yes. Our team is background-checked and covered by insurance and bonding.' },
    { q: 'Do I need to be home during the cleaning?', a: 'Not at all. Many clients provide access instructions, and others stay home. Either works.' },
    { q: 'Can I book recurring cleaning?', a: 'Yes. Choose weekly, biweekly, or monthly in the quote form and enjoy a recurring discount.' },
    { q: 'How much does a cleaning service cost?', a: 'Pricing depends on home size, service type, and add-ons. Use our estimator for a quick estimate, and we will confirm your final quote.' },
    { q: 'Can I reschedule my booking?', a: 'Yes. Contact us at least 24 hours before your appointment to reschedule at no charge.' },
    { q: 'Do you offer eco-friendly products?', a: 'Yes. Plant-based, low-toxicity options are available on request.' },
    { q: `What happens if I'm not satisfied?`, a: 'Let us know within 24 hours and we will return to re-clean the areas of concern at no cost.' }
  ],
  cta: {
    image: u('photo-1600210492486-724fe5c67fb0', 1800),
    headline: 'Your Fresh Start Is Just One Booking Away.',
    text: 'Let us take cleaning off your to-do list.'
  }
};
