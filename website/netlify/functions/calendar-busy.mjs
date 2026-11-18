import ical from 'node-ical';

// Returns only { busy, until } — the private ICS URL stays server-side and
// event titles/details never leave this function. busy is null when no feed
// could be read, so an outage shows "unknown" rather than a false "free".
export default async () => {
  const urls = (process.env.CALENDAR_ICS_URL || '')
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean);
  if (!urls.length) return json({ busy: null });

  const now = new Date();
  const results = await Promise.allSettled(urls.map((u) => loadEvents(u, now)));
  const spans = results.filter((r) => r.status === 'fulfilled').flatMap((r) => r.value);
  if (urls.length && !spans.length && results.every((r) => r.status === 'rejected')) {
    return json({ busy: null });
  }

  const until = spans.reduce((latest, [, e]) => (e > latest ? e : latest), null);
  return json({ busy: spans.length > 0, until });
};

// Events spanning `now` in one feed. Throws on fetch failure so all-dead
// calendars are distinguishable from genuinely empty ones.
async function loadEvents(url, now) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`ical ${res.status}`);
  const data = ical.sync.parseICS(await res.text());
  const spans = [];
  for (const ev of Object.values(data)) {
    if (ev.type !== 'VEVENT') continue;
    if (ev.status === 'CANCELLED') continue;
    // events Jack marked "free"/transparent don't count as busy
    if (ev.transparency === 'TRANSPARENT') continue;
    // all-day entries (holidays, birthdays, OOO markers) aren't "in a meeting"
    if (ev.datetype === 'date') continue;
    for (const [s, e] of instances(ev, now)) spans.push([s, e]);
  }
  return spans;
}

function* instances(ev, now) {
  const start = new Date(ev.start);
  const end = new Date(ev.end);
  if (!isFinite(start) || !isFinite(end)) return;

  // Rescheduled single instances live in ev.recurrences (each stored under two
  // keys — dedupe by recurrenceid). Yield them, and remember which original
  // occurrences they replaced so the rrule expansion skips them.
  const overridden = new Set();
  const seenOverrides = new Set();
  for (const rec of Object.values(ev.recurrences || {})) {
    const rid = String(rec.recurrenceid || '');
    if (seenOverrides.has(rid)) continue;
    seenOverrides.add(rid);
    if (rid) overridden.add(new Date(rec.recurrenceid).getTime());
    if (rec.status === 'CANCELLED' || rec.transparency === 'TRANSPARENT' || rec.datetype === 'date') continue;
    const s = new Date(rec.start);
    const e = new Date(rec.end);
    if (isFinite(s) && isFinite(e) && s <= now && now < e) yield [s, e];
  }

  if (!ev.rrule) {
    if (start <= now && now < end) yield [start, end];
    return;
  }

  // Expand recurrences near now; a rescheduled occurrence is replaced by its
  // RECURRENCE-ID override above, so the original time no longer counts.
  const dur = end.getTime() - start.getTime();
  const exdates = new Set();
  if (ev.exdate) {
    for (const v of Object.values(ev.exdate)) {
      if (typeof v === 'string') exdates.add(new Date(v).getTime());
    }
  }
  const occs = ev.rrule.between(new Date(now.getTime() - dur - 86400000), new Date(now.getTime() + 86400000));
  for (const o of occs) {
    const s = o.getTime();
    if (exdates.has(s) || overridden.has(s)) continue;
    const e = s + dur;
    if (s <= now.getTime() && now.getTime() < e) yield [o, new Date(e)];
  }
}

function json(body) {
  return Response.json(body, {
    headers: { 'Cache-Control': 'public, max-age=60' },
  });
}
