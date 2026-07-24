---
title: "long horizon agents, part 2: the systems around the model"
date: "2026-07-15"
---

In [Part 1](/blog/long-horizon-agents-part-1), I argued that long-horizon agency is not a model running in a loop for a long time. It is the continuity of intelligent behavior across changing evidence, context boundaries, process failures and learning cycles.

Long context helps with continuity, but it does not create it. A transcript can tell the model what happened. It cannot decide what should become organizational knowledge, whether an intermediate goal remains useful, how execution should recover after a failure or what behavior should change after an outcome.

For agents to move from completing tasks to owning outcomes, they need four systems around the model: organizational memory, goal orchestration, durable execution and learning.

The architectural boundaries are still unsettled. Model improvements may absorb pieces of each system. Other pieces are structurally properties of the harness, runtime or organization. It is more useful, for now, to define the functions that a long-horizon agent needs than to prematurely decide where every function belongs.

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

## These systems form a loop

Memory gives the agent access to what the organization has learned. Orchestration converts a distant outcome into decisions that can be evaluated before the end of the project. Durable execution preserves those decisions and their effects as the world changes. Learning turns the resulting experience into better behavior on the next attempt.

None of these systems is sufficient on its own.

Memory without learning becomes an archive. Orchestration without memory repeats old mistakes. Durable execution without good orchestration reliably executes the wrong plan. Learning without durable records has no trustworthy experience from which to learn.

Together, they create something a larger context window cannot: continuity not just of information, but of purpose, action and improvement.

The architectural boundaries will keep moving as models improve. The functional requirements will remain.
