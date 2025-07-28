import Hero from '@/sections/Hero';
import WhyChooseUs from '@/sections/WhyChooseUs';
import Services from '@/sections/Services';
import Testimonials from '@/sections/Testimonials';
import Financing from '@/sections/Financing';

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Testimonials />
      <WhyChooseUs />
      <Financing />
    </main>
  );
}
