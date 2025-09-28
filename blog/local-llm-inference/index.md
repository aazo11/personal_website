---
title: "Local LLM Inference: Tremendous progress, but not ready for prime time"
date: "2024-04-01"
---

*Originally published on [Medium](https://medium.com/@aazo11/local-llm-inference-897a06cc17a2)*

The current state of local LLM inference is fascinating — impressive progress has been made, but it's not quite production-ready as a developer platform.

## The Origin Story

I discovered local inference while building a text-to-SQL product. The ambitious goal? Cram an entire GenBI stack into the browser. What started as a seemingly impossible task turned into an exploration of just how far local LLM technology has come.

## What's Possible Today

Through the magic of open source software, our laptops can now run powerful LLMs right in browser tabs — completely free. This isn't just a tech demo; it's real, functional AI running entirely on your machine. The progress here has been nothing short of remarkable.

But here's the reality check: while impressive, it's not production-ready as a developer platform. Not yet.

## The User Perspective

Let's be honest about what users actually care about:
- **Speed**: Is it fast enough?
- **Cost**: Is it affordable?
- **Location of compute**: Honestly? They don't care.

Most users couldn't tell you the difference between local and cloud inference if their life depended on it. They just want things to work.

## When Local Inference Works: iPhone Face ID

Want to see successful local inference in action? Look no further than your iPhone's Face ID. Since 2018, this has been the gold standard of local AI inference:
- **Fast**: Unlocks in milliseconds
- **Offline**: Works without internet
- **Private**: Your face data never leaves your device
- **Free**: No per-use costs after purchase

This is what winning looks like in local inference.

## Frameworks I've Tested

### llama.cpp
The foundation of the local LLM movement. Written in C/C++ and highly optimized by Georgi Gerganov, this is the engine that powers much of the ecosystem. It's fast, efficient, and runs on practically anything.

### Ollama
Built on top of llama.cpp, Ollama brings better developer experience and thoughtful model library curation. If llama.cpp is the engine, Ollama is the car — easier to drive, but powered by the same technology.

### WebLLM
Coming out of Carnegie Mellon, WebLLM brings browser-based inference with WebGPU acceleration. This is the future — running LLMs directly in your browser tab with GPU acceleration. The fact that this works at all is mind-blowing.

## The Path Forward

For local inference to succeed as a developer platform, we need:

1. **Mature Developer Tooling**: The current tools are impressive but need polish for real-world applications
2. **Simplified Model Management**: Training and deploying small, task-specific models needs to be as easy as npm install
3. **Cloud Integration**: Tight integration with cloud LLMs for hybrid approaches — use local when possible, cloud when necessary

## Conclusion

Local LLM inference has come incredibly far, incredibly fast. The technical achievements are remarkable. But for it to become a true developer platform — something you'd bet your startup on — we need better tooling, simpler workflows, and seamless cloud integration.

The future is hybrid: local inference for privacy, speed, and cost where it makes sense, with cloud LLMs as the backstop for everything else. We're not there yet, but we're closer than ever.