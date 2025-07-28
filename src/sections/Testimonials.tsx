'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Jessica R.',
    location: 'Atlanta, GA',
    quote:
      'The Comfort Guardians were professional, quick, and honest. I’ve never had such a smooth HVAC experience.',
  },
  {
    name: 'Mike D.',
    location: 'Decatur, GA',
    quote:
      'They went above and beyond with the installation. My house has never felt better. Highly recommend!',
  },
  {
    name: 'Sandra P.',
    location: 'Marietta, GA',
    quote:
      'Friendly, efficient, and affordable. The best decision I made this summer was calling The Comfort Guardians.',
  },
  {
    name: 'Lisa G.',
    text: 'We’ve used them twice now and the experience is always smooth and friendly.',
  },
];

export default function Testimonials() {
  return (
    <section className='bg-white text-black py-16 px-4'>
      <h2 className='text-3xl font-bold text-center mb-10'>
        What Our Customers Say
      </h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='max-w-xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg'
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
              <p className='text-lg text-center mb-2'>“{review.quote}”</p>
              <p className='text-sm text-center font-semibold'>
                — {review.name}
              </p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
