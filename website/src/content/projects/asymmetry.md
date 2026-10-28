---
title: 'Asymmetry'
role: 'Coordinator — 4 parallel Devins, 5-hour hackathon'
tech:
  - 'TypeScript'
  - 'Next.js'
  - 'Socket.IO'
  - 'SQLite'
  - 'OpenAI function calling'
  - 'd3-force'
summary: 'Personal AI agents that negotiate across your trusted network to surface jobs, housing, buyers and intros, sharing only what each request strictly needs.'
description: 'Digital-twin agents that coordinate supply and demand already hidden inside your extended network, with scoped trust instead of after-the-fact filtering.'
startDate: 2026-10-24
status: 'Ongoing'
category: 'AI & Agents'
video:
  src: '/assets/projects/asymmetry-demo.mp4'
  poster: '/assets/projects/asymmetry-poster.webp'
gallery:
  - src: '/assets/projects/asymmetry-poster.webp'
    alt: 'Asymmetry demo: a glowing network graph where Jack’s agent finds an apartment via Carol and a car via Akash'
    caption: 'Demo — agents routing an apartment and a used car through the network'
links:
  - label: 'GitHub'
    url: 'https://github.com/thejackluo/asymmetry'
---

Supply and demand already exist inside your extended network. What's missing is coordination and **scoped trust**.

In **Asymmetry**, every person has an agent. You tell yours what you're looking for, and it opens subchats with other people's agents. Each remote agent answers from a memory engine that only releases items whose classification (`public` / `network` / `private`) allows disclosure to that requester and that match the request's scope. Everything else stays invisible, rather than being filtered after the fact.

In the demo, Jack's agent finds an apartment near Georgia Tech through Carol's network and a reliable used car through Akash, without either side seeing more than the match needs.

Built with four parallel Devins in a 5-hour hackathon. Each one pushed its own PRs, and a different model reviewed every PR.
