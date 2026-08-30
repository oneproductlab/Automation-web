import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import handler from '../api/contact.js';

/**
 * The contact endpoint is the only piece of real logic on an otherwise static
 * site, and it is the one path that handles untrusted input and real leads.
 * These cover the cases that would silently lose an inquiry or let something
 * unpleasant through.
 */

function mockRes() {
  const res = {
    statusCode: null,
    body: null,
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end() {
      return this;
    },
  };
  return res;

}

const validBody = {
  name: 'Dana Reyes',
  email: 'dana@example.com',
  company: 'Northwind Logistics',
  team: '11–50',
  workflow: 'Leads arrive by email and someone retypes them into HubSpot.',
};

beforeEach(() => {
  process.env.RESEND_API_KEY = 'test-key';
  process.env.CONTACT_TO = 'inbox@example.com';
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, text: async () => '' }))
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('contact endpoint', () => {
  it('rejects non-POST requests', async () => {
    const res = mockRes();
    await handler({ method: 'GET', headers: {}, body: {} }, res);
    expect(res.statusCode).toBe(405);
    expect(res.headers.Allow).toBe('POST');
  });

  it('requires name, email and workflow', async () => {
    const res = mockRes();
    await handler({ method: 'POST', headers: {}, body: { name: 'Dana' } }, res);
    expect(res.statusCode).toBe(400);
  });

  it('rejects a malformed email address', async () => {
    const res = mockRes();
    await handler(
      { method: 'POST', headers: {}, body: { ...validBody, email: 'dana@example' } },
      res
    );
    expect(res.statusCode).toBe(400);
  });

  it('accepts a valid submission and sends exactly one message', async () => {
    const res = mockRes();
    await handler(
      { method: 'POST', headers: { accept: 'application/json' }, body: validBody },
      res
    );
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ ok: true });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('silently accepts honeypot submissions without sending mail', async () => {
    const res = mockRes();
    await handler(
      {
        method: 'POST',
        headers: {},

        body: { ...validBody, company_website: 'http://spam.example' },
      },
      res
    );
    // 200 so the bot believes it succeeded and does not retry with a new shape.
    expect(res.statusCode).toBe(200);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('escapes HTML so a submission cannot inject markup into the email', async () => {
    const res = mockRes();
    await handler(
      {
        method: 'POST',
        headers: { accept: 'application/json', 'x-forwarded-for': '203.0.113.9' },
        body: { ...validBody, name: '<script>alert(1)</script>' },
      },
      res
    );
    const sent = JSON.parse(fetch.mock.calls[0][1].body);
    expect(sent.html).not.toContain('<script>');
    expect(sent.html).toContain('<script>');
  });

  it('rate limits repeated submissions from one address', async () => {
    const headers = { accept: 'application/json', 'x-forwarded-for': '198.51.100.7' };
    let last;
    for (let i = 0; i < 7; i += 1) {
      last = mockRes();
      await handler({ method: 'POST', headers, body: validBody }, last);
    }
    expect(last.statusCode).toBe(429);

  });

  it('fails loudly rather than silently when not configured', async () => {
    delete process.env.RESEND_API_KEY;
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const res = mockRes();
    await handler(
      { method: 'POST', headers: { accept: 'application/json' }, body: validBody },
      res
    );
    expect(res.statusCode).toBe(500);
  });

  it('redirects a no-JS submission to the thank-you page', async () => {
    const res = mockRes();
    await handler(
      { method: 'POST', headers: { 'x-forwarded-for': '192.0.2.44' }, body: validBody },
      res
    );
    expect(res.statusCode).toBe(303);
    expect(res.headers.Location).toBe('/thank-you/');
  });
});