/**
 * Contact endpoint.
 *
 * Deliberately a plain Vercel Node function rather than an Astro server route:
 * the site stays fully static, and moving to AWS later is a deploy-target change
 * rather than a rewrite. Requires RESEND_API_KEY and CONTACT_TO in the env.
 */

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  company: 160,
  team: 40,
  workflow: 5000,

};

// Best-effort, per-instance throttle. Not a substitute for platform WAF rules,
// but it stops the trivial case of one client hammering the endpoint.
const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip) {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now - record.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  record.count += 1;
  return record.count > MAX_PER_WINDOW;
}

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&', '<': '<', '>': '>', '"': '"', "'": '&#39;' })[char]
  );

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });

  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Try again shortly.' });
  }

  const body =
    typeof req.body === 'string' ? Object.fromEntries(new URLSearchParams(req.body)) : req.body || {};

  // Honeypot: a field no human sees, so anything filling it is a bot. Return 200
  // so the bot believes it succeeded and does not retry with a different shape.
  if (body.company_website) {
    return res.status(200).json({ ok: true });
  }

  const fields = {};
  for (const [key, limit] of Object.entries(MAX_LENGTHS)) {
    fields[key] = String(body[key] ?? '').trim().slice(0, limit);
  }

  if (!fields.name || !fields.email || !fields.workflow) {
    return res.status(400).json({ error: 'Name, email and workflow are required.' });
  }
  if (!isEmail(fields.email)) {
    return res.status(400).json({ error: 'That email address does not look right.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {

    console.error('Contact form is not configured: missing RESEND_API_KEY or CONTACT_TO.');
    return res.status(500).json({ error: 'Contact form is not configured yet.' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Flowzora <hello@flowzora.com>',
        to: [to],
        reply_to: fields.email,
        subject: `New workflow inquiry — ${fields.name}${fields.company ? ` (${fields.company})` : 
''}`,

        html: `
          <h2>New workflow inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
          <p><strong>Company:</strong> ${escapeHtml(fields.company) || '—'}</p>
          <p><strong>Team size:</strong> ${escapeHtml(fields.team) || '—'}</p>
          <hr />
          <p><strong>The workflow:</strong></p>
          <p>${escapeHtml(fields.workflow).replace(/\n/g, '<br />')}</p>
        `,
      }),
    });

    if (!response.ok) {
      console.error('Email provider rejected the message', await response.text());

      return res.status(502).json({ error: 'We could not send that. Please email us directly.' });
    }
  } catch (error) {
    console.error('Contact form failed', error);
    return res.status(502).json({ error: 'We could not send that. Please email us directly.' });
  }

  // Progressive enhancement: a no-JS submit lands on the thank-you page,
  // while fetch-based submits read the JSON.
  const wantsJson = (req.headers.accept || '').includes('application/json');
  if (wantsJson) {
    return res.status(200).json({ ok: true });
  }
  res.setHeader('Location', '/thank-you/');
  return res.status(303).end();
}