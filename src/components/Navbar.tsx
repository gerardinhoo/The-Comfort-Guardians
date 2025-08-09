'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo.png';

const LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'Services', href: '/#services' },
  { label: 'Financing', href: '/#financing' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Gallery', href: '/gallery' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        isScrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white'
      }`}
    >
      {/* This bar defines the height; don't make it fixed */}
      <nav className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4'>
        <Link href='/' className='flex items-center gap-2'>
          <Image
            src={logo}
            alt='The Comfort Guardians'
            className='h-8 w-auto'
            priority
          />
          <span className='text-base font-extrabold tracking-wide text-blue-600'>
            THE COMFORT GUARDIANS
          </span>
        </Link>

        <div className='hidden items-center gap-6 md:flex'>
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className='relative text-[15px] font-medium text-neutral-800 transition-colors hover:text-blue-600
                         after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600
                         after:transition-all after:duration-300 hover:after:w-full'
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label='Toggle menu'
          className='md:hidden rounded-md p-2 text-neutral-800 hover:bg-neutral-100'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            stroke='currentColor'
            fill='none'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </nav>

      {open && (
        <div className='md:hidden'>
          <div className='mx-auto max-w-7xl px-4 pb-6'>
            <div className='rounded-2xl border bg-white shadow-lg'>
              <div className='flex flex-col divide-y'>
                {LINKS.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className='px-5 py-4 text-center text-lg font-semibold text-neutral-900 hover:bg-neutral-50'
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div
            className='fixed inset-0 -z-10 bg-black/10'
            onClick={() => setOpen(false)}
          />
        </div>
      )}
    </header>
  );
}
