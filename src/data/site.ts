export const site = {
  name: 'Flowzora',
  // Short descriptor used in the logo lockup and footer.
  // Keyword-bearing on purpose: "workflow automation" is the term buyers search.
  tagline: 'Workflow automation agency',
  domain: 'https://flowzora.com',
  email: 'info@flowzora.com',
  parent: 'oneProductLab',
  parentUrl: 'https://www.linkedin.com/company/oneproductlab',
  // Flowzora's OWN LinkedIn Company Page — not the parent's. This is the single
  // most important external entity signal: it is the third party that confirms
  // "Flowzora" the automation agency exists, so Google stops resolving the brand
  // term to the similarly-named competitor. Feeds the footer icon and, via
  // Base.astro, the Organization `sameAs`. The parent's page stays on parentUrl.
  linkedin: 'https://www.linkedin.com/company/flowzora',
  /*
    Google Business Profile. The strongest brand-disambiguation signal available:
    it is the record that feeds a Knowledge Panel, and it is what stops Google
    resolving "flowzora" as a typo for the similarly-named competitor.

    Listed in `sameAs` so the site and the profile corroborate each other in both
    directions — the profile's Website field points here, this points back.

    Canonical Maps URL rather than the share.google shortlink: it names the place
    directly via its CID instead of making a crawler follow an opaque redirect.

    Tracking parameters from the copied address bar (`sa`, `ved`, `ictx`, and an
    `hl=en-IN` locale pin) are deliberately stripped — they are session artifacts,
    not part of the identity, and the locale would have pinned the entity to a
    single market. What remains is the stable `data=` fragment holding the CID.
  */
  googleBusiness:
    'https://www.google.com/maps/place/Flowzora/data=!4m2!3m1!1s0x0:0xaef894a78951395f',
  twitter: 'https://x.com/oneproductlab',
  instagram: 'https://www.instagram.com/oneproductlab',
  /*
    Dedicated Calendly event type for this site — not the parent company's
    general link, so inbound bookings can be attributed and measured.
    Empty until created; the booking button falls back to the contact form.
  */
  calendly: '',
  // The work is remote and the clients are global, so the schema says so.
  // A named country list here quietly tells search engines — and anyone
  // outside it — that we don't serve them.
  areaServed: 'worldwide',
  locale: 'en',
};

/**
 * The single named human behind the agency.
 * E-E-A-T and generative-engine citation both depend on a real, verifiable person —
 * every claim here must be independently checkable on the linked profile.
 */
export const founder = {
  name: 'Niraj Kumar',
  role: 'Founder & Lead Engineer',
  linkedin: 'https://www.linkedin.com/in/modestai/',
  education: 'B.Tech, NIT Kurukshetra',
  /*
    Stable, unhashed URL for the founder portrait, used by the `Person` schema
    and by anything else that needs a permanent address.

    On-page rendering uses `src/assets/images/niraj.jpg` through Astro's `<Image>`
    component instead, which emits hashed, optimized WebP. Those filenames change
    whenever the source does, which is exactly what you want for a browser cache
    and exactly what you do not want in structured data a crawler may have
    already recorded. Hence the two copies.
  */
  photo: {
    src: '/niraj.jpg',
    width: 560,
    height: 700,
    alt: 'Niraj Kumar, founder of Flowzora',
  },
  bio: 'Niraj builds backend and AI systems for a living — production APIs, data platforms and applied machine learning. Before starting Flowzora he built a financial analytics platform covering 10,000+ stock symbols, and worked as a machine learning engineer at C-DAC on adversarial ML, formal verification and model monitoring.',
  // Sectors, not employer names used as borrowed credentials.
  sectors: ['Fintech and financial analytics', 'Government ML research', 'Consumer AI products'],
  /*
    Capability areas rather than a named tool list. A stack list dates fast and
    invites the wrong read — that the work is confined to those tools — when the
    tooling is chosen per engagement.
  */
  capabilities: [
    'Backend systems and APIs',
    'AI and LLM applications',
    'Data pipelines and integrations',
    'Cloud infrastructure and deployment',
    'Workflow orchestration and monitoring',
  ],
};

