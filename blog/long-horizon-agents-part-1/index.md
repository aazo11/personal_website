---
title: "Long Horizon Agents: From order takers to outcome owners"
date: "2026-07-15"
featuredImage: "/blog/long-horizon-agents-part-1/work-working.gif"
---

![Kramer at work](work-working.gif)

A task has a clear input and output. A tool can help complete it. But intelligent humans are not hired simply to complete a collection of tasks. They are given an area of responsibility and expected to deliver against goals or outcomes.

Take a software engineer. Refactoring a module or fixing compile-time errors are tasks. Making sure the backend scales with seasonal traffic patterns while minimizing cloud spend is an outcome. The engineer needs to understand the architecture, decide what needs to change (if anything), weigh tradeoffs, sequence the work, then monitor outcomes and adjust the plan when they find something unexpected. To understand seasonality, they might study historical trends or ask others in the organization. As new patterns emerge, they update their understanding and remember it to avoid future pain.

Consider a sales rep. Writing a follow-up email after a sales call and logging it in the CRM are tasks. Generating $500K in qualified pipeline is an outcome. The rep needs to understand customers’ needs and product value, identify and target accounts, personalize outreach, handle objections and find patterns that lead to faster closes. If the pipeline runs dry, they need to diagnose issues and determine whether it’s their own missteps or an issue with another team’s outputs, such as product or engineering.

Current agents are very good at completing tasks, especially when the output can be verified immediately. But they are surprisingly bad at making informed decisions over long time horizons.

Before our systems can go from completing tasks to owning outcomes, they need infrastructure that can give them five things: shared memory, goal orchestration, durable execution, the ability to learn from experience and a toolchain ecosystem.

Whether these five functions need to be native to the model or built into the harness, and to what extent, is still an open question. However, it is now clear that the problem cannot be solved by increasing context length.

## Longer context is not enough

Most agents implement some variation of [ReAct](https://arxiv.org/abs/2210.03629): the model reasons about what to do, takes an action, observes how the world responds and reasons again. For a while, practitioners believed the path toward long-horizon agents looked straightforward:

```
model + tools + loop + infinite context = autonomous agent
```

The corollary was that if the context window became large enough, the agent could keep every prior thought, action and result in view, loop forever and learn in context.

This approach does not work. Recent work found a [roughly 30% accuracy drop](https://arxiv.org/abs/2410.10813) when long-context models had to remember information across sustained interactions. Over longer horizons, agents also suffer from what researchers call ["behavioral state decay"](https://arxiv.org/abs/2607.08716): requirements, prior attempts, diagnoses and open sub-goals can remain somewhere in the trajectory yet stop influencing the agent's decisions.

Long context gives an agent a larger transcript. It does not decide what remains important, which beliefs should be revised or whether the current plan still serves the original goal.

Without the missing systems, letting an agent loop longer does not make it a long-horizon agent. It burns through tokens and produces expensive slop: repeated work and compounding errors without reliable progress toward the goal.

## The five missing systems

Our existing agents in a loop do not have long term agency because they’re missing the critical systems that provide continuity of intelligent behavior across changing evidence, context boundaries, process failures and learning cycles.

We believe we need robust systems in the following categories before agents can own outcomes across long horizons:

- **Shared memory.** Most agent memory is scoped to a single session. Long-horizon agents need useful knowledge to survive beyond that session, evolve as facts change and become available to other agents in the organization.
- **Goal orchestration.** Distant outcomes do not provide enough feedback to guide each decision. Agents need to break them into intermediate goals that make progress measurable without losing the relationship between a local reward and the original objective.
- **Durable execution.** Long-running work has to survive crashes, expired credentials, delayed approvals and irreversible interactions with the outside world. The execution layer must preserve state and know whether a failed operation should be retried, reversed, escalated or stopped.
- **Learning.** A transcript records what happened; learning changes what happens next. Agents need a way to turn outcomes into better playbooks, instructions, memory and, potentially, model behavior without allowing every noisy experience to rewrite the system.
- **Toolchain ecosystem.** Models and harnesses can reason and coordinate, but useful agents also need tools that let them act on the outside world. Those tools must support long-running, asynchronous workflows and return signals agents can use to evaluate results and decide what to do next. The ecosystem will need capabilities such as communication within and across organizations, web search, and authentication and authorization.

The boundaries between these categories are blurry. Memory, for example, may eventually absorb some of what we now call learning. Some capabilities may become native to models. Others will remain properties of the harness, runtime or organization around the model. The primitives powering these systems are still being designed and implemented.

If you’re interested in exploring these further or you’re already building in one or more of these categories, join us on Sept 24 in SF alongside Glean, Hex, and Baseten at [DevGuild: Long-Horizon Stack](https://www.heavybit.com/devguild/long-horizon-stack). In future posts, I will dive deeper into each of these systems, existing approaches and how they can help agents graduate from task completion into outcome ownership.
