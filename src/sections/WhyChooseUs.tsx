'use client';

export default function WhyChooseUs() {
  return (
    <section className='py-16 bg-white text-center px-6 md:px-12'>
      <h2 className='text-3xl md:text-4xl font-bold mb-10 text-gray-800'>
        Why Choose The Comfort Guardians?
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left'>
        <div className='bg-gray-100 rounded-lg shadow p-6'>
          <h3 className='font-semibold text-xl mb-2'>💰 Fair Prices</h3>
          <p className='text-gray-600'>Honest work at honest rates.</p>
        </div>
        <div className='bg-gray-100 rounded-lg shadow p-6'>
          <h3 className='font-semibold text-xl mb-2'>🔧 Honest Work</h3>
          <p className='text-gray-600'>Bringing comfort to every home.</p>
        </div>
        <div className='bg-gray-100 rounded-lg shadow p-6'>
          <h3 className='font-semibold text-xl mb-2'>
            🏡 Affordable Solutions
          </h3>
          <p className='text-gray-600'>Without breaking the bank.</p>
        </div>
      </div>
    </section>
  );
}
