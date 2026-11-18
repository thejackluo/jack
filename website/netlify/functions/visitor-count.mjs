import { getStore } from '@netlify/blobs';

// POST increments (once per browser session, deduped client-side); GET reads.
export default async (req) => {
  try {
    const store = getStore('site-stats');
    let count = parseInt((await store.get('visitors')) || '0', 10);
    if (req.method === 'POST') {
      count += 1;
      await store.set('visitors', String(count));
    }
    return Response.json({ count }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ count: null });
  }
};
