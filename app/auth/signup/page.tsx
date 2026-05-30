"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Calendar, User, Mail, Lock, AlertCircle, CheckCircle2, ArrowRight, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        toast.error(signUpError.message);
        setLoading(false);
        return;
      }

      toast.success("Account created! Please verify your email. ✉️");
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-[#060606] hairline-grid px-4 py-16 relative overflow-hidden font-mono">
      {/* Neo-brutalist Ambient Glow Blobs */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#5f5af6]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[#dffe00]/5 blur-[120px] pointer-events-none" />

      {/* Main card container (Brutalist High-Contrast Box) */}
      <div className="w-full max-w-md bg-[#0d0d0e] border-2 border-zinc-800 text-white shadow-[8px_8px_0px_#dffe00] hover:shadow-[10px_10px_0px_#5f5af6] p-8 sm:p-10 relative z-10 transition-all duration-300 rounded-none">
        
        {/* Dynamic Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dffe00] to-[#5f5af6]" />

        {/* Success screen */}
        {success ? (
          <div className="text-center py-6 animate-in zoom-in duration-300">
            <div className="inline-flex items-center justify-center p-4 border-2 border-[#dffe00] bg-[#dffe00]/10 text-[#dffe00] mb-6 shadow-[4px_4px_0px_#5f5af6]">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-syne uppercase tracking-tight text-white mb-3">Check your inbox</h3>
            <p className="text-zinc-400 text-xs uppercase tracking-wider leading-relaxed max-w-xs mx-auto mb-8">
              We have dispatched a secure authentication key to <span className="text-[#dffe00] font-bold break-all">{email}</span>. Open the link to authorize entry.
            </p>
            <Link
              href="/auth/login"
              className="inline-flex items-center space-x-2 bg-[#5f5af6] hover:bg-[#4b46d5] text-white border-2 border-black px-5 py-3 text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_#dffe00] hover:shadow-[5px_5px_0px_#dffe00] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <span>Back to Gate</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Top Status Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center space-x-1.5 bg-[#dffe00]/10 border border-[#dffe00]/30 text-[#dffe00] text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Account Registration</span>
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
                Create your global credentials to unlock premium events
              </p>
            </div>

            {/* Error notification */}
            {error && (
              <div className="flex items-start space-x-2 bg-red-500/10 border-2 border-red-500/40 text-red-400 text-xs p-4 rounded-none mb-6 animate-in fade-in duration-200">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                <div className="flex flex-col text-left">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-red-500">Registration Error:</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Full Account Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <User className="h-4.5 w-4.5" />
                  </span>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 bg-[#060606] border-2 border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#5f5af6] focus:ring-0 transition-colors text-sm rounded-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Secure Email Address
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
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-[#060606] border-2 border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#5f5af6] focus:ring-0 transition-colors text-sm rounded-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
                  Access Password
                </label>
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
                    className="w-full pl-11 pr-4 py-3 bg-[#060606] border-2 border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#5f5af6] focus:ring-0 transition-colors text-sm rounded-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5f5af6] hover:bg-[#4b46d5] disabled:bg-[#5f5af6]/50 text-white font-extrabold py-3.5 px-4 rounded-none transition-all duration-200 border-2 border-black flex items-center justify-center space-x-2 shadow-[4px_4px_0px_#dffe00] hover:shadow-[6px_6px_0px_#dffe00] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 cursor-pointer disabled:cursor-not-allowed uppercase text-xs tracking-widest font-mono"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Request Credentials</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Footer sign in redirection link */}
            <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center text-xs">
              <span className="text-zinc-500 uppercase tracking-wide">Have credentials? </span>
              <Link href="/auth/login" className="font-bold text-[#dffe00] hover:text-white underline underline-offset-4 decoration-[#5f5af6] decoration-2 transition-all uppercase tracking-wide">
                Authorize Session
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
