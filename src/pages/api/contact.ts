import type { APIRoute } from 'astro';

export const prerender = false;

const AETHER_FORM_ENDPOINT = 'https://myaether.cloud/api/forms/submit/InrHlad-yRsZbCdI5DGG5Rcg1723MbFp';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { data, recaptchaToken } = body;

    // Aether will verify the reCAPTCHA token server-side
    // We just need to include it in the form data
    const formDataWithToken = {
      ...data,
      'g-recaptcha-response': recaptchaToken
    };

    // Forward to Aether with the reCAPTCHA token
    const origin = request.headers.get('origin') || 'http://localhost:4323';

    const response = await fetch(AETHER_FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': origin,
        'Referer': origin,
      },
      body: JSON.stringify({ data: formDataWithToken }),
    });

    if (response.ok) {44
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
