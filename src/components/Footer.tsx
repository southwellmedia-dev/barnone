import React from "react";
import logo from "../assets/SVG/barnone-darkmode.svg?url";
import swmLogo from "../assets/swm-grayscale.svg?url";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export const Footer = () => (
  <footer className="relative bg-brand-black text-white py-12 border-t-8 border-brand-red overflow-hidden">
    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
            <img
              src={logo}
              alt="Bar None Coatings"
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col items-start">
              <span className="font-heading text-white text-2xl uppercase italic leading-none tracking-tighter">
                Bar None
              </span>
              <span className="font-tech text-brand-red text-[10px] tracking-[0.2em] uppercase font-bold whitespace-nowrap">
                Coatings LLC
              </span>
            </div>
          </div>
          <p className="font-tech text-white/60 text-xs tracking-wider max-w-xs mx-auto md:mx-0 leading-relaxed">
            VETERAN OWNED & OPERATED
            <br />
            SERVING TEXAS, OKLAHOMA, ARKANSAS
          </p>
        </div>

        <div className="flex gap-6 items-center">
          <a
            href="https://facebook.com/barnonecoating"
            className="group flex flex-col items-center"
            aria-label="Facebook"
          >
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-[#1877F2] group-hover:border-[#1877F2] transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </div>
          </a>
          <a
            href="#"
            className="group flex flex-col items-center"
            aria-label="Instagram"
          >
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-[#E1306C] group-hover:border-[#E1306C] transition-colors">
              <FaInstagram className="w-5 h-5" />
            </div>
          </a>
          <a
            href="#"
            className="group flex flex-col items-center"
            aria-label="X (Twitter)"
          >
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-brand-black group-hover:border-brand-black transition-colors">
              <FaXTwitter className="w-5 h-5" />
            </div>
          </a>
        </div>

        <div className="text-center md:text-right">
          <span className="font-tech text-[10px] text-white/50 uppercase tracking-widest mb-1 block">
            Direct Line
          </span>
          <a
            href="tel:9729001009"
            className="font-heading text-2xl italic hover:text-brand-red block"
          >
            (972) 900-1009
          </a>
          <a
            href="mailto:barnonecoatingsllc@gmail.com"
            className="font-tech text-xs text-white/60 hover:text-brand-red"
          >
            barnonecoatingsllc@gmail.com
          </a>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-tech text-white/50 uppercase tracking-[0.2em] gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span>Licensed & Insured</span>
          <span className="hidden sm:inline text-white/20">|</span>
          <span>
            © {new Date().getFullYear()} Bar None Coatings LLC
          </span>
        </div>
        <a
          href="https://southwell.media"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-white/80 transition-colors"
        >
          <span>Built by Southwell Media</span>
          <img src={swmLogo} alt="Southwell Media" className="h-4 w-auto opacity-60 grayscale" />
        </a>
      </div>
    </div>
  </footer>
);
