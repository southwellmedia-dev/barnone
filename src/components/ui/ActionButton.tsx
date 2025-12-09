import React from "react";
import { ChevronRight } from "lucide-react";

interface ActionButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  href,
}) => {
  const isPrimary = variant === "primary";
  const Component = href ? "a" : "button";

  const baseClasses =
    "relative group overflow-hidden px-8 py-4 font-heading uppercase tracking-wider italic text-lg transform skew-x-[-12deg] transition-all duration-200 border-2 inline-flex items-center justify-center";

  const primaryClasses =
    "bg-brand-blue text-white border-brand-blue shadow-lg shadow-blue-500/20";
  const secondaryClasses =
    "bg-transparent text-foreground border-foreground hover:text-white";

  return (
    <Component
      onClick={onClick}
      href={href}
      className={`${baseClasses} ${
        isPrimary ? primaryClasses : secondaryClasses
      } ${className}`}
    >
      {/* Hover Effect: Sliding Red Panel */}
      <div
        className={`
        absolute inset-0 bg-brand-red transform -translate-x-[101%]
        group-hover:translate-x-0 transition-transform duration-300 ease-out -z-10
      `}
      />

      {/* Text Content (Counter-skewed) */}
      <div className="transform skew-x-[12deg] flex items-center gap-2">
        {children}
        <ChevronRight className="w-5 h-5" />
      </div>
    </Component>
  );
};
