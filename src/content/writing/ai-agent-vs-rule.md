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

**Short version:** use a rule when you can write the decision down as conditions.
Use a model only when the input is unstructured and the judgment cannot be
expressed as conditions — classification, extraction, drafting. If you *can*
write the rule but it would be tedious, write the tedious rule. Tedious is cheap.
Non-deterministic is not.

Here is the test we apply before reaching for a model.

## The one question that decides it

Ask: **can I write this decision down as conditions without using the word
"usually"?**

If yes, it is a rule. If you catch yourself writing *"usually it's a refund
request, unless they mention the invoice, in which case it's usually billing"* —
those "usually"s are exactly where a rule breaks and a model earns its place.

This matters because the two failure modes are nothing alike. A rule fails
loudly and identically every time, which makes it trivial to find and fix. A
model fails quietly and differently each time, and you usually hear about it
from a customer weeks later.

## Use a rule when the decision can be written down

If you can describe the decision as a set of conditions — *if the order is over
£500 and the customer is in the EU, route to the priority queue* — use a rule. It
is faster, cheaper, deterministic, and you can explain exactly why it did what it
did. Rules are boring, and boring is a feature in operations.

The underrated part is auditability. When a customer asks why their order went
to the wrong queue, a rule answers that question in seconds. A model gives you a
log line and a shrug.

## Use a model when the input is messy and the judgment is fuzzy

Reach for a model when the input is unstructured and the decision needs judgment
a rule can't express: classifying the intent of a free-text support message,
extracting fields from a PDF that never has the same layout twice, drafting a
first-pass reply. These are the tasks where a model genuinely outperforms a
brittle pile of conditions.

The tell is variability in the **input**, not complexity in the logic. A hundred
branching conditions over clean structured data is still a rule problem. Three
simple outcomes over free text somebody typed at midnight is a model problem.

## The cost nobody prices in

A model call costs a fraction of a cent, which is why people assume models are
cheap. The running cost is not the cost.

The real cost is evaluation: knowing whether the model is still making good
decisions six months from now. That means keeping a labelled set of examples,
re-checking against it, and having someone who cares when accuracy drifts. If
nobody in your organisation will own that, the honest engineering decision is to
not ship the model — not because it won't work today, but because nobody will
notice when it stops.

This is the question that should decide the architecture, and it is almost never
the question that gets asked.

## Whatever you use, wrap it in something you can trust

When we do use a model, it doesn't get to act unsupervised. It sits inside:

- **Guardrails** — hard limits on what it can touch.
- **A human checkpoint** — for anything consequential or irreversible.
- **Evaluation** — we measure whether it is still making good decisions.
- **Logging** — every call is recorded, so you can see what happened and why.

One rule we apply without exception: **a model never closes a loop on its own.**
It can suggest a classification, draft a reply, or propose a stage change. A
person confirms anything that touches money, a customer, or a record someone
else will rely on. Automation that moves things on its own produces a
clean-looking pipeline nobody trusts — and untrusted automation gets worked
around, which leaves you worse off than the manual process you replaced.

## Where this usually lands

Most real systems are not one or the other. They are rules doing ninety percent
of the work, a model handling the one step that resisted being written down, and
a person confirming the consequential end of it.

Our [WhatsApp-to-CRM build](/work/whatsapp-crm-intake/) is a concrete version of
that split: rules handle routing and stage changes, a model reads the messy part,
and a person confirms anything consequential.

The goal isn't to use AI. The goal is a system that does the work correctly and
that you can hand over with confidence. AI is one tool in that toolbox — used
where it earns its place, and left out where it doesn't. If you're weighing the
same decision on a workflow of your own,
[that is what a scoping conversation is for](/contact/).