import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Award, ChevronDown } from "lucide-react";
import { ThemeToggle } from "./ui/ThemeToggle";
import logo from "../assets/barnone-lightmode.svg?url";
import logoDark from "../assets/barnone-darkmode.svg?url";

interface NavLinkItem {
  label: string;
  href: string;
}

interface NavLinkWithDropdown {
  label: string;
  href: string;
  dropdown?: NavLinkItem[];
}

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    setIsDark(document.documentElement.classList.contains("dark"));

    // Close dropdown on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks: NavLinkWithDropdown[] = [
    { label: "About", href: "/about" },
    {
      label: "Services",
      href: "/#services",
      dropdown: [
        { label: "Epoxy Flooring", href: "/services/epoxy-flooring" },
        { label: "Concrete Polishing", href: "/services/concrete-polishing" },
        { label: "Staining & Sealing", href: "/services/staining-sealing" },
        { label: "Crack Repair", href: "/services/crack-repair" },
      ],
    },
    { label: "Our Work", href: "/work" },
    { label: "Process", href: "/#process" },
  ];

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-lg py-2 border-b border-border/50"
          : "bg-white dark:bg-zinc-900 py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <img
            src={isDark ? logoDark : logo}
            alt="Bar None Coatings"
            className="h-12 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-heading text-foreground text-2xl uppercase italic leading-none tracking-tighter">
              Bar None
            </span>
            <span className="font-tech text-brand-red text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
              Coatings LLC
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6" ref={dropdownRef}>
          <div className="hidden 2xl:flex items-center gap-2 text-foreground font-tech text-[10px] font-bold uppercase tracking-widest border-r border-border pr-5">
            <Award size={14} className="text-brand-red flex-shrink-0" />
            <span className="whitespace-nowrap">Veteran Owned</span>
          </div>

          {navLinks.map((item) => (
            <div
              key={item.label}
              className="relative flex items-center"
              onMouseEnter={() => item.dropdown ? setActiveDropdown(item.label) : setActiveDropdown(null)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {item.dropdown ? (
                // Item with dropdown
                <button
                  onClick={() => handleDropdownToggle(item.label)}
                  className="font-tech uppercase text-foreground font-semibold tracking-wider text-xs hover:text-brand-red transition-colors relative group flex items-center gap-1 whitespace-nowrap leading-none py-2"
                >
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all group-hover:w-full" />
                </button>
              ) : (
                // Regular link
                <a
                  href={item.href}
                  className="font-tech uppercase text-foreground font-semibold tracking-wider text-xs hover:text-brand-red transition-colors relative group whitespace-nowrap leading-none py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all group-hover:w-full" />
                </a>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && activeDropdown === item.label && (
                <div
                  className="absolute top-full left-0 pt-1 min-w-[220px]"
                >
                  <div className="bg-background border border-border shadow-xl">
                    {/* Top accent */}
                    <div className="h-1 bg-brand-blue" />
                    <div className="py-2">
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.label}
                          href={dropItem.href}
                          className="flex items-center gap-3 px-5 py-3 font-tech text-sm text-foreground hover:bg-surface hover:text-brand-red transition-colors group"
                        >
                          <div className="w-1.5 h-1.5 bg-brand-blue transform rotate-45 group-hover:bg-brand-red transition-colors" />
                          {dropItem.label}
                        </a>
                      ))}
                    </div>
                    {/* View all link */}
                    <a
                      href={item.href}
                      className="block px-5 py-3 font-tech text-xs uppercase tracking-widest text-muted hover:text-brand-red border-t border-border transition-colors"
                    >
                      View All Services →
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          <ThemeToggle />

          <a
            href="tel:9729001009"
            className="hidden xl:flex px-5 py-2.5 bg-brand-blue text-white font-tech uppercase text-xs font-bold tracking-wider transform -skew-x-12 hover:bg-blue-700 transition-colors items-center gap-2 shadow-md whitespace-nowrap"
          >
            <span className="transform skew-x-12 flex items-center gap-2">
              <Phone size={14} />
              (972) 900-1009
            </span>
          </a>

          <a
            href="/quote"
            className="px-5 py-2.5 bg-brand-red text-white font-tech uppercase text-xs font-bold tracking-wider transform -skew-x-12 hover:bg-red-700 transition-colors flex items-center gap-2 shadow-md whitespace-nowrap"
          >
            <span className="transform skew-x-12">Get A Quote</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-t border-border p-6 lg:hidden shadow-xl flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center gap-2 text-foreground font-tech text-sm font-bold uppercase mb-4 border-b border-border pb-4">
            <Award size={16} className="text-brand-red" />
            Veteran Owned & Operated
          </div>

          {navLinks.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                // Mobile dropdown
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="font-heading text-2xl text-foreground uppercase italic flex items-center justify-between w-full py-2"
                  >
                    {item.label}
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 border-l-2 border-brand-blue ml-2 space-y-2 mb-4">
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.label}
                          href={dropItem.href}
                          className="block font-tech text-lg text-muted hover:text-brand-red py-2"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropItem.label}
                        </a>
                      ))}
                      <a
                        href={item.href}
                        className="block font-tech text-sm text-brand-blue hover:text-brand-red py-2 uppercase tracking-wider"
                        onClick={() => setIsOpen(false)}
                      >
                        View All →
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                // Regular mobile link
                <a
                  href={item.href}
                  className="font-heading text-2xl text-foreground uppercase italic block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          <a
            href="/quote"
            className="mt-4 w-full bg-brand-red text-white font-heading italic uppercase py-3 text-center"
          >
            Get A Free Quote
          </a>
        </div>
      )}
    </nav>
  );
};
