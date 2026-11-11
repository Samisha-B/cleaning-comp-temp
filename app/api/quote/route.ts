import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 }); }
  if (!b?.name || !b?.email || !b?.phone || !b?.zip || !b?.service) {
    return NextResponse.json({ ok: false, error: 'Missing required fields.' }, { status: 422 });
  }
  const url = process.env.FORM_ENDPOINT;
  if (!url) {
    console.log('[quote request - FORM_ENDPOINT not set, not delivered]', b);
    return NextResponse.json({ ok: true, delivered: false });
  }
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(b) });
    if (!r.ok) throw new Error(String(r.status));
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not deliver your request. Please call us instead.' }, { status: 502 });
  }
}
