'use client';

import { useState, useEffect } from 'react';

export default function GoogleReview() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const href = placeId
    ? `https://search.google.com/local/writereview?placeid=${placeId}`
    : undefined;

  // Close modal with ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const handleFakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending...
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 3000); // close after 2s
    }, 800); // fake network delay
  };

  return (
    <>
      <a
        href={href}
        onClick={(e) => {
          if (!href) {
            e.preventDefault();
            setOpen(true);
          }
        }}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-yellow-500 hover:to-yellow-600 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2'
      >
        Leave a Review
      </a>

      {/* Modal */}
      {open && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'
          onClick={(e) => e.currentTarget === e.target && setOpen(false)}
        >
          <div className='w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'>
            {!success ? (
              <>
                <h3 className='text-lg font-semibold'>Leave a review</h3>
                <p className='mt-2 text-sm text-gray-600'>
                  Google reviews will be available once our Google Business
                  Profile is live. For now, share your experience below. We’ll
                  feature it on our site.
                </p>

                <form onSubmit={handleFakeSubmit} className='mt-4 space-y-3'>
                  <input
                    type='text'
                    name='name'
                    required
                    placeholder='Your name'
                    className='w-full rounded-lg border px-3 py-2'
                  />
                  <select
                    name='rating'
                    required
                    className='w-full rounded-lg border px-3 py-2'
                  >
                    <option value=''>Rating</option>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </select>
                  <textarea
                    name='text'
                    required
                    rows={4}
                    placeholder='Your review'
                    className='w-full rounded-lg border px-3 py-2'
                  />
                  <div className='flex items-center justify-end gap-2 pt-2'>
                    <button
                      type='button'
                      onClick={() => setOpen(false)}
                      className='rounded-lg border px-4 py-2'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className='text-center py-8'>
                <h3 className='text-lg font-semibold text-green-600'>
                  ✅ Review submitted successfully!
                </h3>
                <p className='mt-2 text-gray-600'>
                  Thank you for your feedback.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
