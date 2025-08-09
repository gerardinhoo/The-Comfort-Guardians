'use client';

import type { GalleryItem } from '@/types/gallery';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // keyboard controls
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight')
        setIdx((i) => Math.min(i + 1, items.length - 1));
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, items.length]);

  const openAt = (i: number) => {
    setIdx(i);
    setOpen(true);
  };

  const gridItems = useMemo(() => {
    // simple “masonry-like” feel by mixing row spans
    return items.map((it, i) => ({
      ...it,
      span:
        i % 7 === 0 ? 'row-span-2' : i % 5 === 0 ? 'row-span-2' : 'row-span-1',
    }));
  }, [items]);

  return (
    <section className='mx-auto max-w-6xl px-4 py-16 bg-gradient-to-b from-white to-[#f9fafb]'>
      <div className='mb-8 text-center'>
        <h2 className='text-3xl font-bold'>Our Work</h2>
        <p className='mt-2 text-gray-600'>
          A peek at recent installs, repairs, and maintenance.
        </p>
      </div>

      {/* Grid */}
      {/* Grid */}
      <motion.ul
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.05 },
          },
        }}
        className='grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4'
      >
        {items.map((it, i) => (
          <motion.li
            key={i}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            className='group relative cursor-pointer overflow-hidden rounded-2xl border bg-white shadow-sm'
            onClick={() => openAt(i)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openAt(i)}
            aria-label={`Open image ${i + 1}: ${it.alt}`}
          >
            <div className='relative h-[180px] w-full md:h-[220px] lg:h-[240px]'>
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                className='object-cover transition-transform duration-300 group-hover:scale-105'
                priority={i < 4}
              />
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </div>
            {it.caption ? (
              <div className='absolute bottom-2 left-2 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur'>
                {it.caption}
              </div>
            ) : null}
          </motion.li>
        ))}
      </motion.ul>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.currentTarget === e.target && setOpen(false)}
          >
            <motion.div
              className='relative w-full max-w-5xl'
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 10, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            >
              {/* Image wrapper */}
              <div className='relative overflow-hidden rounded-2xl bg-white/5 shadow-2xl ring-1 ring-white/10'>
                <div className='relative aspect-[16/10] w-full'>
                  <Image
                    src={items[idx].src}
                    alt={items[idx].alt}
                    fill
                    sizes='90vw'
                    className='object-contain'
                    priority
                  />
                </div>

                {/* Caption */}
                <div className='flex items-center justify-between gap-3 px-4 py-3 text-sm text-white/90'>
                  <span className='truncate'>
                    {items[idx].caption ?? items[idx].alt}
                  </span>
                  <span className='opacity-70'>
                    {idx + 1} / {items.length}
                  </span>
                </div>

                {/* Controls */}
                <div className='pointer-events-none absolute inset-0 flex items-center justify-between px-1'>
                  <button
                    onClick={() => setIdx((i) => Math.max(0, i - 1))}
                    disabled={idx === 0}
                    className='pointer-events-auto rounded-full bg-white/80 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    aria-label='Previous image'
                  >
                    ‹
                  </button>
                  <button
                    onClick={() =>
                      setIdx((i) => Math.min(items.length - 1, i + 1))
                    }
                    disabled={idx === items.length - 1}
                    className='pointer-events-auto rounded-full bg-white/80 p-2 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
                    aria-label='Next image'
                  >
                    ›
                  </button>
                </div>

                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className='absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  aria-label='Close'
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
