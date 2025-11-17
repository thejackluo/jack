---
title: 'Vigama'
role: 'Co-founder & Systems Engineer'
tech:
  - 'TypeScript'
  - 'Next.js'
  - 'OpenAI API'
  - 'Speech Recognition'
summary: 'Voice-first productivity assistant that turns spoken intent into scheduled routines and automated follow-up tasks.'
description: 'Built an AI-driven productivity companion that captures input via text or speech, generates daily plans, and executes scripted actions on behalf of busy operators.'
startDate: 2023-01-15
endDate: 2023-08-30
status: 'Completed'
category: 'Archive'
featured: false
gallery:
  - src: '/assets/projects/vigama.gif'
    alt: 'Vigama automation workflow preview'
links:
  - label: 'Live Site'
    url: 'https://vigama.tech'
---

Vigama was my first deep dive into building an end-to-end AI product. It's a voice-driven productivity assistant that helps solopreneurs and small teams offload the cognitive load of daily planning. Users describe what needs to get done (via natural text or speech), and the assistant assembles a prioritized schedule, drafts reminders, and even queues up some automations.

## Highlights

- **Multimodal Capture** – Supports live speech transcription, chat-style text prompts, and quick-slash command macros. However you prefer to "tell" your assistant, Vigama captures it.
- **Intelligent Task Breakdown** – Fuzzy goals (e.g. "finish project report and prep for meeting") get broken into atomic tasks with dependencies identified. Vigama applies simple heuristics and LLM reasoning to order tasks logically and schedule them across the day.
- **Auto-Execution Hooks** – Integrates with common SaaS APIs (email, Slack, Google Docs, etc.) so that when a task is due or completed, follow-ups can happen automatically. For example, after a "draft weekly report" task, Vigama can auto-send the draft to your team, or if you schedule a meeting, it can send the calendar invite to participants.
- **User-in-the-Loop** – Before executing any critical action (like sending an email or booking a meeting), the assistant asks for confirmation or presents a diff. This way it remains a copilot, not a rogue agent.

## Personal Contribution

I led the overall architecture of Vigama:

- Designed the orchestration layer that takes user input (text or voice) and decides whether to create tasks, ask follow-up questions, or execute an API call.
- Implemented scheduling heuristics that prioritize tasks based on deadlines, estimated duration, and the user's stated preferences (for example, blocking focus time in mornings).
- Tied in the LLM (OpenAI's API) prompts that turn a blob of user input into a structured plan for the day. This involved prompt tuning to avoid overly generic plans and to include user context (like known routines or meetings from their calendar).
- Focused heavily on guardrails: ensuring the system doesn't, say, send half-finished emails or schedule conflicting events. This was partly solved by prompt engineering and partly by explicit rule checks in code.

This project culminated in a live demo/pitch on YouTube, where I showcased how Vigama could plan a day and handle interruptions in real time. Being my first serious AI product, Vigama taught me how to balance ambitious automation with user trust. It was a springboard for everything I built afterward.
