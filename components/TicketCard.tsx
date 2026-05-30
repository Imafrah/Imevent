"use client";

import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Registration } from "@/types";

interface TicketCardProps {
  registration: Registration;
}

export default function TicketCard({ registration }: TicketCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const event = registration.event;

  // Format event date
  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  // Format registration date
  const formatRegDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    if (canvasRef.current && registration.qr_code) {
      QRCode.toCanvas(
        canvasRef.current,
        registration.qr_code,
        {
          width: 140,
          margin: 1.5,
          color: {
            dark: "#060606",
            light: "#ffffff",
          },
        },
        (error) => {
          if (error) console.error("Error generating QR code:", error);
        }
      );
    }
  }, [registration.qr_code]);

  if (!event) return null;

  return (
    <div className="bg-zinc-950 border border-zinc-850 rounded-none flex flex-col md:flex-row items-stretch shadow-[3px_3px_0px_rgba(255,255,255,0.02)] hover:border-[#5f5af6] hover:shadow-brutalist-lime transition-all duration-300 font-mono relative overflow-hidden">
      
      {/* Visual coupon left notched curve (Brets Style) */}
      <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-8 bg-[#060606] rounded-r-full border-y border-r border-zinc-850 hidden md:block" />
      
      {/* Left Ticket Column - Modular Metadata Details */}
      <div className="flex-grow p-6.5 flex flex-col justify-between text-left md:border-r-2 md:border-dashed md:border-zinc-850 relative">
        <div className="space-y-4">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#dffe00] font-black bg-black border border-zinc-800 px-3 py-1.5 shadow-[1.5px_1.5px_0px_#060606]">
              Admission Coupon
            </span>
            <h3 className="text-xl font-bold text-white mt-4.5 leading-tight font-syne uppercase tracking-tight line-clamp-2">
              {event.title}
            </h3>
          </div>

          <div className="space-y-2 text-xs text-zinc-400">
            <div className="flex items-center space-x-2.5">
              <Calendar className="h-4 w-4 text-[#5f5af6] shrink-0" />
              <span className="uppercase">{formatEventDate(event.date)}</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <MapPin className="h-4 w-4 text-purple-400 shrink-0" />
              <span className="truncate uppercase">{event.location}</span>
            </div>
          </div>
        </div>

        <div className="pt-5 mt-6 border-t border-zinc-900 text-[10px] text-zinc-500 uppercase tracking-widest">
          Registered: {formatRegDate(registration.registered_at)}
        </div>
      </div>

      {/* Visual coupon right notched curve */}
      <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-8 bg-[#060606] rounded-l-full border-y border-l border-zinc-850 hidden md:block" />

      {/* Right Column - Perforated high-contrast check cell */}
      <div className="flex flex-col items-center justify-center p-6.5 bg-[#060606] border-t md:border-t-0 border-zinc-850 md:min-w-[210px] shrink-0 relative">
        
        {/* Playful Ticket Wallet Clip Badge */}
        <div className="absolute top-2 right-2 text-[#5f5af6]/25 select-none">
          <Ticket className="h-5 w-5" />
        </div>

        {/* High contrast pure white background QR block */}
        <div className="p-2.5 bg-white border-2 border-black shadow-brutalist shadow-[#5f5af6]">
          <canvas ref={canvasRef} className="bg-white" />
        </div>
        
        <span className="text-[9px] text-zinc-500 font-mono tracking-widest mt-4 uppercase">
          TICKET REF: {registration.id.substring(0, 8)}
        </span>
      </div>
    </div>
  );
}
