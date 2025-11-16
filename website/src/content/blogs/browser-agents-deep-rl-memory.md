---
title: "Improving Browser Autonomous Agents with Deep Reinforcement Learning and Memory"
publishDate: 2025-11-06
tags:
  - "ai"
  - "agents"
  - "reinforcement-learning"
  - "memory"
  - "web-automation"
excerpt: "Exploring how deep reinforcement learning and memory systems can make browser automation agents faster and more accurate, with insights on Composite and other web agent frameworks."
heroImage: "/assets/images/jack/main.jpg"
---

As we enter the age of web agents, we are bombarded with new software releases every few days like Comet, Composite, and Fellou. These apps promise to automate everyday tasks, with travel planning as the overused demo. In practice, current approaches are slow. Large language models often take five or more seconds to perform a single action such as a click or scroll.

In this article, I propose improvements in four areas. First, how large language models can achieve more accurate System 1 thinking using deep reinforcement learning. Second, how to mix classical deterministic search with probabilistic search framed as a Markov Decision Process. Third, how agents can learn over time by asking the right questions to better understand user intent. Finally, how to create dynamic templates for workflow automation over time.

I will focus on Composite because it is one of the leading browser AI agent workflow automation apps.

## How Web Agents Work Under the Hood

So the first thing I want to talk about is how these web agents work under the hood. The agent takes your prompt, creates a plan, takes a screenshot, analyzes elements, and decides the next step based on the picture. In many cases, there is a combination of screenshot analysis and parsing the DOM, including div elements and accessibility roles.

That is a good start. It can be faster. Use reinforcement learning on existing Composite sessions and the browser environment to train policies with rewards tied to goal state. RL can be narrow, so scope it to micro skills. Train deep RL or imitation policies for specific actions like scrolling, highlighting candidates, and finding the right button. Do not train arbitrary tasks. Train the fast primitives so the higher level plan executes quickly.

The design is unique and the opportunity is real.

## Mixing Deterministic and Probabilistic Search

The second thing I want to talk about is mixing classic deterministic search algorithms with probabilistic policies. A lot of web search is straightforward. If you need to find every location on a page or every Book button, run deterministic queries over the DOM or accessibility tree and rank the results. Use AI only when the page is ambiguous.

This matters for two reasons. It makes the agent and the user's life simpler. It cuts compute.

Then combine it with probabilistic search for novel states. When the site looks new or orientation changes, fall back to a learned policy that explores a bit, reduces uncertainty, and then returns to the deterministic path. The abstraction is simple. Decide what should be deterministic and what should not.

Right now, large language models are being used for everything because they are a good general tool. There is room to optimize the split.

## Learning Through Questions

The third thing I want to talk about is soft learning by asking short questions. Users have stable preferences in how they want things done, and they expect the computer to learn the context. Most web agent interfaces are still focused on one off tasks. Add a fast question when it saves future friction. Ask once, remember, and apply it next time.

I have seen Wispr Flow experiment with quick confirm prompts. Composite could do the same style of ask once and remember.

## Power Workflows

Finally, power workflows. If you want users to become power users, let them create reusable workflow templates for common tasks like travel planning or writing. Think of them as abstract classes for workflows, with slots and defaults. Over time, the system compiles these into policies so the agent spends less time planning and more time doing.

Those are the suggestions I recommend.

## Conclusion

Agents are the future of web automation, but they need to be faster, smarter, and more adaptive. By combining deep reinforcement learning for fast primitives, mixing deterministic and probabilistic search, learning user preferences through questions, and enabling power workflows, we can create browser agents that truly deliver on the promise of autonomous web navigation.

The technology is here. Now it's about building the right systems to make it work seamlessly.
