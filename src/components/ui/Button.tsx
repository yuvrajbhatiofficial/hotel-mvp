"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "outline-light" | "outline-dark" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f39419] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-full";

  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary:
      "bg-[#f39419] text-white hover:bg-[#e0820c] shadow-[0_8px_24px_-6px_rgba(243,148,25,0.45)] hover:shadow-[0_12px_28px_-6px_rgba(243,148,25,0.55)] hover:-translate-y-0.5",
    dark: "bg-[#1d1a1c] text-white hover:bg-[#342e32] shadow-sm hover:-translate-y-0.5",
    "outline-light":
      "border border-white/50 text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-[#1d1a1c]",
    "outline-dark":
      "border border-[#1d1a1c]/25 text-[#1d1a1c] bg-transparent hover:bg-[#1d1a1c] hover:text-white",
    ghost: "text-[#1d1a1c] hover:bg-[#fbe7da]/70",
  };

  const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "px-4 py-2 text-xs uppercase tracking-wider",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-sm md:text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
