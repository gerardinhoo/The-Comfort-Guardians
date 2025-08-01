'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-gradient-to-r from-[#f3904f] via-[#f38e6d] to-[#a06df2]'
    >
      {/* Glow Effects – hidden on mobile */}
      <div className='absolute inset-0 -z-10'>
        <div className='hidden sm:block absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse' />
        <div className='hidden sm:block absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-2xl animate-pulse' />
      </div>

      {/* Optional overlay on top for depth */}
      <div className='absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none' />

      {/* Main Text Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='relative z-20 text-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-8 mx-4 md:px-12 md:py-10 shadow-lg max-w-3xl'
      >
        <h1 className='text-3xl md:text-6xl font-bold mb-4 drop-shadow-md'>
          Expert HVAC Services in Atlanta
        </h1>
        <p className='text-base md:text-xl mb-6 drop-shadow-sm'>
          Comfort all year round. Reliable. Fast. Available 7 Days a Week.
        </p>
        {/* <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
          <Link href='#contact'>
            <Button>Book an Appointment</Button>
          </Link>
          <span className='text-sm md:text-base text-white/80'>
            (404) 542-4332
          </span>
        </div> */}

        <a
          href='https://clienthub.getjobber.com/client_hubs/820e5aef-df09-4288-89bf-6ef02f0edf86/login/new?source=share_login'
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-4 rounded-xl mt-6 shadow-md transition-all duration-200'
        >
          Book an Appointment
        </a>
        <p className='text-sm mt-3 text-gray-200 italic'>
          You&apos;ll receive a secure link to manage your appointment.
        </p>
      </motion.div>
    </section>
  );
}
