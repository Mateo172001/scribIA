import React from "react";

interface BaseProps {
  children: React.ReactNode;
}

function Base({ children }: BaseProps) {
  return (
    <div className="w-100 min-h-dvh p-6 m-auto max-w-6xl">
      {children}
    </div>
  );
}

export default Base;