/**
 * Client testimonials.
 *
 * These are public LinkedIn recommendations, quoted verbatim and linked to the
 * profile that wrote them. That matters more than the words: an anonymous
 * "CEO, SaaS company" quote is worth nothing because it cannot be checked,
 * whereas a named person with a live profile can be. Every quote here is
 * verifiable by a prospect in one click.
 *
 * Quotes are lightly trimmed for length only — never reworded, and never cut
 * in a way that changes what was said.
 *
 * `isClient` is not rendered. It exists so the `Review` structured data on the
 * homepage can be restricted to people who actually paid for work: a review
 * node asserts a customer relationship, and Akhil was a colleague rather than
 * a client. The distinction was dropped from the visible card, so the schema
 * is now the only place it is enforced — which makes it load-bearing.
 */
export const testimonials = [
  {
    quote:
      'I worked with Niraj on an n8n project that comprised of over 10 workflows working in sync. He improved the efficiency, added new features with ease and deployed custom code where necessary — showing that he’s more than just a no/low-code developer which is very valuable in this day and age. I would not hesitate to recommend him if you’re looking for professional execution and strong communication!',
    name: 'Stephen Anindo',
    role: 'AI Engineer / Founder',
    company: 'Granite Marketing',
    linkedin: 'https://www.linkedin.com/in/stephenanindo/',
    isClient: true,
    // The line a prospect scanning at speed should still catch.
    pullQuote: 'Over 10 workflows working in sync.',
  },
  {
    quote:
      'Hired Niraj to build out a website for me at automatedbureaucracy.com and he delivered a great full stack application that provides a solid foundation for my automation agency.',
    name: 'Blake DeHaas',
    role: 'Graduate Operations Software Engineer',
    company: 'Laboratory for Atmospheric and Space Physics',
    linkedin: 'https://www.linkedin.com/in/blakedehaas/',
    isClient: true,
    pullQuote: 'A solid foundation for my automation agency.',
  },
  {
    quote:
      'One of the most versatile professionals I have come across. His eagerness to learn new things is truly inspiring — whether it’s picking up a new skill, exploring a different approach, or taking on a challenge outside his comfort zone. His incredible ability to take even the harshest criticism in stride sets him apart even more.',
    name: 'Akhil Rajeev P',
    role: 'AI Researcher, NLP & Generative AI',
    company: 'C-DAC',
    linkedin: 'https://www.linkedin.com/in/akhil-rajeev-p-42bb23235/',
    // Worked alongside Niraj, never bought anything. Not a review.
    isClient: false,
    pullQuote: 'One of the most versatile professionals I have come across.',
  },
];

/**
 * Verifiable engineering track record.
 *
 * Built on years of production engineering. These are measured outcomes from
 * production systems the founder built before Flowzora, and they carry real
 * weight alongside client engagements. Stated as prior work rather than agency
 * results — the distinction is the whole point.
 *
 * Written for an operations buyer, not an engineer. The underlying facts are
 * unchanged and still verifiable; what changed is the framing. "70% lower API
 * latency" is evidence for a job nobody here is hiring for — the reader's
 * problem is a person retyping things, so each figure now leads with what it
 * proves about systems that keep running, and keeps the technical detail
 * underneath for anyone who wants it.
 */
export const credentials = [
  {
    metric: '30K',
    label: 'visits in 3 days, no downtime',
    detail:
      'Backend infrastructure for an AI product that scaled hard at launch and stayed up through it.',
  },
  {
    metric: '10,000+',
    label: 'records processed daily, unattended',
    detail:
      'Ingestion pipelines and a scoring engine running across a full market universe, without a person minding them.',
  },
  {
    metric: '70%',
    label: 'faster, on the same infrastructure',
    detail:
      'Caching, query optimization and async execution on a production analytics platform — no extra spend.',
  },
  {
    metric: '60%',
    label: 'lower database load, no new spend',
    detail: 'Access-pattern redesign rather than a bigger server.',
  },
];

/**
 * The founding-client offer.
 *
 * Framed as finite capacity, not as a confession of being new. Earlier versions
 * led with "We're new" and "the first few clients" — which, sitting directly
 * below three verified client testimonials, argued against their own evidence.
 * The scarcity is real either way: a senior-only team has a finite calendar,
 * and that is the honest reason these terms expire.
 */
export const foundingOffer = {
  eyebrow: 'Founding clients',
  headline: 'Early enough to get our full attention.',
  body: 'We take on a limited number of builds at a time, so the engineering stays senior and hands-on. While the calendar has room, current terms hold — they change once it fills.',
  terms: [
    {
      title: 'You work with the founder',
      detail: 'Not an account manager. The person scoping the work writes the code.',
    },
    {
      title: '90 days of maintenance, included',
      detail: 'After handover we keep it running at no extra cost. Breakages and API changes are ours.',
    },
    {
      title: 'Your build becomes the case study',
      detail: 'Written up in full, with your approval, and credited if you want it.',
    },
  ],
  caveat:
    'In exchange we ask for honest feedback and, if the work earns it, a reference.',
};

