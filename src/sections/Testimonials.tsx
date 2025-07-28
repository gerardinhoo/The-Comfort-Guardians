'use client';

import { motion } from 'framer-motion';

const testimonials = [
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
];

export default function Testimonials() {
  return (
    <section className='bg-gray-100 py-16 px-6 md:px-20 text-center'>
      <h2 className='text-3xl md:text-4xl font-bold mb-12 text-gray-800'>
        What Our Customers Are Saying
      </h2>

      <div className='grid gap-8 md:grid-cols-3'>
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className='bg-white p-6 rounded-lg shadow-md'
          >
            <p className='text-gray-700 italic mb-4'>“{testimonial.quote}”</p>
            <div className='font-semibold text-gray-900'>
              {testimonial.name}
            </div>
            <div className='text-sm text-gray-600'>{testimonial.location}</div>
            <div className='text-yellow-500 mt-2 text-lg'>★★★★★</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
