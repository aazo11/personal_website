---
title: "On the accuracy of on-device language models"
date: "2025-05-20"
---

*Are we at "good enough" yet?*

*First published May 20, 2025 on [The Relta blog here](https://medium.com/@aazo11/on-the-accuracy-of-on-device-llms-34fd6cc420b5)*

![Title image one robot learning from another](./title_image.webp)

This post follows up on my previous article about latency and developer experience in local inference. All tests here were run on an M2 Max MacBook Pro (32GB RAM) using LM Studio for inference and DSPy for benchmarking. Models included DeepSeek-R1-Distill-Qwen and the Gemma-3 family. Source code used in this blog and results are here.

## Background

Consumer laptops can now run language models (LMs) fast enough for interactive use. But what can these models actually do well today, and how large do they need to be to do it?

I evaluated four task types:

- **Simple Prompt Rewriting** — Remove filler like "please" and "thank you".
- **Complex Prompt Rewriting** — Redact PII without altering the intent.
- **General Knowledge Q&A** — Answer factual questions without tools or RAG.
- **Math Reasoning** — Solve grade-school problems (GSM8K benchmark).

## Simple prompt rewrite

Cloud providers incur real costs on verbose prompts processing "thank you" and "please." Theoretically a local model running in-browser can clean these locally before routing to the cloud.

I started testing began with gemma-3–1b-it-qat (762MB). Initial manual checks indicated solid performance.

![Sample case where the thanks can be removed](./simple_prompt_1.webp)

Sample case where the thanks can be removed

![Trying to stump the model v1 — it passed](./simple_prompt_2.webp)

Trying to stump the model v1 — it passed

![Trying to stump the model second attempt — it passed](./simple_prompt_3.webp)

Trying to stump the model second attempt — it passed

To quantify accuracy more rigorously, I benchmarked Gemma-1B, 4B, and 12B using DSPy-tuned prompts (20 training samples, evaluated across 80 questions). The results here showed real weakness with smaller models.

![Simple prompt rewrite with 1B, 4B and 12B models](./simple_prompt_results_1.webp)

Simple prompt rewrite with 1B, 4B and 12B models

The 1B model frequently failed by producing invalid JSON. Both 1B and 4B models would often modify text when it was instructed not to. For example in the scenario below the polite token is integral to the meaning of the prompt so the system should not have altered the input at all, however it did a rewrite.

```json
{
  "initial_prompt": "Why is it polite to end calls with \"take care\"?",
  "expected_reasoning": "The phrase \"take care\" is a polite expression. The word \"polite\" in the prompt is not a polite word itself; it is used in an analytical context. There are no actual polite words or phrases in the prompt that can be removed without altering the meaning.",
  "expected_rewritten": "Why do people end calls with \"take care\"?",
  "model_reasoning": "The prompt asks \"Why is it polite to end calls with \"take care\"?\" The phrase \"take care\" is a common expression of goodwill and concern when ending a conversation. It's considered polite because it conveys that you wish the other person well, showing respect and consideration for their wellbeing. Removing this phrase would change the question entirely, making it simply \"Why is it polite to end calls?\".",
  "model_rewritten": "Explain why saying \"take care\" at the end of a phone call is considered polite.",
  "is_integral": true,
  "is_correct": false,
  "latency": 1.5175559520721436
}
```

Bottom line: small models might pass spot checks but don't hold up under structured testing yet. I plan on fine-tuning these models for this specific task to see if accuracy can pass 90%.

## Harder prompt rewriting — PII redaction

PII redaction is a natural local inference task. Imagine a pipeline where user input is redacted locally before hitting the cloud, and identifiers are later reinserted. This architecture was proposed and studied in the Columbia NLP team's Papillon paper.

In initial tests, 1B models failed PII redaction but 4B models seemed to perform well.

![PII redaction test 1](./PII_redaction_1.webp)

![PII redaction test 2](./PII_redaction_2.webp)

![PII redaction test 3](./PII_redaction_3.webp)

Similar to the simple prompt rewrite, I benchmarked Gemma-1B, 4B, and 12B using DSPy-tuned prompts (20 training samples, evaluated across 80 questions). In this test, the 4b model gave good results out of the box.

![PII redaction results](./PII_redaction_accuracy_1.webp)

I plan on fine tuning the 1B model to see if I can get performance comparable to the 4B models in the future.

## General Knowledge Q+A

This is where small local models struggle. Even at 12B, hallucinations are rampant. Especially when answering simple follow-ups.

The first question in each of the following chats asks "who is Jim Morrison." The models are getting progressively larger, but all models under 32B fail.

![Gemma3-1b thinks I am way cooler than I am IRL](./general_knowledge_morrison_1.webp)

Gemma3-1b thinks I am way cooler than I am IRL

![7b — Despite the resemblance, I am not Jim Morrison's father](./general_knowledge_morrison_2.webp)

7b — Despite the resemblance, I am not Jim Morrison's father

![12B- Sadly, I did not play percussion for the doors](./general_knowledge_morrison_3.webp)

12B- Sadly, I did not play percussion for the doors

Things do get better at 32B. However these models run quite slowly on my machine. The following took 12s to generate the first token.

![32B model response](./general_knowledge_morrison_4.webp)

Admittedly, this is a different test than the others in this post. We are asking a follow up question and trying to stump it in the prompt. However, such scenarios are inherently more prevalent in a chatbot. Therefore from a subjective standpoint Ido not think a general knowledge chatbot cannot work with a local model without being connected to a data source to ground the answers and prevent hallucinations.

## Mathematical reasoning — GSM8K

I tested the models for mathematical reasoning on the GSM8k benchmark. Interestingly the Gemma models outperformed deepseek-r1-distill even at a smaller model size. I was surprised how well Gemma-3-4B did here. For reference the SOTA 175B models only two years ago were around this level of accuracy. One has to wonder whether GSM8K is in the model training data.

![GSM8K evaluated on 1B, 4B and 12B. Gemma-4B outperforms deepseek-r1–7B](./gsm8k_results.webp)

GSM8K evaluated on 1B, 4B and 12B. Gemma-4B outperforms deepseek-r1–7B

I'm unsure how to meaningfully improve these results with fine-tuning. Would love suggestions if anyone has experience here.

## Final thoughts and next steps

As described, I'll try to fine-tune the 1B model for prompt cleanup and PII redaction to see if we can reliably complete specific tasks. My goal is to see I can create intelligent, task-specific lambda functions with a ~750MB bundle size.