/**
 * Qualification. A buyer's first question is "are these people for me?", and
 * leaving it unanswered costs more inquiries than a narrow answer would.
 */
export const fitFor = {
  headline: 'Who this is for',
  /*
    Fit is described by symptoms, not by headcount or geography.

    An earlier version gated on "US teams of 20–200 people", which excluded
    every client outside one country and every twelve-person company with a
    real problem — while doing no qualifying work that the signals below
    don't already do better. A ten-person agency losing a day a week to
    re-keying is a better fit than a 150-person company with none of these
    symptoms.
  */
  signals: [
    'You run a stack of tools that don’t talk to each other',
    'Someone senior spends hours a week re-entering the same data',
    'You’ve outgrown spreadsheets but don’t want another rigid platform',
  ],
  notFor: [
    'You need a single Zapier zap — a freelancer is cheaper',
    'You want a team of twenty on site — we staff senior and stay lean',
  ],
  stacks: [
    'HubSpot',
    'Salesforce',
    'Shopify',
    'QuickBooks',
    'Slack',
    'Notion',
    'Zendesk',
    'Airtable',
  ],
};

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Approach', href: '/approach/' },
  { label: 'About', href: '/about/' },
  { label: 'Writing', href: '/writing/' },
];

export const services = [
  {
    slug: 'revenue-operations',
    // Short form for scanning contexts; `summary` is the fuller version.
    brief: "Leads captured, enriched and routed without re-typing.",
    index: '01',
    title: 'Sales & revenue operations',
    // `seoTitle` targets the phrase buyers actually search; `title` stays in our voice.
    seoTitle: 'CRM automation & revenue operations services',
    keyword: 'crm automation services',
    summary:
      'Lead capture, routing, enrichment and CRM hygiene that stops deals stalling between tools — connecting HubSpot, Salesforce or Pipedrive to where leads arrive.',
    detail:
      'We connect the places leads arrive to the systems your team actually works in — so nothing is re-keyed, nothing is dropped, and every record is where a rep expects it.',
    answer:
      'Revenue operations automation connects your lead sources, CRM and sales tools so records are created, enriched and routed without anyone retyping them. It typically removes the delay between a lead arriving and a rep seeing it, and keeps pipeline data accurate enough to forecast from.',
    builds: [
      'Unified lead capture across forms, ads and inbound email',
      'Routing and assignment rules that match your team structure',
      'Enrichment and deduplication before records reach the CRM',
      'Pipeline and forecast roll-ups your leadership can trust',
    ],
    signals: [
      'Leads sit unworked because nobody was notified',
      'Reps retype the same details into two or three tools',
      'Your CRM and your spreadsheet disagree about the pipeline',
    ],
    faqs: [
      {
        q: 'Can you automate lead routing in our existing CRM?',
        a: 'Yes. We build routing on top of the CRM you already run — HubSpot, Salesforce, Pipedrive or otherwise — rather than migrating you to a new one. Rules follow your real team structure, including territories, round-robin and specialist handoffs.',
      },
      {
        q: 'How do you stop duplicate records being created?',
        a: 'We deduplicate and enrich records before they ever reach the CRM, matching on email and domain first and falling back to fuzzy company matching. Anything ambiguous is held for a human decision rather than guessed at.',
      },
    ],
  },
  {
    slug: 'marketing-lifecycle',
    // Short form for scanning contexts; `summary` is the fuller version.
    brief: "Campaigns and reporting that run without a babysitter.",
    index: '02',
    title: 'Marketing & lifecycle automation',
    seoTitle: 'Marketing automation & lifecycle workflows',
    keyword: 'marketing automation consultant',
    summary:
      'Campaign, content and lifecycle workflows that run on their own without a person babysitting them: segmentation, hand-offs and reporting that stay accurate.',
    detail:
      'The repetitive parts of marketing operations — segmentation, hand-offs, reporting — turned into systems that run to a schedule and surface exceptions instead of demanding attention.',
    answer:
      'Marketing lifecycle automation turns segmentation, campaign hand-offs and reporting into scheduled systems that surface exceptions rather than demanding daily attention. The goal is a marketing operation that keeps running correctly on the weeks nobody has time to babysit it.',
    builds: [
      'Lifecycle and nurture flows wired to real product signals',
      'Content and campaign hand-offs between tools',
      'Cross-channel reporting assembled automatically',
      'List hygiene and consent handling that stays compliant',
    ],
    signals: [
      'Reporting is rebuilt by hand every month',
      'Campaign hand-offs depend on someone remembering',
      'Segments drift out of date and nobody notices',
    ],
    faqs: [
      {
        q: 'Do you replace our marketing platform?',
        a: 'No. We automate around the platform you already pay for, connecting it to product data and the rest of your stack. Replacing a marketing platform is expensive and rarely the actual problem.',
      },
      {
        q: 'How do you handle consent and list hygiene?',
        a: 'Consent state is stored in one system of record and synced outward, so an unsubscribe anywhere is honored everywhere. Suppression and hygiene rules run on a schedule rather than being cleaned up manually before each send.',
      },
    ],
  },
  {
    slug: 'internal-operations',
    // Short form for scanning contexts; `summary` is the fuller version.
    brief: "Onboarding, approvals and reconciliation, made repeatable.",
    index: '03',
    title: 'Internal operations & back-office',
    seoTitle: 'Business process automation services',
    keyword: 'business process automation services',
    summary:
      'Onboarding, approvals, finance and admin workflows that currently live in someone’s head — documented, automated, and handed over for your team to own.',
    detail:
      'The unglamorous work that keeps a company running: approvals, provisioning, reconciliation. We make it repeatable, auditable and fast — with a human in the loop where it matters.',
    answer:
      'Business process automation takes back-office work like onboarding, approvals and reconciliation out of people’s heads and turns it into repeatable, auditable systems. Consequential steps keep a human approver; everything around that approval stops being manual.',
    builds: [
      'Employee and customer onboarding sequences',
      'Approval chains with clear ownership and audit trails',
      'Finance reconciliation and reporting automation',
      'Internal tools for tasks no off-the-shelf product covers',
    ],
    signals: [
      'Onboarding is a checklist someone works through by hand',
      'Approvals stall because nobody knows whose turn it is',
      'You cannot reconstruct who approved what, or when',
    ],
    faqs: [
      {
        q: 'Will automation remove human approval from our process?',
        a: 'No — we keep a person on any step with real consequences, such as spending money or granting access. Automation removes the chasing, the copying and the waiting around that surrounds the approval, not the judgment itself.',
      },
      {
        q: 'Can you build an internal tool if no product does what we need?',
        a: 'Yes. Where an off-the-shelf product does not fit, we build a small internal tool with the same reliability standards as the rest of the system, and hand over the code and hosting to you.',
      },
    ],
  },
  {
    slug: 'customer-support',
    // Short form for scanning contexts; `summary` is the fuller version.
    brief: "Tickets triaged and drafted before an agent opens them.",
    index: '04',
    title: 'Customer support automation',
    seoTitle: 'Support ticket automation & triage',
    keyword: 'support ticket automation',
    summary:
      'Triage, classification and response drafting that shortens resolution without hiding humans. Every automated reply stays reviewable, logged and yours to adjust.',
    detail:
      'We route and classify incoming requests, draft responses for review, and connect support to the systems that hold the answers — so your team spends time on the hard cases.',
    answer:
      'Support automation classifies and routes tickets as they arrive and drafts responses from your own knowledge base for an agent to review. It shortens time to first response without putting a bot between your customers and your team.',
    builds: [
      'Ticket triage and classification on arrival',
      'Draft responses assembled from your own knowledge base',
      'Escalation rules with human approval on consequential actions',
      'Support metrics connected back to product and ops',
    ],
    signals: [
      'Tickets wait hours before anyone categorizes them',
      'Agents rewrite the same answer several times a day',
      'Nobody can see which issues are actually driving volume',
    ],
    faqs: [
      {
        q: 'Will customers end up talking to a bot?',
        a: 'Only if you want them to. Our default is agent-assist: the system classifies, routes and drafts, and a person approves before anything reaches the customer. Hiding humans is usually what damages support quality.',
      },
      {
        q: 'How accurate is automated ticket classification?',
        a: 'Accuracy depends on your ticket mix, so we measure it against a labeled sample of your own history before trusting it. Low-confidence tickets are routed to a human queue rather than being misfiled silently.',
      },
    ],
  },
  {
    slug: 'integrations',
    // Short form for scanning contexts; `summary` is the fuller version.
    brief: "Data moves once, correctly, and you see when it doesn't.",
    index: '05',
    title: 'Integrations & data plumbing',
    seoTitle: 'Systems integration & API integration services',
    keyword: 'systems integration consultant',
    summary:
      'The connections between systems that turn a stack of tools into one operation, with retries and alerting so failures surface before customers do.',
    detail:
      'Most automation problems are really integration problems. We build reliable, observable connections between your systems so data moves once, correctly, and you can see when it doesn’t.',
    answer:
      'Systems integration connects the tools you already run so data moves once, correctly, and you can see when it fails. Most problems described as automation problems are really integration problems: the same information living in three places and quietly disagreeing.',
    builds: [
      'Two-way syncs between CRM, finance, support and data tools',
      'API integrations for systems without off-the-shelf connectors',
      'Reliable job handling with retries and alerting',
      'A single source of truth your teams can agree on',
    ],
    signals: [
      'The same record exists in three tools with three values',
      'A sync broke weeks ago and nobody found out',
      'A tool you depend on has no ready-made connector',
    ],
    faqs: [
      {
        q: 'What if our software has no ready-made integration?',
        a: 'We build directly against its API, or against its database or file exports where no API exists. This is the common case for older or industry-specific software, and it is usually straightforward.',
      },
      {
        q: 'What happens when an integration fails?',
        a: 'Every job we ship has retries, dead-letter handling and alerting, so failures surface immediately instead of being discovered weeks later. You get visibility into what ran, what did not, and why.',
      },
    ],
  },
  {
    slug: 'ai-agents',
    // Short form for scanning contexts; `summary` is the fuller version.
    brief: "Models only where a rule genuinely can't do the job.",
    index: '06',
    title: 'AI agents & assisted workflows',
    seoTitle: 'AI automation agency & AI agent development',
    keyword: 'ai automation agency',
    summary:
      'AI used where it genuinely earns its place, with rules, review and traceability around it. Models handle judgment; rules handle anything you can write down.',
    detail:
      'We reach for an AI model when a task needs judgment a rule can’t express — classification, extraction, drafting — and we wrap it in guardrails, evaluation and human review so you can trust the output.',
    answer:
      'An AI agent earns its place only when a task needs judgment a rule cannot express — classification, extraction or drafting. Every model call we ship is wrapped in guardrails, evaluation against your own data, logging and human review, so the output is traceable rather than trusted blindly.',
    builds: [
      'Classification and extraction where rules fall short',
      'Drafting assistants that keep a person in control',
      'Guardrails, evaluation and logging around every model call',
      'A clear boundary between what the AI decides and what it doesn’t',
    ],
    signals: [
      'Someone reads every incoming document and sorts it by hand',
      'Rules cannot capture the judgment the task really needs',
      'You tried an AI tool and could not tell whether to trust it',
    ],
    faqs: [
      {
        q: 'When should we use an AI agent instead of a rule?',
        a: 'Use a rule whenever the logic can be written down and is stable, because rules are cheaper, faster and fully predictable. Reach for a model only when the task genuinely needs judgment, such as reading unstructured text or classifying something a person would have to interpret.',
      },
      {
        q: 'How do you stop an AI system making things up?',
        a: 'We constrain models to your own data, validate every output against a schema before it is used, and route low-confidence results to a person. Anything with real consequences requires human approval before it executes.',
      },
    ],
  },
];

