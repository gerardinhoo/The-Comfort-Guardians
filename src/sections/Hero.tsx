'use client';
import { motion } from 'framer-motion';
// import WhyChooseUs from '@/components/WhyChooseUs';

export default function Hero() {
  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-gradient-to-r from-[#ffd4b2] via-[#ffb4b4] to-[#cdbaff]'
    >
      <div className='absolute inset-0 -z-10'>
        <div className='hidden sm:block absolute top-10 left-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse' />
        <div className='hidden sm:block absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-2xl animate-pulse' />
      </div>

      <div className='absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-10 pointer-events-none' />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className='relative z-20 text-center bg-white/10 backdrop-blur-md rounded-xl px-4 py-8 mx-4 md:px-12 md:py-10 shadow-lg max-w-3xl'
      >
        <h1 className='text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg tracking-tight leading-tight'>
          Expert HVAC Services in Atlanta
        </h1>
        <p className='text-base md:text-xl mb-6 drop-shadow-sm'>
          Comfort all year round. Reliable. Fast. Available 7 Days a Week.
        </p>
        <div>
          <a
            href='https://clienthub.getjobber.com/client_hubs/820e5aef-df09-4288-89bf-6ef02f0edf86/public/work_request/new'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200'
          >
            Book an Appointment
          </a>
        </div>
      </motion.div>

      {/* keep Why Choose Us as a separate section later on the page, not inside the hero visually */}
    </section>
  );
}
