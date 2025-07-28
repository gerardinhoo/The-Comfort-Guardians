'use client';

import { motion } from 'framer-motion';
import logo from '@/assets/logo.png'; // use @ alias

export default function Hero() {
  return (
    <section className='min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 bg-[#0f0f0f] text-white'>
      {/* Left: Logo (placeholder or actual) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className='w-full md:w-1/2 flex justify-center md:justify-start py-12'
      >
        <img
          src={logo.src}
          alt='The Comfort Guardians logo'
          width={150}
          height={80}
          className='max-w-xs md:max-w-md'
        />
      </motion.div>

      {/* Right: Headline + CTA */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className='w-full md:w-1/2 text-center md:text-left space-y-6 py-12'
      >
        <h1 className='text-4xl md:text-5xl font-bold tracking-tight uppercase leading-snug'>
          Reliable HVAC <br /> Solutions
        </h1>
        <p className='text-gray-300 text-lg md:text-xl'>
          Expert HVAC services to ensure your comfort all year round.
        </p>
        <div className='space-y-4'>
          <button className='bg-gray-300 text-black px-6 py-3 font-semibold rounded shadow hover:bg-gray-400 transition cursor-pointer'>
            Book an Appointment
          </button>
          <p className='text-xl font-bold'>(404) 542-4332</p>
        </div>
      </motion.div>
    </section>
  );
}
