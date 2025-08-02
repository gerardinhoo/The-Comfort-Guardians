import Hero from '@/sections/Hero';
import WhyChooseUs from '@/sections/WhyChooseUs';
import Services from '@/sections/Services';
import Testimonials from '@/sections/Testimonials';
import Financing from '@/sections/Financing';
import ContactForm from '@/components/ContactForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className='pt-20'>
      <Navbar />
      <section id='home'>
        <Hero />
      </section>
      <section id='services'>
        <Services />
      </section>
      <section id='testimonials'>
        <Testimonials />
      </section>
      <section id='whyUs'>
        <WhyChooseUs />
      </section>
      <section id='financing'>
        <Financing />
      </section>
      <section id='contact'>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
