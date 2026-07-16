---
title: "long horizon agents, part 2: the runtime"
date: "2026-07-15"
---

In [Part 1](/blog/long-horizon-agents-part-1), I argued that agents are shifting from prompt-response to long-horizon background execution, and that the current infrastructure cannot support this. The model is no longer the bottleneck. Everything around the model is.

This post is about what "everything around the model" actually means.

## The Harness and the Runtime

When people talk about building agents, they almost always mean the harness — the system prompt, the tool definitions, the orchestration logic, the planning strategy. This is the part that touches the model directly. It is where most of the effort goes today, and it is where most of the blog posts and frameworks are focused.

The runtime is everything underneath. It is the infrastructure that keeps the agent alive when the process crashes, that manages memory across a six-hour session, that knows when to pause for human input, that makes a 200-step trace legible after the fact. The runtime does not make the agent smarter. It makes the agent *possible* in production.

The analogy I keep reaching for: the harness is your application code. The runtime is the operating system. You can write brilliant application code, but if the OS cannot manage memory, recover from faults, or schedule processes, nothing works.

Every failure mode I described in Part 1 — the memory wall, compounding errors, context drift, the trust problem — is a runtime failure. The model did not fail. The infrastructure around the model failed. Which means the fix is not a better model. It is a better runtime.

Here is what that runtime needs.

## Durable Execution

The first thing that breaks when an agent runs for hours is the process itself. API timeouts kill connections. Machines crash. Deploys restart containers. A human approval step blocks execution indefinitely. Without durability, any of these events means the agent loses all intermediate progress and starts over — or worse, silently produces garbage from a corrupted state.

This is not a new problem. Workflow orchestration solved it for microservices a decade ago. The pattern is checkpoint-and-replay: persist the result of each step to durable storage, and if the process dies, replay the workflow from the last checkpoint, skipping completed steps and reusing their recorded outputs.

The key insight is that "just retry" does not work for agents. An LLM call costs real money ($0.10–$2.00 per call for frontier models), takes 10–60 seconds, and is non-deterministic. You cannot replay it and expect the same result. You have to checkpoint the *output* and skip the call on recovery. This is fundamentally different from retrying an idempotent HTTP request.

