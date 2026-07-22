---
title: "long horizon agents, part 1: the end of prompt-and-response"
date: "2026-07-15"
---

## How work gets done

Every organization has goals. In larger organizations, each team or function has its own sub-goals which align with the broader organizational goals. Individual team members have goals which help their team hit its goals.

At the smallest level, individual team members break down their goals into weekly, daily and hourly tasks, then apply their intelligence, expertise and tools to completing them. At every level of the organization, outcomes are compared against goals and course corrections are made.

Powered by language models and the harnesses around them, agents can now complete many of the same knowledge work tasks as humans. But rarely can they replace an actual human in the workplace.

If you hired a junior employee, you might assign them a mentor who checked in daily and closely supervised their work.
If they still needed the same level of support three months later, you would probably fire them.

Most agentic AI applications today require constant human supervision. In fact, most still use the prompt-response format of chatbots. Prompt-response applications simply automate tasks: they are closer to stochastic calculators than entities that can independently deliver on organizational goals. The human still owns the goal, breaks it into tasks, gives the model context for each task, checks the output and decides what happens next. Even when a task is broken into subtasks that use tools and skills across multiple steps, the human still manages the process.

For agents to be more than tools, they need to be able to:

1. **Internalize goals** — plan across long time horizons, break goals into sub-goals and tasks, observe outcomes and course-correct.
2. **Continually learn** — learn from experience and escalate only when necessary.

## From completing tasks to owning outcomes

A task has a clear input and output. A tool can help complete it. But intelligent humans are not hired simply to complete a collection of tasks. They are given an area of responsibility and expected to deliver an outcome.

A task ends when an output is produced. Ownership persists until an outcome is achieved.

Take a software engineer. Refactoring a module or fixing compile-time errors are tasks. Making sure a SaaS product can scale with the business is an outcome. The engineer needs to understand the existing architecture, decide what needs to change, weigh tradeoffs, sequence the work and adjust the plan when they find something unexpected.

Now take a sales rep. Writing a follow-up email to a prospect is a task and logging it in the CRM is a task. Generating $500K in qualified pipeline from a new territory is an outcome. The rep needs to identify accounts, find the right people, personalize outreach, handle objections and learn which messages are working. If the pipeline is not growing, they need to diagnose why and change their approach or maybe even communicate internally that the issue is with marketing, engineering or product teams.

This learning is central to outcome ownership. Each result changes how the person understands the problem and what they do next. Over time, they build up context, develop judgment and require less instruction.

Current agents are very good at completing tasks, especially when the output can be verified immediately. They are much worse at internalizing a goal, judging whether they are making progress and learning from outcomes without a human managing the loop.

The difference is not just duration or the number of steps. It is who owns the outcome.

This is why coding has become the first real market for agents. Code gives the model tools, a structured environment and lots of ways to check its own work. It can edit a file, run the tests, inspect the error and try again. Even here, the dominant products are only beginning to move beyond the prompt-response loop. OpenAI describes Codex as a [command center for multiple agents](https://openai.com/index/introducing-the-codex-app/), while [Cursor's background agents](https://cursor.com/blog/background-agents) run in remote environments and return code for review.

The direction is clear. We are moving from sitting next to one agent and watching it work towards assigning work to many agents and checking in when they have something useful to show us.

## Long horizon does not mean a long context window

The most common approach to making agents work longer has been to give the model more context. When the context window fills up, summarize the conversation and keep going.

This helps, but it is not memory.

A context window is closer to an employee's desk than their brain. You can make the desk bigger, but eventually it fills with old documents, terminal output, half-finished plans and decisions whose reasoning has been forgotten. Important information does not need to fall out of the window to be lost. It can simply get buried.

The longer an agent runs, the more decisions it needs to remember: what it tried, why it failed, what constraints the user gave it and which parts of the goal are still unfinished. Compressing all of that into a summary loses information. Keeping everything makes it harder for the model to find what matters.

Humans deal with this through more than memory. We use project plans, documents, calendars, source control, ticketing systems and coworkers. Our work is stored in the environment around us. Long-horizon agents will need to do the same.

## Reliability gets harder with every step

Anthropic's guide to [building effective agents](https://www.anthropic.com/engineering/building-effective-agents) warns about the potential for compounding errors.

If a model has a 95% chance of making the right decision at each step, it only has a 60% chance of getting through ten independent decisions without a mistake. Real agent work is not independent, which makes this worse. A bad decision early on changes the environment for every decision that follows.

In a prompt-response workflow, the human catches these mistakes. In a long-horizon workflow, the agent can build on the mistake for hours. By the time the human sees the result, the error may be buried under fifty reasonable-looking decisions.

This creates a new kind of management problem. If reviewing an agent's work takes as long as doing the work yourself, you have not created leverage. You have created a very fast employee whose work you cannot trust.

METR measures the length of software tasks frontier agents can complete and found that the [50% time horizon has been doubling roughly every seven months](https://metr.org/time-horizons/). This is impressive progress, but the 50% is doing a lot of work in that sentence. An agent that completes an eight-hour task half the time is an incredible demo and a terrible employee.

The useful threshold for outcome ownership is not whether the agent can occasionally produce the right result. It is whether you can trust it to make progress repeatedly, know when it is stuck and leave behind enough evidence to check its work.

## From chatbots to digital employees

There will not be a single moment when agents become employees. They will gradually take ownership of larger loops of work.

First they complete a task while we watch. Then they complete a task in the background. Then they own a recurring workflow with clear success criteria. Eventually we give them a goal and they decide which workflows and tasks are required to reach it.

Each step reduces the amount of human supervision and increases the cost of getting something wrong.

```
instruction -> task execution -> workflow execution -> outcome ownership
             more autonomy and less human supervision ->
```

Today's models are already intelligent enough to move further along this spectrum than most production applications allow. What is missing is the infrastructure around them.

Agents need durable execution so a six-hour assignment does not disappear when a process crashes. They need memory that survives beyond one context window. They need permissions and budgets that cannot be negotiated away through prompting. They need to know when to ask a human for help. And they need to produce a legible record of their work so a human can review the important decisions instead of reading the entire transcript.

The prompt-response era mostly required an API endpoint. The long-horizon era will require a runtime.

In [Part 2](/blog/long-horizon-agents-part-2), I will look at what that runtime needs and where the opportunities are for builders.
