'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Phone number is required'),
  message: z.string().min(10, 'Message is too short'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');

      toast.success('Message sent successfully!');
      reset();
    } catch (err) {
      toast.error('Something went wrong. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='contact' className='py-16 bg-gray-50 px-6 md:px-20'>
      <div className='max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8'>
        <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
          Contact Us
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {/* Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              {...register('name')}
              className='w-full mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 bg-white'
            />
            {errors.name && (
              <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              {...register('email')}
              className='w-full mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 bg-white'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Phone
            </label>
            <input
              type='tel'
              {...register('phone')}
              className='w-full mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 bg-white'
            />

            {errors.phone && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Message
            </label>
            <textarea
              {...register('message')}
              className='w-full mt-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 bg-white'
              rows={4}
            />
            {errors.message && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-300 hover:scale-[1.02] transform'
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
