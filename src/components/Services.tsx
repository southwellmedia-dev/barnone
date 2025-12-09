import React from "react";
import { HardHat, Check } from "lucide-react";
import p13 from "../assets/photos/13.png?url";
import p14 from "../assets/photos/14.png?url";
import p15 from "../assets/photos/15.png?url";
import p3 from "../assets/photos/3.png?url";

export const Services = () => {
  const services = [
    {
      name: "Epoxy Flooring",
      tag: "Best Seller",
      desc: "Durable, versatile, and stunning. Resistant to stains, chemicals, scratches, and abrasion. Ideal for high-traffic areas.",
      image: p13,
      features: ["Heavy Duty", "Showroom Shine", "Custom Colors"],
    },
    {
      name: "Concrete Polishing",
      desc: "Achieve a sleek, modern look. We reveal the natural beauty of aggregate for a smooth, reflective surface.",
      image: p14,
      features: ["Dust Proof", "Low Maintenance", "Reflective"],
    },
    {
      name: "Staining & Sealing",
      desc: "Elevate surfaces with vibrant custom colors or protect with professional sealing to resist wear and tear.",
      image: p15,
      features: ["UV Stable", "Vibrant Tones", "Weather Proof"],
    },
    {
      name: "Crack Repair",
      desc: "Seamlessly repair cracks of all sizes, ensuring your surfaces are both beautiful and structurally sound.",
      image: p3,
      features: ["Structural Bond", "Seamless Finish", "Surface Prep"],
    },
  ];

  return (
    <section
      id="services"
      className="py-24 bg-brand-black text-white relative overflow-hidden"
    >
      {/* Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-brand-red font-tech font-bold mb-2">
              <HardHat size={16} />
              <span>PROFESSIONAL GRADE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading italic uppercase">
              Core Services
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((sys, i) => (
            <div
              key={i}
              className="group bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-brand-red relative overflow-hidden flex flex-col h-full"
            >
              {/* Image Header */}
              <div className="h-48 w-full overflow-hidden relative border-b-4 border-brand-blue">
                <img
                  src={sys.image}
                  alt={sys.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-brand-black/30 group-hover:bg-transparent transition-colors" />
                {sys.tag && (
                  <div className="absolute top-2 right-2 bg-brand-blue text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-lg">
                    {sys.tag}
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-heading italic uppercase mb-3">
                  {sys.name}
                </h3>
                <p className="text-white/70 font-tech text-sm mb-6 leading-relaxed border-b border-white/10 pb-6 flex-1">
                  {sys.desc}
                </p>

                <div className="space-y-3 mt-auto">
                  {sys.features.map((f, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-tech text-white/60 uppercase tracking-wider"
                    >
                      <Check className="w-3 h-3 text-brand-red" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
