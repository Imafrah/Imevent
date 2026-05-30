import Link from "next/link";
import { ArrowRight, HelpCircle, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#0a0a0a] px-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-[#1a1a1a] border border-neutral-850 rounded-2xl p-8 sm:p-10 shadow-2xl text-center relative z-10">
        <div className="bg-indigo-650/10 border border-indigo-500/20 text-indigo-400 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
          <HelpCircle className="h-8 w-8 animate-bounce" />
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 font-mono bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
          Error 404
        </span>

        <h1 className="text-3xl font-extrabold text-white mt-6 mb-3">Page Not Found</h1>
        <p className="text-neutral-400 text-sm mb-8 font-light leading-relaxed">
          The requested URL does not exist or has been relocated. Let's return to the events catalog to find what you need.
        </p>

        <Link
          href="/events"
          className="w-full flex items-center justify-center space-x-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 cursor-pointer text-sm"
        >
          <Calendar className="h-4.5 w-4.5" />
          <span>Browse Events</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
