import Hero from '@/sections/Hero';
import WhyChooseUs from '@/components/WhyChooseUs';
import Services from '@/sections/Services';
import Testimonials from '@/sections/Testimonials';
import Financing from '@/sections/Financing';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { galleryItems } from '@/data/galleryItems';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
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
      <section
        id='recent-work'
        className='mx-auto max-w-6xl px-4 py-16 scroll-mt-24'
      >
        <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold'>Recent Work</h2>
            <p className='text-gray-600'>
              A quick peek at our installs & repairs.
            </p>
          </div>

          <Link
            href='/gallery'
            className='inline-flex w-full sm:w-auto items-center justify-center
               rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white
               hover:bg-blue-700 transition-colors'
          >
            View Full Gallery
          </Link>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          {galleryItems.slice(0, 3).map((it, i) => (
            <div
              key={i}
              className='overflow-hidden rounded-2xl border bg-white shadow-sm'
            >
              <div className='relative h-56'>
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes='(max-width: 640px) 100vw, 33vw'
                  className='object-cover transition-transform duration-300 hover:scale-105'
                  priority={i === 0}
                />
              </div>
              {it.caption && (
                <div className='px-3 py-2 text-sm text-gray-700'>
                  {it.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className='border-t border-gray-200 bg-white'>
        {/* Financing content */}
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
