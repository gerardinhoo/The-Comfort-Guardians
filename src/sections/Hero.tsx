'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

const Button = ({ children, className = '' }: ButtonProps) => (
  <button
    className={`bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition ${className}`}
  >
    {children}
  </button>
);
export default function Hero() {
  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-gradient-to-r from-[#f3904f] via-[#f38e6d] to-[#a06df2]'
    >
      {/* Optional Glow Effects */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-2xl animate-pulse' />
      </div>

      {/* Optional Top Overlay for visual depth */}
      <div className='absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-10' />

      {/* Glassmorphism Text Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='relative z-20 text-center bg-white/10 backdrop-blur-md rounded-xl px-6 py-8 mx-4 md:px-12 md:py-10 shadow-lg'
      >
        <h1 className='text-4xl md:text-6xl font-bold mb-4 drop-shadow-md'>
          Expert HVAC Services in Atlanta
        </h1>
        <p className='text-lg md:text-xl mb-6 drop-shadow-sm'>
          Comfort all year round. Reliable. Fast. Available 7 Days a Week.
        </p>
        <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
          <Link href='#contact'>
            <Button className='px-6 py-3 text-lg font-semibold cursor-pointer'>
              Book an Appointment
            </Button>
          </Link>
          <span className='text-sm md:text-base text-white/80'>
            (404) 542-4332
          </span>
        </div>
      </motion.div>
    </section>
  );
}
