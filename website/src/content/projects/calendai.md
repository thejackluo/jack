---
title: "Calend.ai"
role: "Founder & Full-Stack Engineer"
tech:
  - "TypeScript"
  - "Chrome Extensions"
  - "OpenAI API"
  - "Google Calendar API"
summary: "Chrome extension that automates calendar drafting using conversational prompts and personalized heuristics."
description: "Built an AI copilot for Google Calendar that turns free-form requests into scheduled events, learning from past edits to tailor follow-up suggestions."
startDate: 2022-03-01
endDate: 2023-06-30
status: "Archived"
category: "Archive"
featured: false
gallery:
  - src: "/assets/projects/calendai.png"
    alt: "Calend.ai extension auto-filling a calendar event"
links:
  - label: "Product Page"
    url: "https://bit.ly/calendai"
---
Calend.ai began as a lightweight experiment to eliminate the friction of context switching into calendar UI. The extension listens for quick prompts ("hold office hours next Friday"), expands them with learned preferences, and syncs directly into Google Calendar.

## Highlights
- Adaptive prompt templates that adjust tone, location, and reminders based on prior edits.
- Uses semantic embeddings to match recurring meeting intents with the right attendees and conferencing links.
- Ships with a safety layer that surfaces diffs before submission so users stay in control of changes.

## Personal Contribution
I owned the product direction, system design, and end-to-end implementation—from Chrome extension scaffolding and Google OAuth flows to the LLM prompt strategy that personalizes event drafts over time.
