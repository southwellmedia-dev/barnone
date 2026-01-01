import React from "react";
import { Award, Star, Shield } from "lucide-react";
import { ActionButton } from "./ui/ActionButton";
import p3 from "../assets/barnone-truck.jpg?url";
import p12 from "../assets/photos/12.png?url";
import heroBg from "../assets/photos/488642929_122192708912109155_1419170129794126114_n.jpg?url";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-surface">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-alt to-surface" />

        {/* Background Image - Washed out */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply dark:mix-blend-soft-light">
          <img
            src={heroBg}
            alt="Background"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply dark:mix-blend-soft-light"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle,_rgba(0,113,189,0.05)_0%,_transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(circle,_rgba(225,30,54,0.03)_0%,_transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(var(--brand-blue) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Typography */}
        <div className="flex flex-col items-start">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-8 bg-background px-4 py-2 border border-border shadow-sm rounded-sm transform -skew-x-6">
            <Award className="text-brand-red transform skew-x-6" size={20} />
            <span className="text-foreground font-tech font-bold tracking-widest text-xs uppercase transform skew-x-6">
              Veteran Owned & Operated
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading italic uppercase text-foreground leading-[0.9] tracking-tighter mb-8">
            The Standard. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">
              Bar None.
            </span>
          </h1>

          <p className="text-xl text-muted font-tech leading-relaxed max-w-lg mb-10 border-l-4 border-brand-red pl-6">
            Industrial-grade Epoxy & Polyaspartic concrete coatings. Engineered
            for extreme durability in garages, warehouses, and commercial
            facilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <ActionButton href="#contact" className="!w-full sm:!w-auto">
              Get Free Quote
            </ActionButton>
            <ActionButton
              variant="secondary"
              href="#gallery"
              className="!w-full sm:!w-auto"
            >
              Our Portfolio
            </ActionButton>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-8 mt-12 w-full border-t border-border pt-8">
            <div>
              <h4 className="font-heading text-3xl text-foreground">5-Star</h4>
              <p className="font-tech text-xs text-muted uppercase tracking-wider">
                Rated
              </p>
            </div>
            <div>
              <h4 className="font-heading text-3xl text-foreground">
                Licensed
              </h4>
              <p className="font-tech text-xs text-muted uppercase tracking-wider">
                & Insured
              </p>
            </div>
            <div>
              <h4 className="font-heading text-3xl text-foreground">Serving</h4>
              <p className="font-tech text-xs text-muted uppercase tracking-wider">
                TX, OK & AR
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Clean, Structured Layout */}
        <div className="relative hidden lg:block h-[600px] w-full">
          {/* Background Graphic */}
          <div className="absolute top-10 right-0 w-[80%] h-[90%] bg-brand-blue transform skew-x-3 rounded-sm" />

          {/* Main Image */}
          <div className="absolute top-0 right-12 w-[75%] h-[80%] bg-background p-2 shadow-2xl transform -skew-x-3">
            <div className="w-full h-full overflow-hidden relative">
              <img
                src={p3}
                alt="Residential"
                className="w-full h-full object-cover transform skew-x-3 scale-110"
              />
              <div className="absolute top-0 right-0 bg-brand-red text-white px-4 py-2 transform skew-x-3 origin-top-right">
                <span className="font-heading italic uppercase text-sm">
                  Residential
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Image - Floating Card */}
          <div className="absolute bottom-12 left-0 w-[50%] h-[40%] bg-background p-2 shadow-2xl transform -skew-x-3 border border-border">
            <div className="w-full h-full overflow-hidden relative">
              <img
                src={p12}
                alt="Commercial"
                className="w-full h-full object-cover transform skew-x-3 scale-110"
              />
              <div className="absolute top-0 right-0 bg-brand-blue text-white px-4 py-2 transform skew-x-3 origin-top-right">
                <span className="font-heading italic uppercase text-sm">
                  Commercial
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
