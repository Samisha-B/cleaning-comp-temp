import Legal from '@/components/Legal';
import { site } from '@/lib/config';

export default function Terms() {
  return (
    <Legal title='Terms & Conditions'>
      <p>Prices shown on this website are estimates only. Final pricing is confirmed by {site.brand.name} after reviewing your property details.</p>
      <p>Submitting a quote request does not create a confirmed booking. A booking is confirmed only when you receive written confirmation from us.</p>
      <p>Questions? Contact {site.contact.email} or call {site.contact.phone}.</p>
    </Legal>
  );
}
