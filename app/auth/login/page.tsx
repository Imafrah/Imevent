"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Calendar, Lock, Mail, AlertCircle, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        toast.error(signInError.message);
        setLoading(false);
        return;
      }

      toast.success("Welcome back! 🎉");
      router.push("/events");
      router.refresh();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
      setLoading(false);
    }
  };

  // Premium developer autofill helper for easy validation
  const handleQuickFill = (role: "admin" | "user") => {
    if (role === "admin") {
      setEmail("admin@imevent.com");
      setPassword("admin123");
      toast.success("Admin credentials pre-filled!");
    } else {
      setEmail("user@imevent.com");
      setPassword("user123");
      toast.success("User credentials pre-filled!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-[#060606] hairline-grid px-4 py-16 relative overflow-hidden font-mono">
      {/* Neo-brutalist Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#5f5af6]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#dffe00]/5 blur-[120px] pointer-events-none" />

      {/* Main card container (Brutalist High-Contrast Box) */}
      <div className="w-full max-w-md bg-[#0d0d0e] border-2 border-zinc-800 text-white shadow-[8px_8px_0px_#5f5af6] hover:shadow-[10px_10px_0px_#dffe00] p-8 sm:p-10 relative z-10 transition-all duration-300 rounded-none">
        
        {/* Dynamic Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#5f5af6] to-[#dffe00]" />

        {/* Top Status Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center space-x-1.5 bg-[#5f5af6]/10 border border-[#5f5af6]/30 text-[#dffe00] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Secure Access Gate</span>
          </span>
        </div>

        {/* Brand header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tighter text-white mb-3 hover:scale-105 transition-transform group">
            <span className="bg-[#5f5af6] p-2 border border-black rounded-none text-white shadow-[3px_3px_0px_#060606] group-hover:bg-[#dffe00] group-hover:text-black group-hover:shadow-[3px_3px_0px_#5f5af6] transition-all">
              <Calendar className="h-5 w-5" />
            </span>
            <span className="font-syne text-2xl uppercase">
              Event<span className="text-[#5f5af6] group-hover:text-[#dffe00] transition-colors">Hub</span>
            </span>
          </Link>
          <p className="text-zinc-400 text-xs uppercase tracking-wider max-w-[280px]">
            Authenticate to manage tickets and registration credentials
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="flex items-start space-x-2 bg-red-500/10 border-2 border-red-500/40 text-red-400 text-xs p-4 rounded-none mb-6 animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
            <div className="flex flex-col">
              <span className="font-bold uppercase tracking-wider text-[10px] text-red-500">Security Alert:</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@imevent.com"
                className="w-full pl-11 pr-4 py-3 bg-[#060606] border-2 border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#dffe00] focus:ring-0 transition-colors text-sm rounded-none font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300">
                Security Password
              </label>
              <Link href="/auth/forgot" className="text-[10px] font-bold uppercase text-[#5f5af6] hover:text-[#dffe00] transition-colors tracking-wider">
                Forgot pass?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-[#060606] border-2 border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#dffe00] focus:ring-0 transition-colors text-sm rounded-none font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#dffe00] hover:bg-[#c9e500] disabled:bg-[#dffe00]/50 text-black font-extrabold py-3.5 px-4 rounded-none transition-all duration-200 border-2 border-black flex items-center justify-center space-x-2 shadow-[4px_4px_0px_#5f5af6] hover:shadow-[6px_6px_0px_#5f5af6] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 cursor-pointer disabled:cursor-not-allowed uppercase text-xs tracking-widest font-mono"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <span>Establish Session</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Panel for testing/development */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80">
          <div className="flex items-center justify-center space-x-1.5 text-zinc-500 mb-3 text-[10px] font-bold uppercase tracking-widest">
            <KeyRound className="h-3.5 w-3.5 text-[#5f5af6]" />
            <span>Developer Sandbox Quick-Fill</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleQuickFill("admin")}
              type="button"
              className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-[#5f5af6] text-zinc-400 hover:text-white px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Admin Suite
            </button>
            <button
              onClick={() => handleQuickFill("user")}
              type="button"
              className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 hover:border-[#dffe00] text-zinc-400 hover:text-white px-2.5 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Attendee Gate
            </button>
          </div>
        </div>

        {/* Footer sign up redirection link */}
        <div className="mt-6 text-center text-xs">
          <span className="text-zinc-500 uppercase tracking-wide">New user? </span>
          <Link href="/auth/signup" className="font-bold text-[#dffe00] hover:text-white underline underline-offset-4 decoration-[#5f5af6] decoration-2 transition-all uppercase tracking-wide">
            Register Account
          </Link>
        </div>
      </div>
    </div>
  );
}
