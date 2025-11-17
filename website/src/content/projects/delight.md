---
title: "Delight"
role: "Founder & Lead Engineer"
tech:
  - "Python"
  - "LangGraph"
  - "FastAPI"
  - "Next.js"
  - "React"
  - "Chroma"
  - "Pydantic"
summary: "Emotionally intelligent AI companion that turns overwhelming goals into small, adaptive missions while tracking your journey across health, craft, growth, and relationships."
description: "Built for ambitious people who drop their biggest goals when life gets chaotic. Delight starts with how you feel, uses a three-tier memory system, and wraps progress in a narrative layer that gives in-universe rewards for real-world work."
startDate: 2024-08-01
status: "Ongoing"
category: "AI & Agents"
featured: true
gallery:
  - src: "/assets/projects/delight.png"
    alt: "Delight dashboard showing missions and progress constellation"
links:
  - label: "GitHub"
    url: "https://github.com/magk-app/delight"
  - label: "Live Site"
    url: "https://delight.magk.app"
---

Delight is an AI companion for ambitious people who keep dropping their biggest goals once life gets chaotic. Instead of being another rigid task app, it starts with how you feel, then turns your long-term goals into small, energy-matched missions and tracks them across health, craft, growth, and relationships.

## The Problem

Most productivity tools assume you have infinite energy and perfect context. They don't account for burnout, context switching, or the emotional reality of pursuing hard things. When stress hits, these systems break down—and you abandon your most important work.

## How Delight Works

**Emotional Check-ins**
Every session starts by asking how you feel. This isn't therapy cosplay—it's the signal that drives mission selection and pacing.

**Adaptive Missions**
Your big goals get broken into small, actionable missions that match your current energy and context. When you're burned out, Delight suggests smaller wins. When you're energized, it pushes you harder.

**Three-Tier Memory System**
- **Personal Memory**: Who you are, your values, past struggles, what's worked before
- **Project Memory**: Active goals, their history, why they matter to you
- **Task Memory**: Individual missions, their state, dependencies, completion patterns

This architecture means Delight remembers your entire journey instead of resetting every conversation. It knows when you've tried something before and failed, and it adjusts.

**Progress Tracking**
- Daily Consistency Index measuring streaks across life dimensions
- Progress Constellation visualizing your momentum
- Highlight Reels capturing your wins
- Narrative "worlds" (cyberpunk, fantasy, sci-fi) that make progress feel like a story you're living

## Technical Architecture

Delight uses **LangGraph** for multi-agent orchestration with stateful flows, managing emotional assessment, mission generation, and memory updates as separate agents that coordinate through a shared state graph.

The **three-tier memory** is stored in **Chroma** (vector DB) with **Pydantic** models ensuring schema consistency. This allows semantic search across your history when making decisions about what you should do next.

**Backend**: FastAPI handles the orchestration layer, agent coordination, and memory management. Inference runs on cost-constrained models to keep per-user overhead low while maintaining quality.

**Frontend**: Next.js + React app deployed on Vercel, providing the narrative UX, mission dashboard, and real-time progress visualization.

## Why This Matters

Delight isn't just "chatbot with a todo list." It's a coherent product thesis: **emotional state, memory, and narrative, all linked into concrete behavior change**.

For founders, students, and multi-project operators who want something between therapy, a productivity system, and an RPG that actually moves their life forward—Delight is the companion that remembers your journey and keeps you on track when everything else would make you quit.

## Current Status

Actively developed under the MAGK organization. The core orchestration engine, memory system, and narrative layer are live. Currently iterating on mission selection algorithms and expanding the world-building system based on early user feedback.
