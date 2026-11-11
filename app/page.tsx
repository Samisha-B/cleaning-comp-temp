import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Booking from '@/components/Booking';
import Why from '@/components/Why';
import Gallery from '@/components/Gallery';
import HowItWorks from '@/components/HowItWorks';
import Reviews from '@/components/Reviews';
import About from '@/components/About';
import Areas from '@/components/Areas';
import Faq from '@/components/Faq';
import FinalCta from '@/components/FinalCta';
import Footer from '@/components/Footer';
import Floating from '@/components/Floating';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Why />
        <Gallery />
        <HowItWorks />
        <Reviews />
        <About />
        <Areas />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <Floating />
    </>
  );
}
