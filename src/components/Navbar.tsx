'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Financing', href: '#financing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
  { name: 'Why Us', href: '#whyUs' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'py-3 shadow-md bg-white' : 'py-6'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        <Link href='#home' className='flex items-center gap-2'>
          <Image
            src={logo}
            alt='Comfort Guardians Logo'
            width={300}
            className='h-10 w-auto'
          />
          <span className='text-blue-700 font-bold text-lg'>
            Comfort Guardians
          </span>
        </Link>

        <ul className='flex gap-6 text-gray-700 text-sm font-medium'>
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.href} className='hover:text-blue-600 transition'>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
