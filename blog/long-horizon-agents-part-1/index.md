---
title: "long horizon agents, part 1: the end of prompt-and-response"
date: "2026-07-15"
---

## How work gets done

Every organization has goals. In larger organizations, each team or function has its own sub-goals which roll up into broader organizational goals. Individual team members have goals which help their team hit its goals.

At the smallest level, individual team members break down their goals into weekly, daily and hourly tasks, then apply their intelligence, expertise and tools to completing them. At every level of the organization and at regular cadences, outcomes are compared against goals and course corrections are made.

Powered by language models and the harnesses around them, agents can now complete many of the same knowledge-work tasks as humans. But rarely can they replace an actual human in the workplace.

If you hired a junior employee, you might assign them a mentor who checked in daily and closely supervised their work.
If they still needed the same level of support three months later, you would probably fire them.

Most agentic AI applications today require this kind of constant supervision. Most still use the prompt-response format of chatbots. They are tools, closer to calculators that have some stochastic intelligence features added than entities that can independently deliver on organizational goals. The human still owns the goal, breaks it into tasks, gives the model context for each task, checks the output and decides what happens next.

Even when an agent uses tools and skills across multiple steps, the human still owns the outcome.

## From completing tasks to owning outcomes

A task has a clear input and output. A tool can help complete it. But intelligent humans are not hired simply to complete a collection of tasks. They are given an area of responsibility and expected to deliver an outcome.

A task ends when an output is produced. Ownership persists until an outcome is achieved.

Take a software engineer. Refactoring a module or fixing compile-time errors are tasks. Making sure a SaaS product can scale with seasonal traffic patterns while minimizing cloud spend is an outcome. The engineer needs to understand the existing architecture, decide what needs to change, weigh tradeoffs, sequence the work, then monitor outcomes and adjust the plan when they find something unexpected.

Or consider a sales rep. Writing a follow-up email and logging it in the CRM are tasks. Generating $500K in qualified pipeline from a new territory is an outcome. The rep needs to identify accounts, find the right people, personalize outreach, handle objections and learn which messages are working. If the pipeline is not growing, they need to diagnose whether the problem is their own targeting and messaging or an issue from another team, such as product or engineering.

Current agents are very good at completing tasks, especially when the output can be verified immediately. But they are surprisingly bad at making informed decisions over long time horizons. Before our systems can go from completing tasks to owning outcomes, they need infrastructure that can give them four things: organizational memory, hierarchical orchestration, durable execution and the ability to learn.

Whether, and how much of, the four functions described above need to be native to the model vs. built into the harness is still an open question. However, it is clear that the problem goes beyond limited context length.

## Longer context is not enough

Most agents implement some variation of [ReAct](https://arxiv.org/abs/2210.03629): the model reasons about what to do, takes an action, observes how the world responds and reasons again. For a while, practitioners believed the path toward long-horizon agents looked straightforward:

```
model + tools + loop + infinite context = autonomous agent
```

If context windows became large enough, the agent could keep every prior thought, action and observation in view. The loop could run forever and the agent would learn in context. But an infinite context window is a perfect transcript that tells the model everything that happened. It does not tell the model what remains important, which beliefs should be revised, whether the current plan still serves the original goal or what knowledge should survive after the assignment ends.

Anthropic ran into this while building [long-running coding agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents). Compaction allowed an agent to continue across context windows, but it was not enough to reliably build a large application. The harness still needed to decompose the work, create structured handoffs and preserve state outside the conversation. In later experiments, Anthropic sometimes found that clearing the context completely worked better than carrying a compressed version forward.

## What long-horizon agents need

Long-horizon agency is not a model running in a loop for a long time. It is the continuity of intelligent behavior across changing evidence, context boundaries, process failures and learning cycles.

That continuity requires four systems:

- **Organizational memory** so useful knowledge survives beyond a session and becomes available to other agents.
- **Goal orchestration** so distant outcomes can be decomposed into intermediate goals with shorter feedback loops.
- **Durable execution** so work survives crashes, delays and irreversible interactions with the outside world.
- **Learning** so experience changes future behavior instead of merely accumulating in a transcript.

The boundaries between these systems will move. Some capabilities may become native to models. Others are properties of the harness, runtime or organization around the model. The jury is still out on exactly where each piece belongs.

But the requirements themselves are becoming clear. A longer context window can preserve more of what happened. It cannot, by itself, decide what the organization should remember, whether the plan still serves the goal, how work should resume after a failure or what should change after an outcome.

In [Part 2](/blog/long-horizon-agents-part-2), I will examine each of these systems and how they turn task completion into outcome ownership.
