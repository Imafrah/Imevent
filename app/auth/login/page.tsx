"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Calendar, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
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
    } catch (err: any) {
      const errMsg = err?.message || "An unexpected error occurred. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* Main card container */}
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-2xl border border-neutral-800 p-8 sm:p-10 relative z-10">
        {/* Brand header */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-white mb-2">
            <span className="bg-indigo-500 p-1.5 rounded-lg text-white">
              <Calendar className="h-5 w-5" />
            </span>
            <span>Event<span className="text-indigo-500">Hub</span></span>
          </Link>
          <p className="text-neutral-400 text-sm text-center">
            Sign in to your account to manage your tickets
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="flex items-start space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 animate-in fade-in duration-200">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Mail className="h-5 w-5" />
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300">
                Password
              </label>
              <Link href="/auth/forgot" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Lock className="h-5 w-5" />
              </span>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-600/50 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer sign up redirection link */}
        <div className="mt-8 pt-6 border-t border-neutral-800 text-center text-sm">
          <span className="text-neutral-400">Don't have an account? </span>
          <Link href="/auth/signup" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
