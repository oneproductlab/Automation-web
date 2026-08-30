---
title: Ten-plus n8n workflows, running in sync
kind: client
client: Granite Marketing
sector: Marketing operations
order: -2
summary: >-
  A live n8n automation estate of more than ten workflows, tuned for efficiency,
  extended with new features, and dropped into custom code wherever the
  no-code path ran out.
problem: >-
  An agency running its operations on n8n had grown past the point where a
  visual builder alone was enough. Workflows had multiplied, they depended on
  each other, and the parts that no-code could not express were the parts doing
  the most important work.
before:
  - More than ten workflows running, each added as a separate need arose
  - Dependencies between them held in the builder rather than designed

  - Efficiency limited by what the visual layer could express
  - Anything beyond the no-code path blocked until someone could write code
intervention: >-
  Worked across the existing estate rather than replacing it: improved the
  efficiency of what was already running, added new capability, and wrote
  custom code where a node could not do the job. The result stayed inside n8n,
  so the team kept the tooling they already knew.
result:
  - metric: 10+
    label: workflows working in sync
    source: >-
      Stated by the client, Stephen Anindo, in a public LinkedIn recommendation
      (December 2025).
  - metric: Custom code
    label: deployed where no-code could not reach
    source: >-
      Stated by the client in the same recommendation: "deployed custom code
      where necessary — showing that he's more than just a no/low-code
      developer".
  - metric: Improved
    label: efficiency across the existing estate
    source: >-
      Stated by the client in the same recommendation. Not independently
      measured, and no percentage is claimed.
stack:
  - n8n
  - Custom code nodes
  - Third-party API integrations
humanImpact: >-
  The team kept working in the tool they already knew, without hitting a ceiling
  every time a requirement fell outside what the visual builder could express.
draft: false
---

## What this is

A **paid client engagement** for Granite Marketing, an agency running its
operations on n8n.

Everything on this page is drawn from what the client said publicly. Where a
figure appears, the source line states who said it and when. No percentages or
time savings are claimed, because none were measured.

## In the client's words

> I worked with Niraj on an n8n project that comprised of over 10 workflows
> working in sync. He improved the efficiency, added new features with ease and
> deployed custom code where necessary — showing that he's more than just a
> no/low-code developer which is very valuable in this day and age. I would not
> hesitate to recommend him if you're looking for professional execution and
> strong communication!
>
> — [Stephen Anindo](https://www.linkedin.com/in/stephenanindo/), AI Engineer /
> Founder at Granite Marketing, December 2025

## Why "more than no-code" matters

Most automation work sold today stops at the edge of the visual builder. That
edge arrives sooner than people expect: a rate limit that needs custom backoff,
a payload the nodes cannot reshape, a piece of business logic with too many
branches to draw.

At that point there are two options. Work around it — usually by adding more
workflows, which is how an estate becomes unmaintainable — or write the code.

This engagement did the second. The estate stayed in n8n, so the team kept
their tooling and their visibility, but the parts that needed real code got
real code.

## What ten workflows in sync actually means

The count is not the interesting part. Ten independent automations are easy.
Ten that depend on each other is a different problem: one failing quietly can
leave the others acting on stale data, and the failure shows up somewhere else
entirely, hours later.

That is the work — sequencing, shared state, and knowing which failures must
stop the chain rather than pass through it.