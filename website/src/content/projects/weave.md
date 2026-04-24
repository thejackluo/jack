---
title: 'Weave'
role: 'Founder & Lead Engineer'
tech:
  - 'React Native'
  - 'Expo'
  - 'TypeScript'
  - 'FastAPI'
  - 'Supabase'
  - 'OpenAI API'
  - 'Anthropic API'
summary: 'AI-powered mobile productivity: habits as daily “binds,” proof and reflections, streaks and heatmaps, and a Dream Self coach that turns vague goals into a narrative so you do not quit.'
description: 'Weave (repo: weaive) is a dark-first React Native app plus FastAPI backend that breaks goals into daily actions and keeps you consistent with streaks, proof, and coaching—not generic task lists.'
startDate: 2025-06-01
status: 'Ongoing'
category: 'Productivity'
featured: true
gallery:
  - src: '/assets/projects/weave-hero.webp'
    alt: 'Weave prototype screens showing Needles, Daily Check-In, and a bind flow (timer/photo accountability)'
    caption: 'Prototype — Needles, daily check-in, and bind execution'
  - src: '/assets/projects/weave.webp'
    alt: 'Weave prototype (full) showing three mobile screens: dashboard, needles list, and a bind start screen'
    caption: 'Prototype — full screenshot set'
links:
  - label: 'GitHub'
    url: 'https://github.com/thejackluo/weaive'
---

Weave is an **AI-powered habit product** for people who care about big goals but struggle to execute every day. You **weave** progress through **binds** (daily actions), **proof** (photos, timers, notes), evening **reflection**, and a **Dream Self** coach that speaks in the voice of who you are trying to become.

## Product loop

1. **Goals → habits** — Vague intentions get broken into subgoals and repeatable daily binds.
2. **Daily triad** — After you journal, the app suggests three tasks for the next day so you always have a simple plan.
3. **Proof** — Finishing binds can attach captures; the history stays honest over time.
4. **Streaks & heatmaps** — Consistency you can see, without turning your life into a guilt trip.

## Stack

Monorepo [**thejackluo/weaive**](https://github.com/thejackluo/weaive): **weave-mobile** (Expo, NativeWind) and **weave-api** (FastAPI, Supabase). Docs and stories live in-repo for a clear build spec.

## Status

In active development: onboarding, backend, and mobile in the same loop. Shipping path is polish and reliability (notifications, flows) on top of the core loop above.
