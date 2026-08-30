---
title: Order-to-fulfillment sync for a small e-commerce shop
kind: concept
sector: E-commerce
order: 2
summary: >-
  A concept teardown showing how a store, a spreadsheet and a courier can be
  wired together so stock and status never drift out of sync.
problem: >-
  A growing shop tracks stock in a spreadsheet, takes orders on a storefront,
  and books couriers by hand. The three never quite agree. Oversells happen,
  customers ask "where is my order?", and someone reconciles it all every evening.
before:

  - Order placed on the storefront
  - Stock spreadsheet updated manually (when remembered)
  - Courier booked by copying the address by hand
  - Tracking number emailed to the customer manually
  - Evening spent reconciling mismatches
intervention: >-
  A sync layer that treats the order as the single event: it decrements stock,
  books the courier, writes the tracking number back, and notifies the customer —
  with a daily exception report for anything that does not match, instead of a
  nightly manual reconciliation.
result:
  - metric: "0"
    label: manual re-keying between systems
    source: Concept build — design target, not a measured client result
  - metric: Same day
    label: tracking sent automatically on dispatch
    source: Concept build — design target, not a measured client result
  - metric: Exceptions
    label: surfaced, not hunted for
    source: Concept build — describes the design, not a metric
stack:
  - Storefront webhooks (Shopify / WooCommerce)
  - Inventory source of truth
  - Courier API
  - Scheduled reconciliation job with alerting
humanImpact: >-
  The evening reconciliation disappears. The owner looks at a short exception
  list instead of checking three systems against each other by hand.
draft: false
---

## A teardown, not a client story

This is a **concept teardown** — a public example of how we would approach a
familiar problem. It is clearly labeled as such. When you run a real version of
this, replace the numbers with measured results and change the label to
`client`.

## The idea

Make the order the single source of truth. Everything downstream — stock,
courier, customer notification — reacts to it. Reconciliation becomes an
exception report, not a nightly chore.