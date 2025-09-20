---
title: "Vigama"
role: "Co-founder & Systems Engineer"
tech:
  - "TypeScript"
  - "Next.js"
  - "OpenAI API"
  - "Speech Recognition"
summary: "Voice-first productivity assistant that turns spoken intent into scheduled routines and automated follow-up tasks."
description: "Built an AI-driven productivity companion that captures language via text or speech, generates daily plans, and executes scripted actions on behalf of busy operators."
gallery:
  - src: "/assets/projects/vigama.gif"
    alt: "Vigama automation workflow preview"
links:
  - label: "Live Site"
    url: "https://vigama.tech"
---
Vigama helps solopreneurs and small teams offload the cognitive load of planning. Users describe what needs to get done, and the assistant assembles a prioritized calendar, drafts reminders, and queues automation hooks.

## Highlights
- Multimodal capture pipeline that supports live transcription, chat-style prompts, and quick command macros.
- Task engine breaks fuzzy goals into atomic steps, applying dependency ordering before synchronizing with personal calendars.
- Integrates with common SaaS APIs so confirmations (emails, Slack nudges, docs) go out automatically once tasks complete.

## Personal Contribution
I led the architecture for the orchestration layer, implemented the scheduling heuristics, and tuned the LLM prompt strategy that balances user intent with guardrails for irreversible actions.
