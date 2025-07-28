'use client';

import { motion } from 'framer-motion';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-10 md:py-20 bg-gradient-to-r from-orange-300 via-red-400 to-blue-900 text-white'>
      {/* LOGO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='mb-8 md:mb-0 md:mr-12 drop-shadow-lg'
      >
        <Link href='/'>
          <Image
            src={logo} // adjust path if needed
            alt='The Comfort Guardians Logo'
            width={180}
            height={180}
            className='rounded-md'
          />
        </Link>
      </motion.div>

      {/* TEXT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='text-center md:text-left'
      >
        <h1 className='text-3xl md:text-5xl font-bold'>
          THE COMFORT GUARDIANS
        </h1>

        <p className='mt-4 text-lg'>
          Expert HVAC services to ensure your comfort all year round.
        </p>

        <div className='mt-6'>
          <button className='bg-white text-black font-semibold px-6 py-2 rounded hover:bg-gray-200 hover:scale-105 transition-transform duration-300'>
            Book an Appointment
          </button>
        </div>

        <p className='mt-4 text-lg md:text-xl font-medium tracking-wide'>
          (404) 542-4332
        </p>

        <p className='text-sm text-gray-200 mt-1'>Available 7 Days a Week</p>
      </motion.div>
    </section>
  );
}
