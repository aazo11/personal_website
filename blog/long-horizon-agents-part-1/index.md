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

## Memory must be organizational

Most agent memory is really session continuity.

It remembers what happened earlier in a conversation, retrieves a similar passage from an old transcript or writes a summary before the context window resets. This helps an agent resume work, but it is a thin version of what memory does inside an organization.

An experienced engineer does not merely remember yesterday's terminal output. They remember why the billing system has a strange retry rule, which migration failed last year, which shortcuts are tolerated and who needs to approve an API change.

An experienced sales rep remembers that healthcare buyers stall at security review, that a certain case study works with CFOs and that the company lost its last three deals because of the same missing integration.

This knowledge is episodic, factual, procedural and political. Some of it belongs to the individual. Most of it becomes valuable when it is available to the organization.

Agent memory therefore cannot be scoped to a model session. If one agent discovers something useful on Monday, it should not need to rediscover it on Friday. Another agent working for the same organization should be able to benefit from it, subject to the same permissions as a human colleague.

Storing everything is not the answer. Organizational memory needs provenance, time and revision. It should know where a belief came from, why a decision was made, whether the underlying conditions have changed and which newer evidence supersedes it.

Remembering an obsolete pricing policy is worse than forgetting it.

This also means retrieval cannot be reduced to semantic similarity. The most textually similar memory is not necessarily the one relevant to the current decision. Retrieval has to be conditioned on the goal, the state of the work and the organization's current beliefs.

The context window should be treated as a working set: a temporary view assembled for the decision in front of the model. Organizational memory is the durable, versioned system of record behind it.

Model improvements will make that working set easier to construct and use. But the memory itself probably remains outside the model. It needs to survive when the session ends, when the model changes and when the organization switches providers.

## Goals need orchestration

Organizational goals are usually distant, ambiguous and sparsely rewarded.

"Make the product scale" does not provide useful feedback after every code change. "Generate $500K in qualified pipeline" does not tell a sales rep whether the next account is worth pursuing.

An agent cannot wait until the end of a three-month goal to find out whether it made good decisions. It needs to break a distant goal into smaller intermediate goals with shorter feedback loops.

```
organizational goal
    -> intermediate goal
        -> short-term goal
            -> tasks
```

A good intermediate goal does two things. It makes progress measurable over a shorter period, and it produces evidence about whether the larger strategy is working.

Before re-architecting a product, an engineer might establish a performance baseline and identify the actual bottleneck. A successful benchmark is an intermediate reward. It does not prove the product will scale, but it reduces uncertainty about whether the next investment is justified.

Before scaling outbound sales, a rep might try to generate ten qualified conversations inside one customer segment. Replies, meetings and stage progression provide intermediate rewards. They reveal whether the targeting and message are working before the rep burns through the entire market.

The danger is that intermediate rewards become detached from the outcome they were meant to predict.

A sales agent rewarded for meetings will book bad meetings. An engineering agent rewarded for passing tests can make the test suite green while making the product worse. Once a proxy becomes a target, the agent can optimize the proxy instead of the goal.

Good orchestration therefore requires more than breaking work into smaller pieces. It has to preserve the causal relationship between local progress and the original outcome.

The plan itself must also remain provisional. Every intermediate result changes the agent's understanding of the problem. The system must be able to revise sub-goals, abandon a strategy and reallocate effort without losing the original objective.

Plans are hypotheses about how a goal can be reached, not scripts to be executed blindly.

Today this probably means separating planning, execution and evaluation inside the harness. They may all use the same underlying model, but they should not necessarily share the same context or incentives. The system performing the work should not be the sole judge of whether the work is good.

## Durable execution in an entropic world

Intelligence deployed into the world inherits the world's failure modes.

Machines crash. Networks partition. APIs return errors. Credentials expire. Deploys restart containers. Humans take the weekend to approve something. The environment can change while the agent is waiting.

The world is full of entropy.

A long-horizon agent is therefore a distributed system with a stochastic decision-maker inside it. That is a much harder object to operate than a chatbot.

If the process disappears six hours into a migration, the work cannot disappear with it. The system needs to know which steps completed, which side effects occurred, which assumptions were valid and where execution should resume.

A simple retry is not enough. LLM calls are non-deterministic, so replaying the same prompt may produce a different decision. Tool calls can have irreversible effects. Reading a file twice is harmless. Sending an email, issuing a refund or deleting a database row twice is not.

The execution layer needs durable checkpoints, classified retries, budgets, pause-and-resume and a ledger of external side effects. When an operation partially fails, it needs to know whether to retry, compensate, escalate or stop.

Human input is also part of execution state. An agent should be able to pause for three days while waiting for approval and resume from the same logical point without keeping a process alive or reconstructing the decision from a transcript.

This requirement is definitively outside the model.

A model can reason brilliantly about what to do next. It cannot preserve a process after the machine running it has disappeared. A system that cannot survive a restart cannot own an outcome for longer than the lifetime of its process.

## Remembering is not learning

Memory records what happened. Learning changes what happens next.

An agent that remembers making the same mistake last week and then repeats it has memory, but it has not learned.

Long-running agents will generate enormous amounts of experience: plans, tool calls, failures, corrections, human interventions and outcomes. The hard problem is converting those trajectories into better future behavior.

This is a credit-assignment problem. A successful outcome does not mean every decision along the way was good. A failed outcome does not tell you which decision caused the failure. Before the system can improve, it has to diagnose what should be reinforced and what should change.

Some learning can happen in the harness. Experience can update playbooks, system prompts, tool descriptions, routing rules, evaluators and organizational memory. Work such as [Combee](https://arxiv.org/abs/2604.04247) explores how agents can consolidate lessons from many prior trajectories into reusable prompt-level knowledge without changing the underlying model.

Harness-level learning has practical advantages. It can be organization-specific, immediate, inspectable and reversible. If a new sales playbook makes performance worse, the company can compare versions and roll it back.

Some learning may happen inside the model. Today, most deployed models remain static after training. They adapt inside a context window, but their weights do not improve after completing a task. Research such as [self-distillation fine-tuning](https://arxiv.org/abs/2601.19897) suggests that models may eventually accumulate skills over time without catastrophically forgetting what they already know.

The likely architecture is a two-speed learning system.

The harness learns quickly from local experience. The model consolidates more general skills slowly across many experiences.

Both loops need evaluation and governance. Allowing an agent to rewrite its own instructions after every outcome would create adaptation, but not necessarily improvement. The system needs evidence that a change generalizes, versioning so the change can be inspected and rollback when the agent learns the wrong lesson.

```
experience
    -> outcome
        -> diagnosis
            -> update
                -> evaluation
                    -> future behavior
```

A self-modifying system without an evaluation loop does not compound intelligence. It compounds drift.

## Parting thoughts

Long-horizon agency is not a model running in a loop for a long time. It is the continuity of intelligent behavior across context boundaries, changing evidence, process failures and learning cycles. To move beyond prompt-response we need systems that store and recall organizational memory, orchestrate so distant goals become measurable progress, have durable execution so entropy does not erase the work and can learning so experience changes future behavior.

Some of these functions will migrate into the model. Others are structurally properties of the organization and runtime around it.

In [Part 2](/blog/long-horizon-agents-part-2), I will look at the runtime and where the opportunities are for builders.
