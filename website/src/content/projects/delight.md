---
title: 'Delight'
role: 'Founder & Lead Engineer'
tech:
  - 'Python'
  - 'LangGraph'
  - 'FastAPI'
  - 'Next.js'
  - 'React'
  - 'Chroma'
  - 'Pydantic'
summary: 'Emotionally intelligent AI companion that turns overwhelming goals into small, adaptive missions while tracking your journey across health, craft, growth, and relationships.'
description: 'Built for ambitious people who drop their biggest goals when life gets chaotic. Delight starts with how you feel, uses a three-tier memory system, and wraps progress in a narrative layer that gives in-universe rewards for real-world work.'
startDate: 2024-08-01
status: 'Ongoing'
category: 'AI & Agents'
featured: true
gallery:
  - src: '/assets/projects/delight.png'
    alt: 'Delight dashboard showing missions and progress constellation'
links:
  - label: 'GitHub'
    url: 'https://github.com/magk-app/delight'
  - label: 'Live Site'
    url: 'https://delight.magk.app'
---

Delight is an AI companion for ambitious people who keep dropping their biggest goals once life gets chaotic. Instead of being another rigid task app, it starts with how you feel, then turns your long-term goals into small, energy-matched missions and tracks them across four life pillars: health, craft, growth, and relationships.

## The Problem

Most productivity tools assume you have infinite motivation and perfect consistency. They don't account for burnout, context switching, or the emotional reality of pursuing hard things. When stress hits, these systems break down — and you abandon your most important work.

## How Delight Works

**Emotional Check-ins** – Every session starts by asking how you feel. This isn't "therapy cosplay" — it's a signal that drives mission selection and pacing. If you're burned out, Delight will dial down the intensity; if you're energized, it might push you harder.

**Adaptive Missions** – Your big goals get broken into small, actionable missions that match your current energy and context. When you're exhausted, Delight suggests tiny wins to keep momentum. When you're on a roll, it offers stretch challenges. The system dynamically adjusts to keep you progressing without overwhelming you.

**Three-Tier Memory System:**

- **Personal Memory** – Who you are, your values, past struggles, what's worked before. (Long-term user model.)
- **Project Memory** – Your active goals, their history, why they matter to you. (Mid-term, goal-specific context.)
- **Task Memory** – The current mission at hand, its state and immediate context. (Short-term working memory.)

This architecture means Delight remembers your entire journey instead of resetting every conversation. It knows if you've attempted a similar task before and failed, and it adjusts its approach accordingly.

**Progress Tracking** – Delight isn't just a chat interface; it visualizes your work as part of a personal narrative:

- A Daily Consistency Index measures your streaks in each life pillar.
- A Progress Constellation shows your momentum across goals.
- Highlight Reels capture your wins and reflect on milestones.
- Narrative Worlds (cyberpunk, fantasy, sci-fi themes) wrap your progress in a story, so pursuing your goals feels like leveling up in a game rather than checking boxes on a list.

## Technical Architecture

Delight uses LangGraph for multi-agent orchestration with stateful flows. Different agents handle emotional assessment, mission generation, and memory updates, coordinating through a shared state graph (so the "how I feel" agent informs the "mission planner" agent, etc.).

The three-tier memory is backed by Chroma (a vector database) with Pydantic models ensuring each memory type has a strict schema. This allows semantic search across your history when the AI is deciding what you should do next or how to encourage you.

**Backend**: FastAPI orchestrates the agents, manages memory retrieval/upsert, and handles user authentication/sessions. We optimize for low inference cost (using local models or efficient OpenAI calls) to keep it affordable per user.

**Frontend**: Next.js + React, providing the narrative UI, mission dashboard, and real-time visualization of progress. The design emphasizes a playful, story-driven experience instead of a typical productivity dashboard.

## Why This Matters

Delight isn't just "GPT with a todo list." It's built on a thesis that emotional state, memory, and narrative are all critical to actually achieving big goals. For founders, students, and multi-project jugglers who want something between a therapist, a productivity coach, and an RPG sidekick — Delight is meant to fill that role.

By remembering your journey and adapting to your life's ups and downs, it keeps you on track when traditional systems would fail. It's an experiment in making AI not just instructive but truly supportive for the long haul.

## Current Status

Actively developed under the MAGK organization. The core orchestration engine, memory system, and narrative layer are live in a private beta. We're iterating on mission selection algorithms and expanding the world-building elements based on early user feedback. Next up: adding more nuanced emotional modeling and integrating wearable data (for health context) to further personalize mission suggestions.
