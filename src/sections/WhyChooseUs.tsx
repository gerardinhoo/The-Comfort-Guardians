'use client';

export default function WhyChooseUs() {
  return (
    <section className='py-20 px-6 md:px-12 bg-gradient-to-b from-white to-[#fff9f5] text-center'>
      <h2 className='text-3xl md:text-4xl font-bold mb-12 text-gray-900'>
        Why Choose The Comfort Guardians?
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left'>
        {[
          {
            icon: '💰',
            title: 'Fair Prices',
            desc: 'Honest work at honest rates.',
          },
          {
            icon: '🔧',
            title: 'Honest Work',
            desc: 'Bringing comfort to every home.',
          },
          {
            icon: '🏡',
            title: 'Affordable Solutions',
            desc: 'Without breaking the bank.',
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className='bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6 hover:shadow-lg hover:scale-105 transition-transform duration-300'
          >
            <h3 className='text-xl font-semibold mb-2 text-gray-800'>
              <span className='mr-2'>{item.icon}</span>
              {item.title}
            </h3>
            <p className='text-gray-600'>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
