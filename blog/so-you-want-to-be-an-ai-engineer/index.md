---
title: "So you want to be an AI engineer?"
date: "2026-02-01"
featuredImage: "/blog/so-you-want-to-be-an-ai-engineer/hero.png"
---

![So you want to be an AI engineer?](hero.png)

The "AI Engineer" job title is a recent invention, and companies are hiring a lot of [them](https://lightcast.io/resources/blog/the-generative-ai-job-market-2025-data-insights?utm_source=chatgpt.com).

I've generally assumed an AI engineer is someone who can build high quality software applications that leverage LLMs at runtime. 
In other words, folks who do applied AI. I decided to validate that assumption by talking with a few folks in the space and scraping some job listings to build a better mental model of the job responsibilities and requirements. 

The analysis below is from 31 job postings at 21 companies. The raw data is shared [here](/data/ai-engineer-jobs.json).  

## AI labs do not have AI Engineers

If you go to the OpenAI or Anthropic careers pages, you won't find "AI Engineer" listed as a job title. OpenAI has an entire "Applied AI" division with listings for standard engineering roles (SWE, Android Engineer) and 
Anthropic has an "Engineering & Design - Product" team that focuses on AI native applications. 

The technical positions at the labs broadly fall under the following categories:
- Research and model engineering: building the next models
- Infrastructure: deploying training and inference at scale
- Applied AI: building apps that leverage the foundational models

In other words, since the "Applications" orgs at these companies are focused on leveraging advances in the foundational models, 
all the engineers on those teams are Applied AI Engineers.

## The role has gone main street

A lot of companies that are not pure play tech are hiring AI engineers. I imagine these companies want to "leverage AI" or "add AI" to their products and services, don't have
the know-how in-house and are bringing on AI engineers to help them do it. For example:

- **Law firms** - Morrison & Foerster is hiring Senior AI Engineers to build their generative AI platform
- **Banks** - JPMorgan and Capital One both have many open AI Engineer roles, building agents with LangChain and LangGraph
- **Defense contractors** - Booz Allen wants AI Engineers for national security applications
- **Consulting giants** - Accenture and Salesforce have lots of open positions, probably to staff the same non-tech companies with their "AI initiatives"

A 100-year-old law firm is hiring AI engineers in house...

## Keywords to get past the AI screening for your AI job

Looking at the skills the 31 job postings are asking for.

### Skills breakdown

```
Programming Languages           Frameworks & Tools
─────────────────────           ──────────────────
Python         ████████████ 77%   LangChain    █████ 29%
TypeScript     █████ 29%          LangGraph    ████ 23%
JavaScript     ██ 13%             LlamaIndex   ███ 19%
Go             ██ 13%             PyTorch      ██ 16%
Java           ██ 13%             TensorFlow   █ 10%

Key Skills
──────────
Agents/Agentic ███████████ 71%
Evals          █████████ 61%
RAG            █████ 29%
Fine-tuning    █████ 29%
MCP            ██ 16%
```

**Python is table stakes.** 77% of postings require it.

**TypeScript at 29%**. That's the clear #2. Java, Go, and C++ are mentioned, but I assume it is for other parts of the codebase.

**LangChain is the framework of choice.** LangChain and LangGraph together appear in 32% of postings. No other orchestration framework comes close. LlamaIndex shows up in 19% of postings, while AutoGen and CrewAI are barely mentioned.

Here's what's *not* emphasized in the job postings: PyTorch and TensorFlow. Traditional ML frameworks appear in only 10-16% of roles. This is another proof point that AI Engineer == Applied AI Engineer. The job isn't training models. It's building apps that call LLMs.

## Agents, Agents, Agents

![Agent Smith](Agent-Smith-replicated.avif)

A whopping 71% of postings explicitly mention "agents" or "agentic workflows." It's clear that the industry has moved beyond simple chatbots, or at least they think they have. 


RAG (Retrieval Augmented Generation) shows up in 29% of postings - and it's implied in almost every other one.

MCP (Model Context Protocol) is in 16% of postings. Hopefully it will go away soon and be replaced with CLI experts. Just [kidding.](https://cra.mr/context-management-and-mcp)


## Evals

61% of job postings mention evaluations. Anyone who's shipped an LLM application knows that evals are everything. 
You start with evals. 

Anyone that has built production LLM apps has learned this lesson the hard way. If you're interviewing for an AI Engineer role and they don't ask about evals, that's a red flag.

## C.R.E.A.M. $-$$$$

```
Salary Ranges by Seniority
──────────────────────────
Entry    $130K ████████████░░░░░░░░░░░░░ $150K
Mid      $150K ████████████████████░░░░░ $250K
Senior   $160K █████████████████████████ $300K
```

The range is wide: **$130K to $325K** base salary. Startups pay higher than big non-tech companies.

**entry-level AI Engineer roles barely exist.** Only 3% of postings are for new grads. This is overwhelmingly a mid-to-senior role. Companies want people who've already shipped LLM applications in production.

## So what?

"AI Engineers" are applied AI engineers, software engineers familiar with the tooling around LLM apps and how wrangle accuracy out of a stochastic compute stack.

Anyone who has made a career as a software engineer has had to upskill to keep up with new technologies 
throughout their careers. This is one more cycle in the same trend.
