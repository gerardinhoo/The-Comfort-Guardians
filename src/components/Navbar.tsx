'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyle =
    'uppercase font-semibold tracking-wide hover:text-blue-600 transition-colors duration-200';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src={logo}
            alt='Comfort Guardians Logo'
            width={300}
            className='h-10 w-auto'
          />
          <span className='font-bold text-blue-600 text-lg'>
            THE COMFORT GUARDIANS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-6 text-sm text-gray-800'>
          <Link href='#home' className={navLinkStyle}>
            Home
          </Link>
          <Link href='#services' className={navLinkStyle}>
            Services
          </Link>
          <Link href='#financing' className={navLinkStyle}>
            Financing
          </Link>
          <Link href='#testimonials' className={navLinkStyle}>
            Testimonials
          </Link>
          {/* <Link href='#contact' className={navLinkStyle}>
            Contact
          </Link> */}
          <Link href='#whyUs' className={navLinkStyle}>
            Why Us
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} aria-label='Toggle Menu'>
            <svg
              className='w-6 h-6 text-gray-800'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className='md:hidden bg-white shadow-md px-6 py-6 space-y-5'>
          <Link
            href='#home'
            onClick={() => setIsOpen(false)}
            className={navLinkStyle}
          >
            Home
          </Link>
          <Link
            href='#services'
            onClick={() => setIsOpen(false)}
            className={navLinkStyle}
          >
            Services
          </Link>
          <Link
            href='#financing'
            onClick={() => setIsOpen(false)}
            className={navLinkStyle}
          >
            Financing
          </Link>
          <Link
            href='#testimonials'
            onClick={() => setIsOpen(false)}
            className={navLinkStyle}
          >
            Testimonials
          </Link>
          {/* <Link
            href='#contact'
            onClick={() => setIsOpen(false)}
            className={navLinkStyle}
          >
            Contact
          </Link> */}
          <Link
            href='#why-us'
            onClick={() => setIsOpen(false)}
            className={navLinkStyle}
          >
            Why Us
          </Link>
        </div>
      )}
    </nav>
  );
}
