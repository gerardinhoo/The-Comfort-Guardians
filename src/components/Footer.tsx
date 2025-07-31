// app/components/Footer.tsx

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-white py-10'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 text-sm'>
          {/* Brand Info */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <Image
                src={logo}
                alt='Comfort Guardians Logo'
                width={40}
                height={40}
              />
              <span className='text-lg font-semibold'>
                The Comfort Guardians
              </span>
            </div>
            <p className='text-gray-400'>
              Heating & Cooling Comfort You Can Count On.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-white font-semibold mb-3'>Quick Links</h4>
            <ul className='space-y-1 text-gray-300'>
              <li>
                <Link href='#home'>Home</Link>
              </li>
              <li>
                <Link href='#services'>Services</Link>
              </li>
              <li>
                <Link href='#financing'>Financing</Link>
              </li>
              <li>
                <Link href='#testimonials'>Testimonials</Link>
              </li>
              <li>
                <Link href='#contact'>Contact</Link>
              </li>
              <li>
                <Link href='#whyUs'>Why Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-white font-semibold mb-3'>Get in Touch</h4>
            <p className='text-gray-300'>
              Email: Mayel@thecomfortsguardians.com
            </p>
            <p className='text-gray-300'>Phone: (404) 542-4332</p>
          </div>
        </div>

        <hr className='my-8 border-gray-700' />
        <p className='text-center text-gray-500 text-xs'>
          © {new Date().getFullYear()} The Comfort Guardians. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
