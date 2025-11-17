---
title: "Vify.ai"
role: "AI Pipeline Engineer"
tech:
  - "Python"
  - "LangChain"
  - "OpenAI API"
  - "Multi-Agent Systems"
  - "Classification Models"
summary: "Multi-agent scam detection and remediation tool that uses LLM pipelines to classify fraudulent content and guide users through next steps."
description: "Built an end-to-end scam detection system that analyzes messages, emails, and websites for fraud indicators, then provides actionable remediation steps—developed in a weekend at Berkeley's AI Hackathon."
startDate: 2024-07-12
endDate: 2024-07-14
status: "Completed"
category: "Security & Safety"
featured: false
gallery:
  - src: "/assets/projects/vify.png"
    alt: "Vify.ai scam detection interface"
links:
  - label: "Devpost"
    url: "https://devpost.com/software/vify-ai"
---

Vify.ai is an AI-powered scam detector built in 48 hours at Berkeley's AI Hackathon. It tackles a real-world problem: **how do you help people who don't know how to spot scams?**

## The Problem

Cyberfraud and scam messages are everywhere—phishing emails, fake investment schemes, romance scams, tech support fraud. Most people don't know what to look for, and by the time they realize something's wrong, it's too late.

Security tools exist, but they either:
- Catch obvious spam but miss sophisticated scams
- Require technical knowledge to use
- Don't tell you *what to do next* if you've been scammed

## How Vify Works

**Multi-Step Detection Pipeline**
1. **Content Analysis**: User submits suspicious message, email, or website
2. **Classification**: LLM-based classifier identifies scam indicators (urgency language, credential requests, suspicious links, impersonation patterns)
3. **Risk Scoring**: Assigns a fraud probability score based on multiple signals
4. **Explanation**: Shows *why* it's likely a scam in plain language

**Actionable Remediation**
Unlike tools that just say "this is suspicious," Vify tells you **what to do next**:
- If you gave away credentials: "Change passwords immediately on these sites..."
- If you sent money: "Contact your bank and file a fraud report..."
- If you clicked a link: "Run a malware scan and check for these signs..."
- If it's unclear: "Forward this to these official reporting channels..."

**Multi-Agent Architecture**
Built using a multi-agent system where different agents specialize in:
- Text analysis (language patterns, urgency signals)
- Link analysis (domain reputation, redirect chains)
- Context reasoning (does this claim make sense?)
- Action planning (what steps to take based on exposure level)

## Technical Stack

**LangChain**: Multi-agent orchestration and prompt chaining
**OpenAI API**: Classification and reasoning
**Link Analysis**: Domain reputation checks and URL pattern matching
**Classification Models**: Custom-tuned detectors for common scam categories

## What I Learned

Building Vify taught me how to design **robust safety logic under time pressure**. Scam detection isn't just "run it through a model"—you need:
- Multi-signal validation (one indicator isn't enough)
- Explainability (users need to understand *why* something's flagged)
- Action-oriented output (detection without guidance doesn't help)
- Edge case handling (false positives erode trust fast)

## Results

Built in 48 hours at Berkeley's AI Hackathon. **Top 15 finish** out of 100+ teams.

Vify demonstrated that agentic workflows can tackle cybersecurity problems in a way that's accessible to non-technical users—turning "is this a scam?" into "here's what you should do."

## Why This Matters

Scam detection isn't sexy AI work, but it's a **real-world problem with real stakes**. People lose money, credentials, and trust because they can't tell what's legitimate.

Vify showed that multi-agent systems can bridge the gap between "technically correct detection" and "actually helpful guidance"—which is the hard part of applied AI.
