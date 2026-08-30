---
title: Zapier, Make, n8n or custom code — how to choose
description: >-
  A practical comparison of the four ways to build an automation, and the
  specific signals that tell you when to move from one to the next.
pubDate: 2026-08-17
tags: [tools, integrations, engineering]
draft: false
---

There is no best option here. There is a right option for a given workflow, and
a predictable point at which it stops being right.

**Short version:** Zapier for simple, low-volume, business-owned automations.
Make for branching logic and higher volume. n8n when you need self-hosting or
your run count makes per-task pricing painful. Custom code when reliability
matters more than assembly speed.

## Zapier

**Use it when** the workflow is a handful of steps, runs hundreds — not hundreds
of thousands — of times a month, and a non-engineer needs to own it.

Zapier's real product is its connector library. If your five tools all have
first-class Zapier integrations, you can have something working in an afternoon,
and that speed is genuinely valuable.

**Move on when** you find yourself chaining Zaps together to fake branching
logic, when the per-task cost starts appearing in budget conversations, or when
you need to know *why* something failed three weeks ago and the run history
cannot tell you.

## Make

**Use it when** the logic branches, loops, or transforms data in ways Zapier
makes awkward, and you still want a visual builder.

Make handles iteration and error routing far better, and its pricing tolerates
higher volume. The visual canvas is also a genuine documentation artifact — you
can show it to someone and they will understand the flow.

**Move on when** the scenario has grown to fifty modules and nobody wants to
touch it. A visual builder that has outgrown one screen has become harder to
maintain than the code it replaced, not easier.

## n8n

**Use it when** you need to self-host for data residency or compliance reasons,
when your execution volume makes per-task pricing absurd, or when you want to
drop into JavaScript for one awkward step without abandoning the visual tool.

n8n is the pragmatic middle. Source-available, self-hostable, and it lets an
engineer write real code inside a node instead of building a monument out of
string-manipulation blocks.

**Move on when** you are writing more code inside nodes than you are configuring
them. At that point the visual layer is overhead, not help.

## Custom code

**Use it when** the workflow is core to how the business makes money, when
failure has real consequences, or when you need testing, version control and
proper observability.

This is not a purity argument. It is that a payment reconciliation running
through a visual builder cannot be unit tested, cannot be code reviewed, and
cannot be rolled back cleanly. Those absences are affordable for a Slack
notification and unaffordable for money movement.

**The honest cost:** custom code needs someone who can maintain it. If nobody at
your company can, a platform your team can actually operate is the better
engineering decision, even though it is the worse engineering.

## The signals that you have outgrown your tool

Independent of which tool you are on:

- **You cannot answer "did it run?"** without opening the builder and squinting
  at run history.
- **Failures are silent.** You learn about them from a customer.
- **One person understands it.** The automation has become a dependency on an
  individual, which is the exact problem automation was meant to remove.
- **The workaround has a workaround.** Two Zaps triggering a third that writes to
  a sheet a fourth reads is a system asking to be rewritten.
- **Per-task cost is a line item.** At volume, platform pricing crosses the cost
  of the engineering time it saved.

## What we actually do

We use platforms when they genuinely fit — there is no credit for building a
custom integration where a connector would have held up fine. We write Python and
FastAPI services when reliability, testing or volume demands it.

Most real systems end up mixed: a platform handling the well-supported edges, a
service handling the part that matters, and monitoring across both so a failure
anywhere is visible in one place.

The question worth asking is not "which tool is best." It is "what happens when
this breaks, and who finds out?"