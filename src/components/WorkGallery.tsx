import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Ruler,
  Clock,
  Quote,
  ArrowUpRight,
  Grid3X3,
} from "lucide-react";

interface Project {
  slug: string;
  title: string;
  client?: string;
  location: string;
  category: "residential" | "commercial" | "industrial" | "public";
  service: "epoxy" | "polishing" | "staining" | "repair" | "multiple";
  sqft: string;
  duration: string;
  completedDate: string;
  featured: boolean;
  coverImage: string;
  gallery: string[];
  highlights?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role?: string;
  };
  body?: string;
}

interface WorkGalleryProps {
  projects: Project[];
}

const categoryLabels: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
  public: "Public Works",
};

const serviceLabels: Record<string, string> = {
  epoxy: "Epoxy Flooring",
  polishing: "Concrete Polishing",
  staining: "Staining & Sealing",
  repair: "Crack Repair",
  multiple: "Multiple Services",
};

const categoryColors: Record<string, string> = {
  residential: "bg-brand-blue",
  commercial: "bg-brand-red",
  industrial: "bg-amber-600",
  public: "bg-emerald-600",
};

export const WorkGallery: React.FC<WorkGalleryProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  }, []);

  const nextImage = useCallback(() => {
    if (selectedProject) {
      setActiveImageIndex((prev) =>
        prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
      );
    }
  }, [selectedProject]);

  const prevImage = useCallback(() => {
    if (selectedProject) {
      setActiveImageIndex((prev) =>
        prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
      );
    }
  }, [selectedProject]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") closeProject();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, closeProject, nextImage, prevImage]);

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <span className="font-tech text-muted text-xs uppercase tracking-widest mr-2">
          Filter:
        </span>
        {["all", "residential", "commercial", "public"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 font-tech text-xs uppercase tracking-wider transition-all transform -skew-x-6 ${
              filter === cat
                ? "bg-brand-blue text-white"
                : "bg-surface text-foreground hover:bg-brand-blue/10 border border-border"
            }`}
          >
            <span className="transform skew-x-6 inline-block">
              {cat === "all" ? "All Projects" : categoryLabels[cat]}
            </span>
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <button
            key={project.slug}
            onClick={() => openProject(project)}
            className="group relative overflow-hidden bg-brand-black text-left aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-background"
          >
            {/* Image */}
            <img
              src={project.coverImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Category Badge */}
            <div
              className={`absolute top-4 left-4 ${categoryColors[project.category]} px-3 py-1 transform -skew-x-6`}
            >
              <span className="transform skew-x-6 inline-block font-tech text-white text-[10px] uppercase tracking-widest font-bold">
                {categoryLabels[project.category]}
              </span>
            </div>

            {/* Photo Count Badge */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1 flex items-center gap-1.5">
              <Grid3X3 className="w-3 h-3 text-white/70" />
              <span className="font-tech text-white/90 text-xs">
                {project.gallery.length}
              </span>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Service Tag */}
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-brand-blue group-hover:w-12 transition-all duration-300" />
                <span className="font-tech text-brand-blue text-[10px] uppercase tracking-widest font-bold">
                  {serviceLabels[project.service]}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl italic uppercase text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                {project.title}
              </h3>

              {/* Location & Details */}
              <div className="flex items-center gap-4 text-white/60 font-tech text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3 h-3" />
                  {project.sqft} sq ft
                </div>
              </div>

              {/* View Project Indicator */}
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-brand-red flex items-center justify-center transform -skew-x-6 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 text-white transform skew-x-6" />
              </div>
            </div>

            {/* Hover Border */}
            <div className="absolute inset-0 border-4 border-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        ))}
      </div>

      {/* Project Modal - Rendered via Portal to escape stacking context */}
      {selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={(e) => e.target === e.currentTarget && closeProject()}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-brand-black/95 backdrop-blur-md" onClick={closeProject} />

            {/* Modal Container */}
            <div className="relative bg-background w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-modalIn">
              {/* Top Accent Bar */}
              <div className="h-1 bg-gradient-to-r from-brand-red via-brand-blue to-transparent flex-shrink-0" />

              {/* Close Button */}
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-brand-black/80 hover:bg-brand-red flex items-center justify-center transition-colors transform -skew-x-6"
              >
                <X className="w-5 h-5 text-white transform skew-x-6" />
              </button>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1">
                {/* Image Gallery Section */}
                <div className="relative bg-brand-black">
                  {/* Main Image */}
                  <div className="relative aspect-video">
                    <img
                      src={selectedProject.gallery[activeImageIndex]}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-brand-blue backdrop-blur-sm flex items-center justify-center transition-colors transform -skew-x-6"
                        >
                          <ChevronLeft className="w-5 h-5 text-white transform skew-x-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-brand-blue backdrop-blur-sm flex items-center justify-center transition-colors transform -skew-x-6"
                        >
                          <ChevronRight className="w-5 h-5 text-white transform skew-x-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4 bg-brand-black/80 backdrop-blur-sm px-3 py-1.5 transform -skew-x-6">
                      <span className="transform skew-x-6 inline-block font-tech text-white text-sm">
                        <span className="text-brand-blue font-bold">{activeImageIndex + 1}</span>
                        <span className="text-white/40 mx-1">/</span>
                        <span className="text-white/60">{selectedProject.gallery.length}</span>
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 ${categoryColors[selectedProject.category]} px-3 py-1.5 transform -skew-x-6`}>
                      <span className="transform skew-x-6 inline-block font-tech text-white text-xs uppercase tracking-widest font-bold">
                        {categoryLabels[selectedProject.category]}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {selectedProject.gallery.length > 1 && (
                    <div className="flex gap-1 p-2 bg-brand-black overflow-x-auto scrollbar-hide">
                      {selectedProject.gallery.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`flex-shrink-0 w-16 h-12 overflow-hidden transition-all ${
                            idx === activeImageIndex
                              ? "ring-2 ring-brand-blue opacity-100"
                              : "opacity-40 hover:opacity-70"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-8">
                  {/* Title & Service */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-1 bg-brand-blue" />
                      <span className="font-tech text-brand-blue font-bold uppercase tracking-widest text-xs">
                        {serviceLabels[selectedProject.service]}
                      </span>
                    </div>
                    <h2 className="font-heading text-3xl sm:text-4xl italic uppercase text-foreground leading-[0.9]">
                      {selectedProject.title}
                    </h2>
                  </div>

                  {/* Quick Stats Row */}
                  <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-border">
                    <div className="flex items-center gap-2 text-muted">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                      <span className="font-tech text-sm">{selectedProject.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Ruler className="w-4 h-4 text-brand-blue" />
                      <span className="font-tech text-sm">{selectedProject.sqft} sq ft</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Clock className="w-4 h-4 text-brand-blue" />
                      <span className="font-tech text-sm">{selectedProject.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted">
                      <Calendar className="w-4 h-4 text-brand-blue" />
                      <span className="font-tech text-sm">{selectedProject.completedDate}</span>
                    </div>
                  </div>

                  {/* Two Column Layout for Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                      {/* Description */}
                      {selectedProject.body && (
                        <div className="mb-6">
                          <h3 className="font-heading text-lg italic uppercase text-foreground mb-3">
                            About This Project
                          </h3>
                          <p className="font-tech text-muted text-sm leading-relaxed">
                            {selectedProject.body}
                          </p>
                        </div>
                      )}

                      {/* Highlights */}
                      {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                        <div>
                          <h3 className="font-heading text-lg italic uppercase text-foreground mb-3">
                            Highlights
                          </h3>
                          <div className="space-y-2">
                            {selectedProject.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-2 font-tech text-muted text-sm">
                                <div className="w-1.5 h-1.5 bg-brand-blue transform rotate-45 mt-1.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column */}
                    <div>
                      {/* Testimonial */}
                      {selectedProject.testimonial && (
                        <div className="bg-surface border-l-4 border-brand-blue p-5 mb-6">
                          <Quote className="w-6 h-6 text-brand-blue/30 mb-3" />
                          <p className="font-tech text-foreground text-sm leading-relaxed mb-3 italic">
                            "{selectedProject.testimonial.quote}"
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-brand-blue flex items-center justify-center transform -skew-x-6">
                              <span className="transform skew-x-6 font-heading text-white text-sm">
                                {selectedProject.testimonial.author.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-tech text-foreground text-sm font-bold">
                                {selectedProject.testimonial.author}
                              </div>
                              {selectedProject.testimonial.role && (
                                <div className="font-tech text-muted text-xs">
                                  {selectedProject.testimonial.role}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="bg-brand-black p-5">
                        <p className="font-tech text-white/60 text-sm mb-3">
                          Want a similar result?
                        </p>
                        <a
                          href="/quote"
                          className="inline-flex items-center gap-2 bg-brand-red text-white px-6 py-3 font-heading italic uppercase text-sm transform -skew-x-6 hover:bg-red-700 transition-colors"
                        >
                          <span className="transform skew-x-6 flex items-center gap-2">
                            Get Free Quote
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modalIn {
          animation: modalIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};
