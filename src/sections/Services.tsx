'use client';

const services = [
  {
    title: 'HVAC Installation',
    description:
      'Professional setup of heating and cooling systems tailored to your home or business.',
  },
  {
    title: 'AC Repair',
    description:
      'Fast and reliable air conditioning repair to restore comfort quickly.',
  },
  {
    title: 'Heating Maintenance',
    description:
      'Keep your heating system running efficiently all winter long with routine maintenance.',
  },
  {
    title: 'Air Quality Solutions',
    description:
      'Enhance indoor air quality with purification and filtration services.',
  },
];

export default function Services() {
  return (
    <section className='py-20 bg-white text-black' id='services'>
      <div className='max-w-5xl mx-auto px-6'>
        <h2 className='text-3xl font-bold text-center mb-12'>Our Services</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {services.map((service) => (
            <div
              key={service.title}
              className='p-6 rounded-xl shadow-md bg-gray-50 hover:bg-gray-100 transition'
            >
              <h3 className='text-xl font-semibold mb-2'>{service.title}</h3>
              <p className='text-gray-700'>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
