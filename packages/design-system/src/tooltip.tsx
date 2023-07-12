import React from "react";

type TooltipProps = {
  message: string;
  children: React.ReactNode;
};

export default function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-[#0A8AC5] p-2 text-sm text-white font-semibold group-hover:scale-100">
        {message}
      </span>
    </div>
  );
}
