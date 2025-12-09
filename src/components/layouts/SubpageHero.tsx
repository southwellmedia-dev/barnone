import React from "react";
import { ChevronRight } from "lucide-react";

interface SubpageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: { label: string; href: string }[];
  backgroundImage?: string;
}

export const SubpageHero: React.FC<SubpageHeroProps> = ({
  title,
  subtitle,
  breadcrumb,
  backgroundImage,
}) => {
  return (
    <section className="relative pt-32 pb-20 min-h-[45vh] flex items-end overflow-hidden bg-brand-black">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-brand-black/70" />
        </div>
      )}

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] z-[1]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6 font-tech text-sm uppercase tracking-widest">
          {breadcrumb.map((item, i) => (
            <React.Fragment key={item.href}>
              <a
                href={item.href}
                className={`transition-colors ${
                  i === breadcrumb.length - 1
                    ? "text-brand-red"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </a>
              {i < breadcrumb.length - 1 && (
                <ChevronRight className="w-4 h-4 text-white/30" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title Block */}
        <div className="relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-red" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading italic uppercase text-white leading-[0.9] tracking-tighter">
            {title}
          </h1>
          {subtitle && (
            <p className="font-tech text-white/60 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-brand-blue to-transparent" />
    </section>
  );
};
