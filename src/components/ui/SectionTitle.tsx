import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = "left",
  dark = false,
}) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
    {subtitle && (
      <div
        className={`flex items-center gap-2 mb-3 text-brand-red font-tech font-bold tracking-[0.2em] uppercase text-sm ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        <div className="w-8 h-1 bg-brand-red" />
        <span>{subtitle}</span>
      </div>
    )}
    <h2
      className={`text-4xl md:text-6xl font-heading italic uppercase tracking-tight leading-none relative inline-block ${
        dark ? "text-white" : "text-foreground"
      }`}
    >
      {title}
    </h2>
  </div>
);