// Engagement steps — the process artifact.
// `short` is used where the reader is scanning; `blurb` where they have
// committed to reading. Same claim, two densities.
//
// Every step here corresponds to something already promised elsewhere on the
// site: "Scope" is the fixed-price commitment from the pricing section, and
// "Keep it running" is the Operations Partner tier. Steps invented to pad the
// list out would be the kind of process theatre this agency sells against.
export const approach = [
  {
    step: 'Map',
    short: 'We sit with the people doing the work and diagram what actually happens today.',
    blurb:
      'We sit with the people doing the work and map what actually happens today — every hand-off, tool and workaround. You get a clear diagram of the current process and where it leaks time.',
  },
  {
    step: 'Scope',
    short: 'A fixed price, in writing, before anything is built. Overruns are ours.',
    blurb:
      'Before a line of code exists, you get the build plan and a fixed price in writing. Scope is agreed up front and the number does not move — if the work runs long, that is ours to absorb, not yours to fund.',
  },
  {
    step: 'Build',
    short: 'Working automation in weeks, not a reveal at the end. Documented as it ships.',
    blurb:
      'We build the system in short, visible increments. You see working automation early and often, not a big reveal at the end. Everything is documented as it ships.',
  },
  {
    step: 'Prove',
    short: 'Run against real work, side by side with the manual process, before you rely on it.',
    blurb:
      'New automation runs alongside the existing manual process on real data, so you can compare the two before trusting it. Nothing is switched over on the strength of a demo.',
  },
  {
    step: 'Hand over',
    short: 'Runbooks, diagrams and a walkthrough. It keeps running after we’re gone.',
    blurb:
      'We leave you with systems you own and understand: runbooks, diagrams and a walkthrough. The automation keeps running after we’re gone — that’s the point.',
  },
  {
    step: 'Keep it running',
    short: 'Optional. Monitoring and changes as your business shifts — never a lock-in.',
    blurb:
      'Automation breaks quietly when the business around it changes. Some clients keep us on to watch it and adapt it; others take it in-house from day one. Both are fine — you own the system either way.',
  },
];

