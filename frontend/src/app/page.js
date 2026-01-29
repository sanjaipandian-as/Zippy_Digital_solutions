import Hero from '@/components/landing-page/Hero';
import WhyChooseUs from '@/components/landing-page/WhyChooseUs';
import Industries from '@/components/landing-page/Industries';
import About from '@/components/landing-page/About';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <WhyChooseUs />
      <Industries />
      <About />
    </div>
  );
}
