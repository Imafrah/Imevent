"use client";

import { useState } from "react";
import Link from "next/link";
import { registerForEvent } from "@/app/events/[id]/actions";
import { Ticket, LogIn, CheckCircle2, AlertCircle, Info, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface RegistrationCardProps {
  eventId: string;
  userLoggedIn: boolean;
  alreadyRegistered: boolean;
  registeredCount: number;
  capacity: number;
}

export default function RegistrationCard({
  eventId,
  userLoggedIn,
  alreadyRegistered: initialAlreadyRegistered,
  registeredCount: initialRegisteredCount,
  capacity,
}: RegistrationCardProps) {
  const [loading, setLoading] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(initialAlreadyRegistered);
  const [registeredCount, setRegisteredCount] = useState(initialRegisteredCount);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const remainingSpots = Math.max(0, capacity - registeredCount);
  const isFull = remainingSpots <= 0;

  const handleRegister = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const result = await registerForEvent(eventId);
      if (result.success) {
        setSuccess(result.message);
        setAlreadyRegistered(true);
        setRegisteredCount((prev) => prev + 1);
        toast.success("You're registered! 🎉");
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err: any) {
      const errMsg = err?.message || "Something went wrong. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-850 rounded-none p-6 sm:p-8 shadow-brutalist-zinc hover:border-[#dffe00] transition-colors relative overflow-hidden shrink-0 w-full font-mono">
      {/* Brutalist Wavy Accent Ring */}
      <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#5f5af6]/5 blur-[40px] pointer-events-none" />

      <h3 className="text-md font-bold text-white mb-6 uppercase tracking-wider flex items-center space-x-2.5 font-syne">
        <Ticket className="h-5 w-5 text-[#dffe00]" />
        <span>Admission Registration</span>
      </h3>

      {/* Spots Remaining Indicator - High Contrast Block */}
      <div className="bg-[#060606] border border-zinc-850 rounded-none p-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Pass Availability</span>
          <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 border border-black shadow-[1.5px_1.5px_0px_#000] ${
            isFull
              ? "bg-red-500/20 text-red-400"
              : remainingSpots < 10
              ? "bg-amber-500/20 text-amber-400"
              : "bg-[#dffe00] text-black"
          }`}>
            {isFull ? "Sold Out" : remainingSpots < 10 ? "Filling Fast" : "Available"}
          </span>
        </div>
        
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-black text-white font-syne">
            {remainingSpots}
          </span>
          <span className="text-zinc-500 text-xs uppercase tracking-wider">/ {capacity} spots left</span>
        </div>

        {/* High-Contrast Dual Progress Bar */}
        <div className="w-full bg-zinc-900 h-2.5 rounded-none mt-5 overflow-hidden border border-zinc-850">
          <div
            className="h-full bg-[#5f5af6] transition-all duration-700 ease-out"
            style={{ width: `${Math.min(100, (registeredCount / capacity) * 100)}%` }}
          />
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start space-x-2 bg-red-950/20 border border-red-900/40 text-red-400 text-xs p-4 rounded-none mb-6 animate-in fade-in duration-150">
          <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start space-x-2 bg-emerald-950/20 border border-emerald-900/40 text-emerald-400 text-xs p-4 rounded-none mb-6 animate-in fade-in duration-150">
          <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Interactive Registration States - Brutalist Solid Buttons */}
      {!userLoggedIn ? (
        <Link
          href="/auth/login"
          className="w-full flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-[#5f5af6] text-white hover:text-black font-extrabold py-4 px-4 rounded-none transition-all duration-200 border border-zinc-800 hover:border-black shadow-brutalist hover:shadow-brutalist-lime hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none text-xs uppercase tracking-wider text-center"
        >
          <LogIn className="h-4.5 w-4.5" />
          <span>Sign in to Register</span>
        </Link>
      ) : alreadyRegistered ? (
        <div className="space-y-4">
          <div className="w-full flex items-center justify-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold py-4 px-4 rounded-none text-xs uppercase tracking-wider">
            <CheckCircle2 className="h-5 w-5" />
            <span>Registration Confirmed ✓</span>
          </div>
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center space-x-2 bg-[#5f5af6]/10 hover:bg-[#5f5af6]/20 text-[#dffe00] border border-[#5f5af6]/20 hover:border-[#5f5af6]/40 font-extrabold py-4.5 px-4 rounded-none transition-all duration-200 text-xs uppercase tracking-wider"
          >
            <span>View Tickets Dashboard</span>
          </Link>
        </div>
      ) : isFull ? (
        <button
          disabled
          className="w-full bg-zinc-900 text-zinc-600 font-bold py-4 px-4 rounded-none border border-zinc-850 text-xs uppercase tracking-wider cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <span>Catalog Full</span>
        </button>
      ) : (
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-[#dffe00] hover:bg-[#c9e500] text-black font-extrabold py-4.5 px-4 rounded-none transition-all duration-200 border-2 border-black shadow-brutalist-indigo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#5f5af6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer disabled:cursor-not-allowed text-xs uppercase tracking-wider flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4.5 w-4.5 text-black" />
              <span>Register Now</span>
            </>
          )}
        </button>
      )}

      {/* Helpful context details */}
      <div className="flex items-start space-x-2.5 mt-6 pt-5 border-t border-zinc-900 text-[10px] text-zinc-550 leading-relaxed font-sans font-light">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-zinc-650" />
        <span>Admission passes are issued digitally as dynamic, secure transaction keys. Protect your unique admission pass QR. Sharing is prohibited. Admission subject to entry parameters.</span>
      </div>
    </div>
  );
}
