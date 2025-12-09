import React from "react";
import { Hammer, Layers, Shield } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

export const Process = () => {
  const steps = [
    {
      id: "01",
      title: "Diamond Prep",
      desc: "We don't just coat; we restore. Full surface diamond grinding and structural crack repair ensures a permanent mechanical bond.",
      icon: Hammer,
    },
    {
      id: "02",
      title: "Base & Broadcast",
      desc: "Application of our industrial-grade epoxy base coat, followed by a full broadcast of functional flake for texture and durability.",
      icon: Layers,
    },
    {
      id: "03",
      title: "Polyaspartic Seal",
      desc: "The final armor. A UV-stable, chemical-resistant Polyaspartic topcoat that cures fast and provides a glass-like finish.",
      icon: Shield,
    },
  ];

  return (
    <section id="process" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle title="Installation Standard" subtitle="The Process" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Step Connector Line */}
              <div className="hidden md:block absolute top-8 left-full w-full h-[2px] bg-border z-0" />

              <div className="relative bg-surface p-8 border border-border shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-2 z-10 h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-brand-blue group-hover:bg-brand-red transition-colors duration-300" />

                <div className="flex justify-between items-start mb-6">
                  <span className="font-heading text-5xl text-border group-hover:text-brand-blue/10 transition-colors italic">
                    {step.id}
                  </span>
                  <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center border border-border group-hover:border-brand-red transition-colors">
                    <step.icon className="w-6 h-6 text-foreground group-hover:text-brand-red transition-colors" />
                  </div>
                </div>

                <h3 className="text-xl font-heading italic uppercase text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="font-tech text-muted leading-relaxed text-sm">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
