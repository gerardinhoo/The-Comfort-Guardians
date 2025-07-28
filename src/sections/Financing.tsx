'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Financing() {
  return (
    <section className='bg-gradient-to-b from-white to-[#fff9f5] py-20 px-6 md:px-20 text-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className='max-w-4xl mx-auto'
      >
        <h2 className='text-3xl md:text-4xl font-bold mb-6 text-gray-900'>
          Flexible Financing with Hearth
        </h2>

        <p className='text-gray-600 mb-6 text-lg leading-relaxed'>
          Get the HVAC comfort you deserve without breaking the bank.
          <br />
          Pre-qualify in just 60 seconds with no impact on your credit score.
        </p>

        <p className='text-sm text-gray-500 mb-4 italic'>
          Tap the banner below to check your monthly payment options instantly.
        </p>

        <div className='flex justify-center'>
          <a
            href='https://app.gethearth.com/financing/54865/96830/prequalify?utm_campaign=54865&utm_content=red&utm_medium=contractor-website&utm_source=contractor&utm_term=96830'
            target='_blank'
            rel='noopener noreferrer'
            className='transition-transform duration-300 hover:scale-105 cursor-pointer'
          >
            <Image
              src='/hearth-image.png'
              alt='Hearth Monthly Payment Options'
              width={640}
              height={140}
              className='rounded-lg shadow-xl'
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
