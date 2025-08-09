'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';
import GoogleReview from '@/components/GoogleReview';

const reviews = [
  {
    name: 'Jessica R',
    location: 'Atlanta, GA',
    quote:
      'The Comfort Guardians were professional, quick, and honest. I’ve never had such a smooth HVAC experience.',
  },
  {
    name: 'Mike D',
    location: 'Decatur, GA',
    quote:
      'They went above and beyond with the installation. My house has never felt better. Highly recommend!',
  },
  {
    name: 'Sandra P',
    location: 'Marietta, GA',
    quote:
      'Friendly, efficient, and affordable. The best decision I made this summer was calling The Comfort Guardians.',
  },
  {
    name: 'Lisa G',
    location: 'Sneville',
    quote:
      'We’ve used them twice now and the experience is always smooth and friendly.',
  },
];

export default function Testimonials() {
  return (
    <section className='bg-gradient-to-b from-[#fff9f5] to-white text-black py-20 px-4'>
      <h2 className='text-3xl font-bold text-center mb-12'>
        What Our Customers Say
      </h2>
      <div className='mb-10 flex justify-center'>
        <GoogleReview />
      </div>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        autoplay={{ delay: 6000 }}
        pagination={{ clickable: true }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='max-w-2xl mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl'
            >
              <div className='flex justify-center mb-4 text-yellow-500'>
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <FaStar />
                  </motion.span>
                ))}
              </div>
              <p className='text-xl italic text-center text-gray-800 leading-relaxed mb-4'>
                “{review.quote}”
              </p>
              <p className='text-center text-sm font-semibold text-gray-700'>
                — {review.name}
                {review.location && `, ${review.location}`}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