[Temporal](https://temporal.io/blog/durable-execution-meets-ai-why-temporal-is-the-perfect-foundation-for-ai), [Inngest](https://www.inngest.com/blog/durable-execution-key-to-harnessing-ai-agents), and [Restate](https://restate.dev) are all adapting their core primitives for this use case, each with a different model for how checkpointing works. The patterns are converging even if the implementations differ.

One open question: how granular should checkpoints be? Every tool call? Every LLM response? Every reasoning step? Too coarse and you lose progress. Too fine and the overhead of serializing and persisting state dominates your runtime. The right answer probably depends on the cost-per-step, but nobody has established clear best practices yet.

## Memory

In Part 1, I described the memory wall — hard overflow, soft degradation, temporal drift. These are three different problems, and they need different solutions.

**Short-term memory** is the agent's working context within a single run. This is where checkpointing matters most. Each completed step's output is persisted, so the agent can recover its thread-local state on failure. Think of it as the agent's RAM — volatile, scoped to the session, reconstructible from checkpoints.

**Long-term memory** is what persists across runs. An agent that debugged your payment system last week should remember the codebase layout, the deploy process, the gotchas it discovered. Without long-term memory, every run starts from zero. The agent is perpetually a first-day employee.

**Context management** is the active problem of deciding what stays in the window and what gets evicted. Bigger context windows help with hard overflow but do nothing for soft degradation — the "lost in the middle" problem where critical instructions get buried under pages of tool output. The runtime needs strategies for summarizing, compressing, and prioritizing what the model actually sees at each step.

This is also where compute scheduling intersects with memory. The [Continuum paper](https://arxiv.org/pdf/2511.02230) showed that selectively pinning KV cache based on reload cost — rather than evicting it between tool calls the way traditional inference servers do — improved agent job completion times by over 8x. That is an 8x improvement from *scheduling alone*, no model improvements required. A sign of how much performance is being left on the table by infrastructure designed for a different workload.

## Human-in-the-Loop

The most underappreciated runtime capability is knowing when to stop and ask a human.

An agent running for hours needs to know *when* to pause for input. Not at every step — that defeats the purpose of automation. Not never — that leads to the compounding errors I described in Part 1, where a wrong decision on step 12 becomes load-bearing by step 50. The agent needs judgment about its own uncertainty, and the runtime needs a mechanism for interrupting, inspecting, and redirecting a running agent without killing it.

The emerging pattern looks like pull requests for agent work. The agent does a chunk of autonomous work, produces an artifact, and opens something like a review — here is what I did, here is why, here are the parts I am uncertain about. The human approves, rejects, or redirects. Then the agent continues.

This is fundamentally a protocol problem, not a UI problem. The runtime needs primitives for interrupt-and-resume: pause execution, surface a decision to a human through whatever channel they prefer (Slack, email, a dashboard), wait indefinitely for a response, and continue from exactly where it left off. The interrupt cannot corrupt state. The resume cannot lose context.

Getting this right determines whether anyone actually trusts the output. The model doing the work is the easy part. The human-agent feedback loop is where trust is built or lost.

## Guardrails and Security

An agent with tool access is an agent with attack surface. The more autonomous and long-running the agent, the more damage a prompt injection or tool misuse can do.

The runtime needs policy enforcement that operates *outside* the model's reasoning. Token and cost budgets that hard-kill a run before it burns $500 on a loop. Scope boundaries that prevent an agent authorized to read a database from writing to it. PII redaction on inputs and outputs. Rate limiting on sensitive tool calls.

These cannot be suggestions in the system prompt. They must be infrastructure-level constraints — middleware that the agent cannot reason its way around. The [governance gap](https://theconversation.com/ai-agents-arrived-in-2025-heres-what-happened-and-the-challenges-ahead-in-2026-272325) is real: organizations are deploying agents faster than they can secure them. A runtime that enforces guardrails by default closes part of that gap.

The same logic extends to code execution. When an agent writes and runs code, that code was not written by a human, cannot be fully reviewed before execution, and may do destructive things. You need hardware-level sandboxing — isolated environments where the agent can operate without risk to the host. [E2B](https://e2b.dev) went from 40K sandbox sessions per month in March 2024 to roughly 15M by March 2025. Agents are writing and executing a lot of code, and they need a place to do it safely.

## Observability

Traditional application monitoring answers: is the service up? What is the p99 latency? What is the error rate? None of these questions are useful for a background agent that has been running for four hours.

The questions you actually need to answer:

- What is the agent *doing* right now?
- Has it drifted from the original objective?
- How much has it spent so far and what is the projected cost?
- At which step did it go wrong?
- Can I replay the run from step 47 with a different decision?

This requires structured traces, not log lines. Each LLM call, tool invocation, and decision point needs to be a node in a trace with inputs, outputs, latency, cost, and a human-readable explanation of what the agent was thinking.

But tracing alone is not enough. The harder problem is evaluation — and it connects directly back to the trust problem from Part 1. How do you grade a six-hour agent run? You cannot eyeball a 200-step trace. Some approaches: checkpoint evaluation that inserts validation gates at intermediate steps, output validation agents that use a second model to review the first, anomaly detection that flags runs where cost or step count deviates from baselines. Each has tradeoffs. None are fully solved.

The key insight, which [LangSmith](https://www.langchain.com/langsmith/observability) and [Braintrust](https://www.braintrust.dev/articles/agent-observability-complete-guide-2026) are converging on: tracing and evaluation are not separate products. You need to connect what happened in production to a quality judgment about whether it was correct. The trace is evidence. The eval is the verdict. They belong in the same system.

The most powerful capability this unlocks is time travel — replaying a run from any checkpoint with a modified state or decision. This converts debugging from "stare at logs" to "rewind and try a different path," and it is only possible if the runtime has been checkpointing all along. Durable execution enables observability enables debugging. The capabilities compound.

## The Capabilities Compound

That last point is worth dwelling on. These runtime capabilities are not independent layers you bolt on one at a time. They are deeply interconnected, and the value of each one increases when the others are present.

Durable execution gives you checkpoints. Checkpoints give you memory recovery *and* time-travel debugging *and* interrupt-resume for human-in-the-loop. Observability gives you traces. Traces give you evaluation data *and* anomaly detection *and* cost tracking that feeds into guardrails. Human-in-the-loop gives you trust. Trust gives you the willingness to let the agent run longer, which makes durability and memory management more critical.

This is why "just add checkpointing" or "just add tracing" feels insufficient when teams try it piecemeal. Each capability solves a narrow problem on its own. Together, they form a runtime that makes long-horizon agents actually viable.

## The Database Analogy

Here is the mental model I keep coming back to. In the early days of software, applications managed their own storage — flat files, custom binary formats, hand-rolled indexing. Then databases emerged and applications stopped managing storage. The application layer became thinner and more focused on business logic, while the data layer got its own specialized infrastructure with decades of engineering behind it.

Agents today are in the flat-file era. Every team building a long-running agent is hand-rolling its own state management, its own checkpointing, its own execution recovery, its own memory strategy. Most are doing it badly, because it is genuinely hard and it is not their core competency.

The infrastructure companies that win this market will be the ones that give agent builders the equivalent of `CREATE TABLE` — simple primitives that handle the hard problems of durability, memory, coordination, and recovery so that the application layer can focus on the harness: what the agent actually does and how it reasons.

The prompt-response era built a $300B industry on a simple runtime: stateless API calls with request-response semantics. The long-horizon era needs a fundamentally different runtime, and the teams building it right now are laying the foundation for everything that comes next.
