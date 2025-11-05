---
title: "Language as proxy for taste"
date: "2025-11-04"
---

Most developers agree that code will be increasingly written by agents.
If that’s true, then familiarity with a specific programming language's ecosystem will stop being a criteria for hiring software developers.

I ran this idea past a few friends who have hired lots of software engineers, and they disagreed.

The theme that kept coming up: the clearest window into an engineer’s taste is the language they build in.

Every language carries its own ethos, a philosophy of how software should be written.
A Python developer values readability.
A Rust developer values discipline and efficiency.

These preferences aren’t trivial, they reveal how someone thinks.
It’s the kind of craftsmanship they aspire to as a builder.
The languages you’ve built in signal who you want to be as an engineer - like the stickers on your laptop, 
they tell your story before you even open it to show a demo.

## Beautiful craftsmanship

Every programming language encodes a set of values.
Spend enough time building in one, and those values shape your sense of taste. What you optimize for, what you tolerate, what you find ugly.

When engineering managers talk about “culture fit,” they’re often circling this idea:
does this person’s taste align with how we build things here?

## Enough talk -- Let's look at code

Two snippets that count the frequency of words in a string: one in Python, one in Rust.


```
from collections import Counter

def word_count(text):
    words = text.lower().split()
    return Counter(words)

```
It’s beautiful because it looks like pseudo-code.
A non-programmer could read it and get the gist.
It trusts the standard library instead of reinventing the wheel, confident that the built-ins are good enough.

```
use std::collections::HashMap;

fn word_count(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();
    for word in text.to_lowercase().split_whitespace() {
        *counts.entry(word.to_string()).or_insert(0) += 1;
    }
    counts
}

```
Every allocation is explicit. Resource usage is tightly controlled. Nothing is left to chance.

Sure, these are toy examples. Python and Rust were built for different kinds of work.
In the craftsmanship analogy, it’s more like comparing wood to bronze than comparing two statues.
But the point stands: each carries a worldview about how things *should* be built.
 

## So What?

When a team lead looks at the languages a developer has built in, they’re not just gauging how productive that person will be.
They’re trying to understand the tribe that person identifies with, and whether it matches the tribe the company is building.

That tribe says more than knowledge of a library, linter rule or test framework ever could.

In a world where AI systems can translate ideas into code across any language, 
taste becomes the more important filter for choosing teammates.

Programming languages may fade into invisible layers between us and our agents.
But their ethos will outlive them. They’ve been quietly training us all along. 
Not in how to write code, but in what we find beautiful.

