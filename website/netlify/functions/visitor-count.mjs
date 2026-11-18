import { getStore } from '@netlify/blobs';

// POST increments (once per browser session, deduped client-side); GET reads.
// CAS retries keep overlapping visits from losing increments, and a per-minute
// cap limits scripted inflation — the counter is a fun stat, not analytics.
const MAX_PER_MINUTE = 20;
const ATTEMPTS = 4;

export default async (req) => {
  try {
    const store = getStore('site-stats');

    if (req.method !== 'POST') {
      const count = parseInt((await store.get('visitors')) || '0', 10);
      return Response.json({ count }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const minute = Math.floor(Date.now() / 60000);
    const [bucketMin, bucketN] = ((await store.get('visitors:minute')) || '0:0').split(':');
    if (bucketMin === String(minute) && parseInt(bucketN, 10) >= MAX_PER_MINUTE) {
      const count = parseInt((await store.get('visitors')) || '0', 10);
      return Response.json({ count }, { headers: { 'Cache-Control': 'no-store' } });
    }

    for (let i = 0; i < ATTEMPTS; i++) {
      const entry = await store.getWithMetadata('visitors');
      const count = parseInt(entry?.data || '0', 10) + 1;
      const res = entry?.etag
        ? await store.set('visitors', String(count), { onlyIfMatch: entry.etag })
        : await store.set('visitors', String(count), { onlyIfNew: true });
      if (res.modified) {
        const next = bucketMin === String(minute) ? parseInt(bucketN, 10) + 1 : 1;
        store.set('visitors:minute', `${minute}:${next}`).catch(() => {});
        return Response.json({ count }, { headers: { 'Cache-Control': 'no-store' } });
      }
    }

    // Lost every retry — report the count without claiming an increment.
    const count = parseInt((await store.get('visitors')) || '0', 10);
    return Response.json({ count }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json({ count: null });
  }
};
