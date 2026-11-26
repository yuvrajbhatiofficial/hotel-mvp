"use client";

import React from "react";
import { SlidersHorizontal } from "lucide-react";
import { BookingStatus } from "@/types/booking";
import { cn } from "@/lib/utils";

interface DemoStatusPanelProps {
  reference: string;
  currentStatus: BookingStatus;
  onChangeStatus: (status: BookingStatus) => void;
}

const STATUS_OPTIONS: BookingStatus[] = ["Pending", "Confirmed", "Rejected"];

export function DemoStatusPanel({
  reference,
  currentStatus,
  onChangeStatus,
}: DemoStatusPanelProps) {
  return (
    <div className="mt-5 rounded-xl border border-dashed border-[#8a7f83]/45 bg-[#fbe7da]/45 p-4">
      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5c5156]">
        <SlidersHorizontal className="h-3.5 w-3.5 text-[#f39419]" />
        Demo Only — Status Simulation ({reference})
      </div>
      <p className="mt-1 text-xs text-[#5c5156]">
        Simulate how a hotel team updates this locally stored request. Changes
        persist in your browser&apos;s localStorage across refreshes.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((status) => {
          const active = currentStatus === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => onChangeStatus(status)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer border",
                active
                  ? "bg-[#1d1a1c] text-white border-[#1d1a1c]"
                  : "bg-white text-[#5c5156] border-[#1d1a1c]/15 hover:border-[#1d1a1c]/40"
              )}
            >
              Set {status}
            </button>
          );
        })}
      </div>
    </div>
  );
}