/**
 * Published pricing. This is the highest-intent page on the site: "how much does
 * workflow automation cost" is the query buyers actually type, and stating real
 * numbers is what makes us quotable by answer and generative engines.
 *
 * The figures are deliberately set at the accessible end of the specialist
 * band rather than the middle. The buyer we want — an SMB automating its first
 * workflow — disqualifies itself at a $8,000 entry point and never enquires,
 * and a quote that never happens cannot be negotiated upward.
 */
export const pricing = [
  {
    slug: 'automation-map',
    name: 'Automation Map',
    price: '$1,500',
    priceValue: 1500,
    unit: 'flat',
    duration: '2 weeks',
    summary:
      'We map one workflow end to end and hand you the diagrams and a build plan. The fee is credited if you go ahead with the build.',
    includes: [
      'Interviews with the people doing the work today',
      'A diagram of the current process and where it leaks time',
      'A costed build plan with a recommended sequence',
      'An honest call on whether it is worth automating yet',
    ],
  },
  {
    slug: 'first-system',
    name: 'First System',
    price: '$6,000 – $14,000',
    priceValue: 6000,
    unit: 'fixed scope',
    duration: '3–5 weeks',
    summary:
      'One workflow, built, documented and handed over. Fixed scope and fixed price, so the number does not move while we build.',
    includes: [
      'The system built in visible weekly increments',
      'Monitoring, retries and alerting from day one',
      'Runbooks and diagrams written as we ship',
      '90 days of maintenance after handover, included',
      'Code and accounts in your name, not ours',
    ],
  },
  {
    slug: 'operations-partner',
    name: 'Operations Partner',
    price: 'From $3,500',
    priceValue: 3500,
    unit: 'per month',
    duration: 'Ongoing',
    summary:
      'A standing engagement for teams automating more than one thing. We keep building, keep it running, and stay accountable for uptime.',
    includes: [
      'A rolling backlog of systems, prioritized with you',
      'Maintenance and monitoring of everything we have built',
      'A named engineer who knows your operation',
      'Cancel with 30 days notice — no lock-in',
    ],
  },
];

