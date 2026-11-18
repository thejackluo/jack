import ical from 'node-ical';

// Returns only { busy, until } — the private ICS URL stays server-side and
// event titles/details never leave this function.
export default async () => {
  const urls = (process.env.CALENDAR_ICS_URL || '')
    .split(',')
    .map((u) => u.trim())
    .filter(Boolean);
  if (!urls.length) return json({ busy: null });

  const now = new Date();
  const results = await Promise.allSettled(urls.map((u) => loadEvents(u, now)));

  let busy = false;
  let until = null;
  for (const r of results) {
    if (r.status !== 'fulfilled') continue;
    for (const [s, e] of r.value) {
      busy = true;
      if (!until || e > until) until = e;
    }
  }
  return json({ busy, until });
};

// Events spanning `now`, from every calendar feed provided.
async function loadEvents(url, now) {
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) return [];
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
  const dur = end - start;

  if (!ev.rrule) {
    if (start <= now && now < end) yield [start, end];
    return;
  }

  // recurring: an instance that covers `now` started within [now-dur, now]
  const dates = ev.rrule.between(new Date(now - dur), new Date(now + dur), true);
  for (const d of dates) {
    if (ev.exdate) {
      const key = d.toISOString().slice(0, 10);
      if (Object.keys(ev.exdate).some((x) => x.startsWith(key))) continue;
    }
    yield [d, new Date(d.getTime() + dur)];
  }
}

const json = (body) =>
  new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
  });
