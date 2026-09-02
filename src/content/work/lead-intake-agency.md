---
title: Lead intake for a small B2B agency
kind: internal-build
sector: Professional services
order: 1
summary: >-
  An internal build that turns scattered inbound enquiries into a single, enriched
  pipeline — so no lead waits on someone remembering to copy it into the CRM.
problem: >-
  Enquiries arrive through a website form, a shared inbox and the occasional
  LinkedIn message. Someone has to notice each one, judge whether it is worth
  pursuing, look up the company, and paste it into a CRM. It happens late, or
  not at all, and there is no record of what was ignored.
before:
  - New enquiry lands in a shared inbox

  - A team member notices it (eventually)
  - They manually research the company and contact
  - They decide, informally, whether it is worth a reply
  - Some enquiries are copied into the CRM; some are lost
intervention: >-
  A single intake system that watches every channel, enriches each enquiry with
  public company data, scores it against a written definition of a good-fit lead,
  and creates a CRM record with a suggested next step. A person still approves
  anything before outreach — the system removes the busywork, not the judgment.
result:
  - metric: One
    label: pipeline instead of three inboxes
    source: Internal build — observed in our own system, not a client deployment
  - metric: < 2 min
    label: from enquiry to enriched CRM record
    source: Internal build — observed in our own system, not a client deployment
  - metric: Nothing
    label: dropped without a logged reason
    source: Internal build — observed in our own system, not a client deployment
stack:
  - Webhook intake + shared-inbox polling
  - Enrichment API
  - Classification (rules + a scored model call)
  - CRM (HubSpot / Pipedrive)
  - Slack for approvals
humanImpact: >-
  Nobody spends their morning triaging an inbox. The team sees a short,
  prioritized list with context already attached, and decides where to spend
  their attention.
draft: false
---

## Why this build exists

This is an **internal build** — a system we built and run ourselves rather than a
paid client project — and it is labeled that way on purpose. It shows how we
think about a common, unglamorous problem: inbound leads that depend on a person
remembering to act.

The numbers below come from our own deployment, not from a client engagement.
When we run this for a customer, the results section will say so and cite where
each figure came from.

## The system, in plain terms

Every channel feeds one intake step. Each enquiry is enriched and scored, then a
CRM record is created with a recommended next step. A human approves outreach.
The result is one legible pipeline instead of three places to check.

## What this build has to get right

A system like this fails quietly rather than loudly, so the interesting work is
in the instrumentation:

- **Enrichment misses.** Public data is incomplete for small companies. Anything
  the enricher cannot resolve goes to a human queue rather than being scored on
  missing fields.
- **Score drift.** A "good-fit lead" definition written in January is wrong by
  June. The score is reviewed against closed-won data, not left to run forever.
- **Channel silence.** If a shared inbox stops delivering, nothing errors — the
  pipeline just goes quiet. Each channel gets a heartbeat check so silence is
  itself an alert.