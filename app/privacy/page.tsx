import Legal from '@/components/Legal';
import { site } from '@/lib/config';

export default function Privacy() {
  return (
    <Legal title='Privacy Policy'>
      <p>{site.brand.name} collects the information you submit in our quote form (name, email, phone, address, ZIP, scheduling preferences) to respond to your request and provide cleaning services.</p>
      <p>We do not sell your personal information. We share it only with service providers needed to operate our business, such as scheduling and email tools.</p>
      <p>To request access to or deletion of your data, contact us at {site.contact.email}.</p>
    </Legal>
  );
}
