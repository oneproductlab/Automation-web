---
title: WhatsApp enquiries into a CRM, end to end
kind: concept
sector: Sales operations
order: 0
summary: >-
  A concept build for teams whose customers message on WhatsApp but whose
  pipeline lives in a CRM — so conversations become records without anyone
  retyping them.
problem: >-
  Customers message on WhatsApp because it is the easiest thing to open. The
  business runs its pipeline in a CRM. Between the two sits a person with a
  phone, reading threads and retyping names, numbers and intent into contact
  records. Threads sit on one salesperson's device, so nobody else can see them.
  When that person is on leave, the pipeline goes dark.
before:
  - Enquiry arrives as a WhatsApp message on a salesperson's phone
  - They read it and decide, informally, whether it is a real lead
  - They retype the name, number and request into the CRM
  - Follow-ups continue in WhatsApp, invisible to everyone else
  - The CRM record stops reflecting reality within days
intervention: >-
  A two-way bridge on the WhatsApp Business API. Inbound messages are matched to
  an existing contact by phone number or create a new one; the thread is written
  to the CRM as it happens; and a reply sent from the CRM goes back out over
  WhatsApp. Routing and stage changes follow written rules. A person still
  answers the customer — the system removes the retyping and the blind spots,
  not the conversation.
result:
  - metric: One
    label: thread visible to the whole team, not one phone

    source: Concept build — describes the design, not a measured result
  - metric: Zero
    label: manual re-entry between chat and CRM
    source: Concept build — describes the design, not a measured result
  - metric: Every
    label: message attached to a contact record automatically
    source: Concept build — describes the design, not a measured result
stack:
  - WhatsApp Business API (webhook intake + send)
  - Phone-number identity matching and deduplication
  - CRM contact/deal sync (HubSpot / Pipedrive / Zoho)
  - Rules-based routing and stage transitions
  - Slack notifications for unassigned threads
humanImpact: >-
  A salesperson answers WhatsApp the way they always have. Everyone else can see
  the conversation, the record is current without anyone maintaining it, and a
  handover no longer means reading someone else's phone.
draft: false
---

## Why this build exists

This is a **concept build**, not a paid client project, and it is labeled that
way deliberately. It exists because this is the single most common request we
hear described in the wild: customers have moved to WhatsApp, the CRM has not,
and a person is bridging the gap by hand.

The figures below describe the design. They are not measured client outcomes.
When we run this for a real company, the results section will say so and cite
where each number came from.

## The system, in plain terms

An inbound WhatsApp message hits a webhook. The sender's number is matched
against existing CRM contacts — if it resolves, the message is appended to that
contact's timeline; if not, a contact is created with whatever the message
itself reveals. Routing rules decide who owns the thread and which stage the
deal sits in. Replies sent from the CRM go back out over the same API, so the
customer experiences one continuous conversation.

The important design decision is that the CRM, not the phone, becomes the
system of record. The phone is an interface.

## What we would watch in production

Chat automation fails in specific, well-understood ways, and most of the
engineering effort goes here rather than into the happy path:

- **Identity is messier than it looks.** One person messages from two numbers;
  one number is shared by a household or an office. Matching on phone number
  alone will eventually merge two customers into one record. Ambiguous matches
  go to a human queue instead of being resolved by guessing.
- **The 24-hour window.** WhatsApp only permits free-form business replies
  within 24 hours of the customer's last message; after that, only approved
  templates. A system that ignores this looks fine in testing and silently fails
  to deliver in production. Template fallbacks are part of the design, not a
  patch.
- **Opt-out has to be real.** A customer who says "stop" must stop receiving
  messages, immediately and permanently, and that state belongs in the CRM
  rather than in a queue somewhere.
- **Delivery is not confirmation.** A message can be accepted by the API and
  never reach the handset. Delivery receipts are reconciled against sent
  messages, so a silent failure surfaces as an alert rather than as a customer
  who was never actually contacted.
- **Never auto-close.** The system suggests a stage change; a person confirms
  it. An automation that moves deals on its own produces a clean-looking
  pipeline that nobody trusts.

## Where this fits

If your team is answering customers in one place and reporting on them in
another, the gap between those two places is being paid for in someone's
attention every day. That gap is what this build closes.