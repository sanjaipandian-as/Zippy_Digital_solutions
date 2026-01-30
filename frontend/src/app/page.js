import Hero from '@/components/landing-page/Hero';
import NavBar from '@/components/landing-page/NavBar';
import WhyChooseUs from '@/components/landing-page/WhyChooseUs';
import Industries from '@/components/landing-page/Industries';
import About from '@/components/landing-page/About';
import Footer from '@/components/landing-page/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Hero />
      <WhyChooseUs />
      <Industries />
      <About />
      <Footer />
    </div>
  );
}
