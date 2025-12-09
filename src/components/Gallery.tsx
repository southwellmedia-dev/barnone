import React from "react";
import { MapPin, Camera } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";
import { GridBackground } from "./ui/GridBackground";
import p_recent1 from "../assets/photos/579341934_122220866402109155_8017844784342174459_n.jpg?url";
import p_recent2 from "../assets/photos/578987078_122220866264109155_7016178176580204580_n.jpg?url";
import p_recent3 from "../assets/photos/577035156_122220114074109155_3876540980542674317_n.jpg?url";

export const Gallery = () => {
  const projects = [
    {
      title: "Industrial Warehouse",
      location: "Dallas, TX",
      img: p_recent1,
      tag: "Commercial",
    },
    {
      title: "Custom Garage",
      location: "Plano, TX",
      img: p_recent2,
      tag: "Residential",
    },
    {
      title: "Fire Station Bay",
      location: "Elmo, TX",
      img: p_recent3,
      tag: "Public Works",
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-surface relative">
      <GridBackground />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle title="Field Reports" subtitle="Recent Work" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="group relative overflow-hidden shadow-xl bg-brand-black"
            >
              {/* Image */}
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-100"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 via-40% to-transparent" />
              </div>

              {/* Info Card */}
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-[1px] w-8 bg-brand-blue" />
                  <span className="text-brand-blue font-tech text-xs font-bold uppercase tracking-widest">
                    {proj.tag}
                  </span>
                </div>
                <h3 className="text-white font-heading text-2xl italic uppercase mb-1">
                  {proj.title}
                </h3>
                <div className="flex items-center gap-2 text-white/70 font-tech text-sm">
                  <MapPin size={12} />
                  {proj.location}
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-4 border-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://facebook.com/barnonecoating"
            className="inline-flex items-center gap-2 text-foreground font-heading italic uppercase hover:text-brand-blue transition-colors border-b-2 border-brand-blue"
          >
            <Camera size={20} />
            View Full Gallery on Facebook
          </a>
        </div>
      </div>
    </section>
  );
};
