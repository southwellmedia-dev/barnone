import type { APIRoute } from 'astro';

export const prerender = false;

const AETHER_FORM_ENDPOINT = 'https://myaether.cloud/api/forms/submit/InrHlad-yRsZbCdI5DGG5Rcg1723MbFp';
const RECAPTCHA_SECRET_KEY = '6Le9SD4sAAAAAIzThofow_dyUs8e2RD0anqtn8FT';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { data, recaptchaToken } = body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return new Response(JSON.stringify({ success: false, error: 'Missing reCAPTCHA token' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });

    const recaptchaResult = await recaptchaResponse.json();

    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return new Response(JSON.stringify({ success: false, error: 'reCAPTCHA verification failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Forward to Aether (without the token)
    const origin = request.headers.get('origin') || 'http://localhost:4323';

    const response = await fetch(AETHER_FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin,
        'Referer': origin,
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const errorText = await response.text();
      return new Response(JSON.stringify({ success: false, error: errorText }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
