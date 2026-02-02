import Hero from '@/components/landing-page/Hero';
import NavBar from '@/components/landing-page/NavBar';
import Ourservices from '@/components/landing-page/Ourservices';
import Industries from '@/components/landing-page/Industries';
import OurProduct from '@/components/landing-page/OurProduct';
import WhyChooseUs from '@/components/landing-page/Whywechooseus';
import Team from '@/components/landing-page/Team';
import Footer from '@/components/landing-page/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Hero />
      <Ourservices />
      <Industries />
      <OurProduct />
      <Team />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
