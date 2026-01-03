import React, { useState } from "react";
import { Phone, Crosshair, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import p_recent4 from "../assets/photos/488642929_122192708912109155_1419170129794126114_n.jpg";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = '6Le9SD4sAAAAAMVbV3GukJA_MVYdE4W0LSEkLpjY';

export const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const form = e.currentTarget;

    try {
      // Get reCAPTCHA token
      const token = await new Promise<string>((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'CONTACT_FORM' });
            resolve(token);
          } catch (err) {
            reject(err);
          }
        });
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, recaptchaToken: token }),
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch {
      setFormState('error');
      setErrorMessage('Something went wrong. Please call us directly.');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={p_recent4.src}
          alt="Construction Texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-md grayscale" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-background border border-border shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-brand-blue" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Sidebar Info */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h3 className="font-heading text-2xl italic uppercase text-foreground mb-4">
                  Contact Bar None
                </h3>
                <p className="font-tech text-muted text-sm mb-6">
                  Ready to upgrade your floors? Contact Nick for a consultation.
                </p>

                <div className="space-y-4">
                  <a
                    href="tel:9729001009"
                    className="flex items-center gap-3 text-foreground group"
                  >
                    <div className="w-10 h-10 bg-surface flex items-center justify-center group-hover:bg-brand-red transition-colors">
                      <Phone size={18} className="group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-muted tracking-widest">
                        Call or Text
                      </div>
                      <div className="font-heading text-lg italic">
                        (972) 900-1009
                      </div>
                    </div>
                  </a>

                  <a
                    href="mailto:barnonecoatingsllc@gmail.com"
                    className="flex items-center gap-3 text-foreground group"
                  >
                    <div className="w-10 h-10 bg-surface flex items-center justify-center group-hover:bg-brand-red transition-colors">
                      <Crosshair size={18} className="group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase text-muted tracking-widest">
                        Email
                      </div>
                      <div className="font-heading text-sm italic">
                        barnonecoatingsllc@gmail.com
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Referral Bonus Badge */}
              <div className="bg-surface border-2 border-dashed border-brand-red/30 p-6 relative">
                <div className="absolute -top-3 left-4 bg-brand-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                  Referral Bonus
                </div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <span className="font-heading italic text-foreground">
                      Per Job
                    </span>
                    <span className="font-bold text-brand-red">$100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-heading italic text-foreground">
                      Jobs $10k+
                    </span>
                    <span className="font-bold text-brand-red">$150</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted mt-3 leading-tight">
                  Know a fire station or business that needs an upgrade? Send
                  them our way.
                </p>
              </div>

              {/* Licensed & Insured Badge */}
              <div className="flex items-center gap-3 bg-surface border border-border px-4 py-3">
                <div className="w-8 h-8 bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-heading text-sm italic text-foreground">Licensed & Insured</div>
                  <div className="text-[10px] text-muted uppercase tracking-wider">Full Coverage</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2 border-l md:border-l border-border md:pl-12">
              <div className="mb-8">
                <h2 className="text-4xl font-heading italic uppercase text-foreground mb-2">
                  Project Inquiry
                </h2>
                <p className="font-tech text-muted">
                  Tell us about your project. We'll get back to you with an
                  estimate.
                </p>
              </div>

              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="font-heading text-2xl italic uppercase text-foreground mb-2">
                    Request Received!
                  </h3>
                  <p className="font-tech text-muted mb-6">
                    We'll get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="font-tech text-sm text-brand-blue hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        disabled={formState === 'submitting'}
                        className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-foreground disabled:opacity-50"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="group">
                      <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                        Email or Phone
                      </label>
                      <input
                        type="text"
                        name="contact"
                        required
                        disabled={formState === 'submitting'}
                        className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-foreground disabled:opacity-50"
                        placeholder="Contact Info"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      required
                      disabled={formState === 'submitting'}
                      className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-muted disabled:opacity-50"
                    >
                      <option value="">Select Service...</option>
                      <option value="epoxy-residential">Epoxy Flooring (Garage/Residential)</option>
                      <option value="commercial-industrial">Commercial/Industrial Coating</option>
                      <option value="concrete-polishing">Concrete Polishing</option>
                      <option value="staining-sealing">Staining & Sealing</option>
                      <option value="crack-repair">Crack Repair</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                      Project Details
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      disabled={formState === 'submitting'}
                      className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-foreground disabled:opacity-50"
                      placeholder="Location, Approx Sq Footage, Current Condition..."
                    />
                  </div>

                  {formState === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4 text-red-400 font-tech text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-4 flex justify-start">
                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="bg-brand-red text-white font-heading text-xl italic uppercase px-12 py-4 transform -skew-x-12 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <Loader2 className="transform skew-x-12 animate-spin" size={20} />
                          <span className="transform skew-x-12">Sending...</span>
                        </>
                      ) : (
                        <>
                          <span className="transform skew-x-12">Submit Request</span>
                          <ArrowRight className="transform skew-x-12" size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
