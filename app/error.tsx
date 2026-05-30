"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring services
    console.error("ErrorBoundary captured exception:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#0a0a0a] px-4">
      <div className="max-w-md w-full bg-[#1a1a1a] border border-neutral-850 rounded-2xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
        {/* Glowing backdrop */}
        <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-red-500/5 blur-[40px] pointer-events-none" />

        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-3">Something went wrong</h2>
        <p className="text-neutral-400 text-sm mb-8 font-light leading-relaxed">
          An unexpected error occurred during execution. Our engineering team has been notified. Let's try reloading or returning home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center space-x-2 bg-indigo-650 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all cursor-pointer shadow-md shadow-indigo-600/25 border border-indigo-500"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-350 hover:text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all border border-neutral-800 hover:border-neutral-700"
          >
            <Home className="h-4 w-4" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