/**
 * Answer-engine surface. Each answer is written to stand alone if it is lifted
 * out of the page: question in the heading, complete answer in the first sentence.
 */
export const faqs = [
  {
    q: 'How long does it take to automate a workflow?',
    a: 'A single workflow typically takes three to five weeks from kickoff to handover, including the mapping phase. You see working automation in the first two weeks rather than at the end.',
  },
  {
    q: 'Do we own the automation you build?',
    a: 'Yes. Code, accounts and credentials are in your name from the start, and you get runbooks and diagrams written as we ship. The systems keep running if you never speak to us again.',
  },
  {
    q: 'Which tools do you build with?',
    a: 'We build with the tools you already run, connected with custom services where an off-the-shelf connector will not hold up. We use platforms like n8n, Make or Zapier when they genuinely fit, and custom code when reliability matters more than speed of assembly.',
  },
  {
    q: 'When should a business use an AI agent instead of a rule?',
    a: 'Use a rule when the logic can be written down and will not change; use a model only when the task needs judgment a rule cannot express, such as classification, extraction or drafting. Every model call we ship is wrapped in guardrails, logging and human review.',
  },
  {
    q: 'Where are your clients based?',
    a: 'Everywhere. The work is remote and asynchronous by nature — we map workflows over a call, then build and hand over. We schedule calls to your time zone and keep overlapping hours with most of them. Pricing is quoted in USD.',
  },
];
