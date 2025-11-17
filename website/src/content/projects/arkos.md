---
title: 'ARKOS (MIT SIPB)'
role: 'Backend Engineer – Agent & Memory Systems'
tech:
  - 'Python'
  - 'LangGraph'
  - 'SGLang'
  - 'Qwen 2.5'
  - 'MCP'
  - 'Pydantic'
  - 'OpenAI API'
summary: 'Open-source, decentralized AI assistant platform from MIT SIPB that treats tools, memory, and agent behavior as first-class modules — contributing to backend architecture and memory systems.'
description: 'Backend contributor to ARK, a modular agentic assistant platform built by MIT SIPB. Working on agent orchestration, memory modules, and state graph architecture that makes AI assistants extensible and privacy-first.'
startDate: 2024-09-01
status: 'Ongoing'
category: 'Research'
featured: true
gallery:
  - src: '/assets/projects/arkos.png'
    alt: 'ARKOS architecture diagram'
links:
  - label: 'GitHub'
    url: 'https://github.com/SGIARK/arkos'
  - label: 'MIT SIPB Project'
    url: 'https://sipb.mit.edu'
---

ARK (Automated Resource Knowledgebase) is an MIT SIPB project that tries to turn the "assistant" idea into a real, modular computing platform instead of just a chat box.

## The Vision

Most AI assistants are black boxes: you can't inspect how they work, you can't add your own tools, and you certainly don't own your data. ARK is the opposite—a privacy-first, community-owned alternative where every component (models, tools, memory, agents) is modular and extensible.

The goal: build an assistant platform that students, researchers, and developers can actually extend, audit, and run on their own infrastructure.

## How ARK Works

**Modular Architecture**

ARK is structured as a set of Python modules that can be composed and extended:

- **`base_module`** – Core interfaces and abstractions.
- **`model_module`** – LLM abstraction layer (OpenAI API, local models, etc.).
- **`agent_module`** – Agent structure and behavior definitions.
- **`state_module`** – State graph management for complex workflows.
- **`tool_module`** – MCP-compatible tool integration.
- **`memory_module`** – Long-term context and memory management.

This means you can swap out the LLM backend, add custom tools, or redesign the memory system without touching other components.

**MCP Compatibility**

ARK implements the Model Context Protocol (MCP), which means:

- Tools are defined once and work across different agents.
- Memory stores are portable across deployments.
- Agent behaviors can be shared and version-controlled.

**Inference Engine**

Currently running on SGLang with Qwen 2.5 as the base model. SGLang provides structured generation and state management that's more efficient than naive API calls.

**State Graphs**

Complex multi-step workflows are defined as state graphs where each node represents an agent action (tool call, reasoning step, memory retrieval) and edges define transitions based on results. This makes it easy to build workflows like:

1. User asks a question.
2. Agent retrieves relevant context from memory.
3. Agent decides if it needs to call external tools.
4. Agent synthesizes a response and updates memory.

## My Contribution

I work on the backend architecture, specifically:

**Agent Module** – Designed parts of the agent structure that orchestrate LLM calls, state transitions, and tool invocations.

**Memory Module** – Building the long-term memory and context management layer that lets agents maintain coherent conversations and remember past interactions.

**State Management** – Implementing state graph patterns that allow complex multi-step workflows while maintaining clear control flow.

**Schema Design** – Using Pydantic to enforce strict schemas across modules so components interoperate reliably.

## Technical Stack

- Python-only backend with well-separated modules.
- Configuration system for specifying agents, tools, and workflows.
- LLM inference via OpenAI-compatible APIs and SGLang for structured generation.
- Agent state graphs for managing complex workflows.
- Memory systems for long-term context (personal, project, task layers).
- MCP compatibility for tool integration.
- Strict schemas via Pydantic for type safety and clarity.

## Why This Matters

ARK is one of the few serious efforts to build a privacy-first, community-extensible alternative to closed assistants like ChatGPT or Claude. For students and researchers at MIT, it's a testbed for new patterns in agentic AI. For the broader community, it's a model for how assistants could work if they were designed as platforms rather than products.

The modular architecture means we can experiment with:

- New memory systems without rewriting the agent layer.
- Different LLM backends without breaking tools.
- Custom tools without forking the entire codebase.

## Current Status

Actively developed by MIT SIPB students. The core architecture (models, agents, tools, memory, state) is functional and being used for research and student projects. We're currently:

- Expanding the tool library with more MCP-compatible integrations.
- Improving memory retrieval strategies for long conversations.
- Optimizing state graph execution for lower latency.
- Documenting the architecture so other universities can deploy their own instances.

## Team

ARK is a collaborative MIT SIPB project. I contribute on the backend side alongside other MIT students working on frontend, infrastructure, and research.

**Listed Contributors (GitHub)** – Backend: Jack Luo (Georgia Tech) and MIT SIPB members; Frontend & Tools: MIT student developers; Research direction: MIT SIPB leadership.
