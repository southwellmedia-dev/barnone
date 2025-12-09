import React from "react";
import { Phone, Crosshair, ArrowRight } from "lucide-react";
import p_recent4 from "../assets/photos/488642929_122192708912109155_1419170129794126114_n.jpg";

export const Contact = () => {
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
                  Contact HQ
                </h3>
                <p className="font-tech text-muted text-sm mb-6">
                  Ready to upgrade your floors? Contact Nick for a consultation.
                  <br />
                  <span className="text-brand-red font-bold">
                    Licensed & Insured
                  </span>
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

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-foreground"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="group">
                    <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                      Email or Phone
                    </label>
                    <input
                      type="text"
                      className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-foreground"
                      placeholder="Contact Info"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                    Service Needed
                  </label>
                  <select className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-muted">
                    <option>Select Service...</option>
                    <option>Epoxy Flooring (Garage/Residential)</option>
                    <option>Commercial/Industrial Coating</option>
                    <option>Concrete Polishing</option>
                    <option>Staining & Sealing</option>
                    <option>Crack Repair</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block font-tech text-xs font-bold text-foreground uppercase tracking-widest mb-2">
                    Project Details
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-surface border-b-2 border-border p-3 font-tech focus:outline-none focus:border-brand-red focus:bg-background transition-colors text-foreground"
                    placeholder="Location, Approx Sq Footage, Current Condition..."
                  />
                </div>

                <div className="pt-4 flex justify-start">
                  <button
                    type="button"
                    className="bg-brand-red text-white font-heading text-xl italic uppercase px-12 py-4 transform -skew-x-12 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center gap-3"
                  >
                    <span className="transform skew-x-12">Submit Request</span>
                    <ArrowRight className="transform skew-x-12" size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
