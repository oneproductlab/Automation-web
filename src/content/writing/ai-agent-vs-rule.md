---
title: When to use an AI agent, and when to use a rule
description: >-
  Most automation problems don't need a model. A practical way to decide when AI
  earns its place in a workflow — and when a plain rule is the better engineering.
pubDate: 2026-02-18
tags: ['ai', 'automation', 'process']
draft: false
---

There is a lot of pressure right now to put an AI model into every workflow. Most
of the time, you shouldn't. Not because models aren't useful — they are — but
because a good system uses the simplest mechanism that reliably does the job.

Here is the test we apply before reaching for a model.

## Use a rule when the decision can be written down

If you can describe the decision as a set of conditions — *if the order is over
£500 and the customer is in the EU, route to the priority queue* — use a rule. It
is faster, cheaper, deterministic, and you can explain exactly why it did what it
did. Rules are boring, and boring is a feature in operations.

## Use a model when the input is messy and the judgment is fuzzy

Reach for a model when the input is unstructured and the decision needs judgment
a rule can't express: classifying the intent of a free-text support message,
extracting fields from a PDF that never has the same layout twice, drafting a
first-pass reply. These are the tasks where a model genuinely outperforms a
brittle pile of conditions.

## Whatever you use, wrap it in something you can trust

When we do use a model, it doesn't get to act unsupervised. It sits inside:

- **Guardrails** — hard limits on what it can touch.
- **A human checkpoint** — for anything consequential or irreversible.
- **Evaluation** — we measure whether it is still making good decisions.
- **Logging** — every call is recorded, so you can see what happened and why.

The goal isn't to use AI. The goal is a system that does the work correctly and
that you can hand over with confidence. AI is one tool in that toolbox — used
where it earns its place, and left out where it doesn't.