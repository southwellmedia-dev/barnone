import React from "react";

export const GridBackground: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Architectural Grid Background */}
    <div
      className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
      style={{
        backgroundImage: `linear-gradient(var(--brand-blue) 1px, transparent 1px), linear-gradient(to right, var(--brand-blue) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }}
    ></div>
    {/* Corner Markers */}
    <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-border" />
    <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-border" />
  </div>
);
