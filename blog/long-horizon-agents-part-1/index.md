---
title: "long horizon agents, part 1: the end of prompt-and-response"
date: "2026-07-15"
featuredImage: "/blog/long-horizon-agents-part-1/work-working.gif"
---

![Kramer at work](work-working.gif)

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

Take a software engineer. Refactoring a module or fixing compile-time errors are tasks. Making sure the backend can scale with seasonal traffic patterns while minimizing cloud spend is an outcome. The engineer needs to understand the architecture, decide what needs to change (if anything), weigh tradeoffs, sequence the work, then monitor outcomes and adjust the plan when they find something unexpected. To understand seasonality, they might study historical trends or ask others in the organization. As new patterns emerge, they update their understanding.

Or consider a sales rep. Writing a follow-up email after a sales call and logging it in the CRM are tasks. Generating $500K in qualified pipeline from a new territory for a new product is an outcome. The rep needs to understand the customer pain and product value, identify accounts, find the right people, personalize outreach, handle objections and learn which messages are working. If the pipeline is not growing, they need to diagnose whether the problem is their own targeting and messaging or an issue from another team, such as product or engineering.

Current agents are very good at completing tasks, especially when the output can be verified immediately. But they are surprisingly bad at making informed decisions over long time horizons. Before our systems can go from completing tasks to owning outcomes, they need infrastructure that can give them four things: organizational memory, orchestration of goals, a durable execution layer and the ability to learn from experience.

Whether these four functions need to be native to the model or built into the harness, and to what extent, is still an open question. However, it is now clear that the problem cannot be solved by increasing context length.

## Longer context is not enough

Most agents implement some variation of [ReAct](https://arxiv.org/abs/2210.03629): the model reasons about what to do, takes an action, observes how the world responds and reasons again. For a while, practitioners believed the path toward long-horizon agents looked straightforward:

```
model + tools + loop + infinite context = autonomous agent
```

The corollary was that if the context window became large enough, the agent could keep every prior thought, action and result in view, loop forever and learn in context.

This approach does not work. Recent work found a [roughly 30% accuracy drop](https://arxiv.org/abs/2410.10813) when long-context models had to remember information across sustained interactions. Over longer horizons, agents also suffer from what researchers call ["behavioral state decay"](https://arxiv.org/abs/2607.08716): requirements, prior attempts, diagnoses and open sub-goals can remain somewhere in the trajectory yet stop influencing the agent's decisions.

Long context gives an agent a larger transcript. It does not decide what remains important, which beliefs should be revised or whether the current plan still serves the original goal.

## The four missing systems

In short, long-horizon agency cannot be built simply with a model running in a loop for a long time. It needs systems that can provide continuity of intelligent behavior across changing evidence, context boundaries, process failures and learning cycles.

That continuity depends on four systems:

- **Organizational memory.** Most agent memory is scoped to a single session. Long-horizon agents need useful knowledge to survive beyond that session, evolve as facts change and become available to other agents in the organization.
- **Goal orchestration.** Distant outcomes do not provide enough feedback to guide each decision. Agents need to break them into intermediate goals that make progress measurable without losing the relationship between a local reward and the original objective.
- **Durable execution.** Long-running work has to survive crashes, expired credentials, delayed approvals and irreversible interactions with the outside world. The execution layer must preserve state and know whether a failed operation should be retried, reversed, escalated or stopped.
- **Learning.** A transcript records what happened; learning changes what happens next. Agents need a way to turn outcomes into better playbooks, instructions, memory and, potentially, model behavior without allowing every noisy experience to rewrite the system.

The boundaries between these systems will move. Memory, for example, may eventually absorb some of what we now call learning. Some capabilities may become native to models. Others will remain properties of the harness, runtime or organization around the model. The primitives powering these systems are still being designed and implemented.

In future posts, I will dive deeper into each of these systems, existing approaches and how they can help agents graduate from task completion into outcome ownership.
