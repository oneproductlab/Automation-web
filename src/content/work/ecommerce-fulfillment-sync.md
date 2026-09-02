---
title: Order-to-fulfillment sync for a small e-commerce shop
kind: internal-build
sector: E-commerce
order: 2
summary: >-
  A internal-build showing how a store, a spreadsheet and a courier can be
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
    source: Internal build — observed in our own system, not a client deployment
  - metric: Same day
    label: tracking sent automatically on dispatch
    source: Internal build — observed in our own system, not a client deployment
  - metric: Exceptions
    label: surfaced, not hunted for
    source: Internal build — observed in our own system, not a client deployment
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

## A internal build, not a client story

This is a system we built and run ourselves rather than a paid client
engagement, and it is labeled that way. The figures come from our own
deployment; when we run this for a customer, the results section will cite
measured client outcomes instead.

## The idea

Make the order the single source of truth. Everything downstream — stock,
courier, customer notification — reacts to it. Reconciliation becomes an
exception report, not a nightly chore.