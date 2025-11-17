---
title: "CollectWise"
role: "AI Systems Engineer"
tech:
  - "Python"
  - "LangGraph"
  - "BAML"
  - "OpenAI API"
  - "Multi-Agent Systems"
summary: "AI-powered debt negotiation and resolution agent that helps users communicate with collectors, prioritize debts, and negotiate settlements."
description: "Built an LLM-based negotiation agent that drafts communication with debt collectors, reasons about payment plans, and guides users through debt resolution—tackling financial distress with AI."
startDate: 2024-06-15
endDate: 2024-07-20
status: "Completed"
category: "AI & Agents"
featured: false
gallery:
  - src: "/assets/projects/collectwise.png"
    alt: "CollectWise negotiation interface"
links:
  - label: "Devpost"
    url: "https://devpost.com/software/collectwise"
---

CollectWise is an AI agent that helps people navigate debt collection and negotiation when they're overwhelmed and don't know where to start.

## The Problem

**Debt collection is terrifying and confusing:**
- People don't know what they legally have to pay vs. what collectors *claim* they owe
- They don't know how to prioritize multiple debts (credit cards, medical bills, loans)
- They're scared to negotiate because they don't know what's reasonable
- Letters from collectors use intimidating language designed to pressure fast payment

**The result**: people either ignore the problem (making it worse) or pay more than necessary because they don't know their options.

## How CollectWise Works

**Debt Analysis**
User inputs their debts (amounts, sources, interest rates, current status). CollectWise analyzes:
- Which debts have legal priority (secured vs. unsecured)
- Which debts are actively damaging credit scores
- Which debts are past statute of limitations
- Which creditors are most likely to negotiate

**Negotiation Assistance**
CollectWise drafts letters and scripts for:
- Requesting debt validation (forcing collectors to prove you owe it)
- Proposing settlement offers (lump sum vs. payment plan)
- Negotiating interest rate reductions
- Requesting "pay for delete" agreements (removing negative marks from credit)

**Reasoning About Payment Plans**
Instead of just generating text, CollectWise uses multi-agent reasoning to:
- Model your financial situation (income, expenses, available cash)
- Determine realistic payment amounts you can offer
- Suggest which debts to tackle first based on impact vs. difficulty
- Warn when a proposed settlement is unrealistic or predatory

**Plain Language Guidance**
CollectWise translates complex financial and legal concepts into clear action steps:
> "This medical bill is past the 3-year statute of limitations in your state. You can send this validation letter, and if they can't prove the debt, you're legally not required to pay."

## Technical Architecture

**Multi-Agent System**: Built using LangGraph and BAML for orchestrating multiple reasoning agents:
- **Debt Analyzer**: Evaluates financial situation and debt priority
- **Negotiation Strategist**: Determines realistic offers and tactics
- **Letter Drafter**: Generates legally sound communication
- **Action Planner**: Sequences steps based on urgency and impact

**Structured Output**: Uses BAML (Boundary Markup Language) to ensure LLM outputs are structured and parseable, not just free-form text.

**Financial Reasoning**: Custom prompts that guide the LLM to reason about payment plans, interest calculations, and settlement math—not just regurgitate advice.

## Why This Matters

Debt collection is a **real-world edge case** where people are vulnerable and don't have access to financial advisors.

CollectWise is the complement to Vify.ai: one protects you from scams, the other helps you navigate legitimate (but overwhelming) financial obligations.

Together, they show that **AI agents can tackle problems at the margins of society**—the stuff that isn't glamorous but has real impact on people's lives.

## Current Status

Built as a hackathon project and technical demonstration. The core negotiation logic and letter drafting system work. Not deployed as a public product due to regulatory complexity around financial advice, but the architecture and approach are sound.

## What I Learned

Building CollectWise taught me how to design AI systems that handle **high-stakes, legally sensitive decisions**:
- You can't just trust LLM output—you need structured validation
- Multi-agent reasoning helps catch dangerous advice before it reaches users
- Domain-specific prompting (financial rules, legal constraints) is critical
- Users need explanations, not just instructions

This is where "prompt engineering" becomes "building reliable systems under constraints."
