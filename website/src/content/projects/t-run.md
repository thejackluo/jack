---
title: 'T Run · MBTA Route Studio'
role: 'Builder — Guinness all-stations attempt planning'
tech:
  - 'Python'
  - 'GTFS'
  - 'Google Maps JS API'
  - 'Google Routes API'
  - 'Vanilla JS'
  - 'Vercel'
summary: 'A map studio for planning an all-stations Boston MBTA run: follow the tracks, mix train rides with street runs, and time every leg against the official schedule.'
description: 'Rail schedule backend plus a browser route studio for building, timing and exporting multi-leg ride/run itineraries for a Guinness World Record attempt.'
startDate: 2026-10-01
status: 'Ongoing'
category: 'Productivity'
youtube: 'gjFT5qbdlu8'
gallery:
  - src: '/assets/projects/t-run.webp'
    alt: 'MBTA Route Studio: Boston rail map with stations, itinerary panel and coverage counter'
    caption: 'Route studio — 125 stations to cover'
  - src: '/assets/projects/t-run-demo.webp'
    alt: 'T Run guided demo tour: the full MBTA rail network as an interactive map with chapter captions'
    caption: 'Guided demo — a seven-chapter tour computed from the live GTFS schedule'
links:
  - label: 'Guided demo'
    url: 'https://mbta-route-studio.vercel.app/demo'
  - label: 'Live app'
    url: 'https://mbta-route-studio.vercel.app'
  - label: 'GitHub'
    url: 'https://github.com/thejackluo/t'
---

The goal: ride every MBTA rapid transit station in one day, fast enough for a **Guinness World Record**. There's a self-running [guided demo](https://mbta-route-studio.vercel.app/demo) that tours the studio in seven chapters — rides, transfers, auto timing, buses and the Silver Line, backtracking detection, and sharing — all computed live from the real GTFS schedule.

**T Run** imports the official MBTA GTFS feed and compiles it into schedule tables. The **route studio** lets you click two stations, or drag along a line, to preview the path. **Auto** mode times the train against a Google street run for the same pair and puts the fastest first. Every leg shows its scheduled time, and coverage is counted from every station a ridden train passes.

Scheduled, estimated and observed times stay separate, and directed transfers and boarding restrictions are preserved. Plans export to JSON, CSV or Google My Maps.
