import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { ActionButton } from "./ui/ActionButton";
import truckImage from "../assets/barnone-truck.jpg?url";
import garageFloor from "../assets/photos/12.png?url";
import project1 from "../assets/projects/1/581670581_122220866252109155_5428684718482923517_n.jpg?url";
import project2 from "../assets/projects/2/571114222_122218302566109155_5635964258491913720_n.jpg?url";
import heroBg from "../assets/photos/488642929_122192708912109155_1419170129794126114_n.jpg?url";

const showcaseImages = [
  {
    src: truckImage,
    label: "Bar None Coatings",
    alt: "Bar None Coatings work truck at sunset",
  },
  {
    src: garageFloor,
    label: "Residential",
    alt: "Finished garage floor with flake epoxy",
  },
  {
    src: project1,
    label: "Commercial",
    alt: "Commercial floor coating project",
  },
  { src: project2, label: "Industrial", alt: "Industrial floor coating" },
];

export const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Mobile swipe handlers
  const swipeThreshold = 50;

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -swipeThreshold) {
      // Swiped left - go to next
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % showcaseImages.length);
    } else if (info.offset.x > swipeThreshold) {
      // Swiped right - go to previous
      setDirection(-1);
      setActiveIndex(
        (prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length
      );
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + showcaseImages.length) % showcaseImages.length
    );
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % showcaseImages.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

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

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Column: Typography */}
        <div className="flex flex-col items-start">
          {/* Badge */}
          <div className="flex items-center gap-3 mb-8 bg-background px-4 py-2 border border-border shadow-sm rounded-sm transform -skew-x-6">
            <Award className="text-brand-red transform skew-x-6" size={20} />
            <span className="text-foreground font-tech font-bold tracking-widest text-xs uppercase transform skew-x-6">
              Veteran Owned & Operated
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading italic uppercase text-foreground leading-[0.9] tracking-tighter mb-8">
            The Standard. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-600">
              Bar None.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted font-tech leading-relaxed max-w-lg mb-10 border-l-4 border-brand-red pl-6">
            Industrial-grade Epoxy & Polyaspartic concrete coatings. Engineered
            for extreme durability in garages, warehouses, and commercial
            facilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <ActionButton href="/quote" className="!w-full sm:!w-auto">
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
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 w-full border-t border-border pt-8">
            <div>
              <h4 className="font-heading text-2xl sm:text-3xl text-foreground">
                5-Star
              </h4>
              <p className="font-tech text-xs text-muted uppercase tracking-wider">
                Rated
              </p>
            </div>
            <div>
              <h4 className="font-heading text-2xl sm:text-3xl text-foreground">
                Licensed
              </h4>
              <p className="font-tech text-xs text-muted uppercase tracking-wider">
                & Insured
              </p>
            </div>
            <div>
              <h4 className="font-heading text-2xl sm:text-3xl text-foreground">
                Serving
              </h4>
              <p className="font-tech text-xs text-muted uppercase tracking-wider">
                TX, OK & AR
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Carousel - visible on small screens */}
        <div className="relative lg:hidden w-full mt-8">
          {/* Carousel Container */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-br from-brand-red/10 via-transparent to-brand-blue/10 rounded-lg blur-2xl pointer-events-none" />

            {/* Image container */}
            <div className="relative w-full h-full bg-background p-2 border border-border/50 rounded-sm shadow-xl">
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-10 h-10 border-l-4 border-t-4 border-brand-red rounded-tl-sm z-10" />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 border-r-4 border-b-4 border-brand-red rounded-br-sm z-10" />

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-2 cursor-grab active:cursor-grabbing"
                >
                  <img
                    src={showcaseImages[activeIndex].src}
                    alt={showcaseImages[activeIndex].alt}
                    className="w-full h-full object-cover rounded-sm"
                    draggable={false}
                  />

                  {/* Label badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-sm bg-brand-red/90 text-white text-xs font-tech uppercase tracking-wider backdrop-blur-sm">
                    {showcaseImages[activeIndex].label}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {showcaseImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${
                    index === activeIndex
                      ? "w-6 bg-brand-red"
                      : "bg-border hover:bg-muted"
                  }
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint */}
          <p className="text-center text-xs font-tech text-muted uppercase tracking-widest mt-3 opacity-60">
            Swipe to explore
          </p>
        </div>

        {/* Desktop: Stacked Card Deck - hidden on mobile */}
        <div className="relative hidden lg:flex items-center justify-center h-[600px] w-full">
          {/* Subtle glow effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[400px] h-[400px] bg-gradient-to-br from-brand-red/15 via-transparent to-brand-blue/15 rounded-full blur-3xl" />
          </div>

          {/* Card Stack Container */}
          <div
            className="relative w-[520px] h-[400px] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {showcaseImages.map((image, index) => {
              // Calculate position in stack relative to active card
              const relativeIndex =
                (index - activeIndex + showcaseImages.length) %
                showcaseImages.length;

              // Fan-out positions when hovered
              const fanOutTransforms = [
                { x: 0, y: 0, rotate: 0 }, // Front card
                { x: 180, y: -30, rotate: 6 }, // Right
                { x: 130, y: 160, rotate: 3 }, // Bottom right
                { x: -80, y: 120, rotate: -4 }, // Bottom left
              ];

              // Stacked positions when not hovered
              const stackedTransforms = [
                { x: 0, y: 0, rotate: 0 },
                { x: 8, y: 8, rotate: 1 },
                { x: 16, y: 16, rotate: 2 },
                { x: 24, y: 24, rotate: 3 },
              ];

              const transform = isHovered
                ? fanOutTransforms[relativeIndex]
                : stackedTransforms[relativeIndex];

              const zIndex = showcaseImages.length - relativeIndex;
              const isTopCard = relativeIndex === 0;

              return (
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className="absolute top-0 left-0 w-full h-full transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${transform.x}px) translateY(${transform.y}px) rotate(${transform.rotate}deg)`,
                    zIndex,
                  }}
                >
                  <div
                    className={`
                      relative w-full h-full bg-background p-2 rounded-sm border shadow-2xl
                      transition-all duration-300
                      ${isTopCard ? "border-brand-red/50" : "border-border/50"}
                      ${
                        !isTopCard && isHovered
                          ? "hover:scale-105 hover:shadow-brand-red/20 hover:border-brand-red/30"
                          : ""
                      }
                    `}
                  >
                    {/* Corner accents on top card */}
                    {isTopCard && (
                      <>
                        <div className="absolute -top-1 -left-1 w-12 h-12 border-l-4 border-t-4 border-brand-red rounded-tl-sm transition-all duration-300" />
                        <div className="absolute -bottom-1 -right-1 w-12 h-12 border-r-4 border-b-4 border-brand-red rounded-br-sm transition-all duration-300" />
                      </>
                    )}

                    {/* Image */}
                    <div className="w-full h-full overflow-hidden rounded-sm">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={`
                          w-full h-full object-cover transition-transform duration-700
                          ${isTopCard ? "scale-100" : "scale-105"}
                        `}
                      />
                    </div>

                    {/* Label badge */}
                    <div
                      className={`
                        absolute bottom-3 right-3 px-3 py-1.5 rounded-sm text-white text-xs font-tech uppercase tracking-wider
                        transition-all duration-300 backdrop-blur-sm
                        ${isTopCard ? "bg-brand-red/90" : "bg-zinc-900/80"}
                      `}
                    >
                      {image.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hint text */}
          <p
            className={`
              absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-tech text-muted uppercase tracking-widest
              transition-opacity duration-300
              ${isHovered ? "opacity-0" : "opacity-60"}
            `}
          >
            Hover to explore
          </p>
        </div>
      </div>
    </section>
  );
};
