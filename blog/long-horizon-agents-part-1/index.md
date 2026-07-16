---
title: "long horizon agents, part 1: the end of prompt-and-response"
date: "2026-07-15"
---

## The Prompt Is a Crutch

Every mainstream AI product today works the same way. You type something. The model responds. You type again. This is the interaction model that took us from GPT-3 demos to a [$300B industry](https://www.bloomberg.com/news/articles/2026-06-15/generative-ai-market-size-forecast), and it is already becoming the bottleneck.

The work that matters — debugging a production outage, migrating a codebase, onboarding a new data pipeline — is not a single prompt. It is hours of branching decisions, tool calls, intermediate verification, and context that compounds over time. Asking a human to sit there and co-pilot every step defeats the point.

The next phase is background agents. Agents that you delegate to, that run for hours or days, that call tools and make decisions autonomously, and that come back with results or pause to ask you a question when they're stuck. Less chatbot, more junior employee you onboard and turn loose on a project.

This is not a prediction. It is already happening. Anthropic's Claude Code runs headless in CI. OpenAI's Codex operates as a background worker that takes a ticket and returns a PR. Cursor shipped [background agents](https://www.cursor.com/blog/background-agents) that spin up cloud VMs and work while you do other things. The interaction model is shifting from synchronous conversation to asynchronous delegation.

The question is no longer whether agents will become long-horizon and autonomous. It is what breaks when they do.

## The Memory Wall

The most immediate failure mode has a name: the [memory wall](https://www.mindstudio.ai/blog/ai-agent-memory-wall-long-running-jobs).

Every LLM has a context window. Today's frontier models offer 128K–200K tokens, which sounds like a lot until your agent is 90 minutes into a task, has called 40 tools, and accumulated a transcript full of API responses, error traces, and intermediate reasoning. The context window is not a hard drive. It is working memory, and it degrades before it overflows.

The memory wall operates on three levels:

**Hard overflow.** The agent literally runs out of tokens. The transcript is too long. The run crashes or the model starts dropping information. This is the most obvious failure and the easiest to detect.

**Soft degradation.** The model still has room, but critical instructions from the original prompt are now buried under pages of tool output. This is the "[lost in the middle](https://arxiv.org/abs/2307.03172)" problem applied to agents. The agent forgets constraints, ignores earlier decisions, and starts drifting. You asked it to refactor without changing the public API. Fifty tool calls later, it changes the public API.

**Temporal drift.** Over time, the agent's understanding of its own goal shifts. Each new piece of context slightly reweights what it thinks it is doing. This is subtle and hard to catch because the agent's outputs remain locally coherent — each individual step looks reasonable, but the trajectory has wandered.

Bigger context windows help with hard overflow. They do nothing for soft degradation or temporal drift. These are architectural problems, not parameter problems.

## Tasks vs. Jobs

There is a useful distinction between tasks and jobs. A task is bounded: clear input, predictable scope, a few steps. Summarize this document. Write a unit test for this function. Fix this type error. Current agents are excellent at tasks.

A job is different. Audit the entire codebase for security vulnerabilities. Process a month of customer support tickets and surface patterns. Migrate from REST to GraphQL. Jobs involve hundreds of steps, conditional branching, accumulated state, and they span hours or days.

Agents that ace benchmarks on tasks routinely fail at jobs. The failure modes compound: context overflow mid-run, instruction dilution as the transcript grows, errors that accumulate across intermediate steps, state loss on interruption, and what one team calls "[evaluation blindness](https://www.mindstudio.ai/blog/ai-agent-memory-wall-long-running-jobs)" — plausible-sounding outputs that are subtly wrong, produced by an agent that long ago lost the thread.

A [recent taxonomy of agentic AI faults](https://arxiv.org/html/2603.06847v1) cataloged 37 distinct failure categories across five architectural dimensions: cognition and orchestration, tool integration, context and memory, runtime environments, and system reliability. 83.8% of practitioners surveyed said the taxonomy matched failures they encounter in production. This is not a theoretical exercise. These failures are happening now, in real deployments, at scale.

## The Compounding Error Problem

Anthropic's [guide to building agents](https://www.anthropic.com/research/building-effective-agents) includes a line that should be bolded and underlined: "The autonomous nature of agents means higher costs, and the potential for compounding errors."

In a prompt-response loop, the human catches errors after every turn. The feedback cycle is tight. In a background agent, there is no feedback cycle. The agent makes a wrong decision on step 12, and every subsequent step builds on that wrong decision. By step 50, the error is load-bearing. You cannot undo it without restarting the entire run.

This is the trust problem. How do you verify the output of an agent that ran for six hours unsupervised? You cannot review a 200-step trace the way you review a pull request. And if you have to manually verify every step, you have not saved any time — you have just moved the work from "doing" to "reviewing," which is often harder.

METR's research shows AI agent task duration [doubling roughly every seven months](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/). In early 2025, frontier agents could handle one-hour tasks with reasonable reliability. By late 2026, we are looking at eight-hour workstreams. But reliability is not scaling at the same rate. The gap between what agents can attempt and what they can complete reliably is widening, not narrowing.

## The Infrastructure Gap

The current infrastructure stack was built for the prompt-response era. API calls are stateless. Inference servers optimize for request throughput, not session continuity. Orchestration frameworks assume a human is in the loop. Monitoring tools show you latency and error rates, not "the agent has been running for three hours and is now doing something completely unrelated to the original task."

A [survey of enterprise AI deployments](https://theconversation.com/ai-agents-arrived-in-2025-heres-what-happened-and-the-challenges-ahead-in-2026-272325) found that 70% of developers hit fundamental data infrastructure gaps only after launching agent initiatives. The model is no longer the bottleneck. Everything around the model is.

This gap — between what agents can theoretically do and what the infrastructure supports — is where the next wave of infrastructure companies will be built. Durable execution runtimes that survive crashes. Scheduling systems that manage GPU memory across multi-turn sessions. Sandboxed environments where agents can safely execute code. Observability tools that make 200-step traces legible. Human-agent interfaces that know when to pause and ask.

In [Part 2](/blog/long-horizon-agents-part-2), I will walk through this emerging infrastructure stack layer by layer — what exists, what is missing, and where the opportunities are for builders.
