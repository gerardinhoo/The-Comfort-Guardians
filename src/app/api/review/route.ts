import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    // basic bot catch
    if (String(form.get('_gotcha') || '')) {
      return NextResponse.redirect('/thank-you', { status: 303 });
    }

    const endpoint = process.env.FORMSPREE_REVIEWS_ENDPOINT!;
    if (!endpoint)
      return NextResponse.json({ error: 'No endpoint' }, { status: 500 });

    const payload = new URLSearchParams({
      name: String(form.get('name') || ''),
      rating: String(form.get('rating') || ''),
      text: String(form.get('text') || ''),
      _subject: 'New Website Review (Temporary)',
    });

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: payload,
    });

    if (!res.ok) throw new Error('Formspree error');
    return NextResponse.redirect('/thank-you', { status: 303 });
  } catch {
    return NextResponse.json(
      { error: 'Unable to submit review' },
      { status: 500 }
    );
  }
}
