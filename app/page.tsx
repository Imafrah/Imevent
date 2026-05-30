import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, QrCode, Search, Sparkles, Ticket } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative bg-[#060606] font-sans selection:bg-[#dffe00] selection:text-[#060606]">
      {/* Editorial Structural Grid Overlay */}
      <div className="absolute inset-0 hairline-grid opacity-[0.15] pointer-events-none z-0" />

      {/* Hero / Kinetic Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 z-10 max-w-7xl mx-auto flex-grow border-x border-zinc-850">
        
        {/* Playful Floating Badge - Brets Style */}
        <div className="inline-flex items-center space-x-2 bg-zinc-900 border border-zinc-800 text-[#dffe00] text-[10px] uppercase font-bold tracking-widest px-4.5 py-2 rounded-none mb-10 shadow-[2px_2px_0px_#5f5af6] animate-bounce">
          <Sparkles className="h-3 w-3 animate-spin text-[#dffe00]" />
          <span>Next-Gen Event Hub</span>
        </div>

        {/* Studio Dunbar Inspired Oversized Kinetic Title */}
        <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter text-white uppercase leading-[0.85] mb-8 font-syne select-none transition-all duration-700 ease-in-out hover:tracking-normal hover:text-[#dffe00]">
          Discover <br />
          <span className="text-[#5f5af6] hover:text-white transition-colors">Register</span> <br />
          <span className="text-white relative">
            Attend
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#dffe00] -z-10 transform -rotate-1 hidden sm:block" />
          </span>
        </h1>

        {/* Descriptive Modernist Copy */}
        <p className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed font-sans">
          The high-fidelity portal to browse premium conferences, register with real-time seat availability tracking, and collect clean digital passes.
        </p>

        {/* Brutalist Tactile Solid CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto font-mono">
          <Link
            href="/events"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#dffe00] hover:bg-[#c9e500] text-black font-extrabold uppercase tracking-wider px-10 py-5 border-2 border-black rounded-none transition-all duration-200 shadow-brutalist-indigo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#5f5af6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <span>Browse Events</span>
            <ArrowRight className="h-4 w-4 stroke-[3px]" />
          </Link>
          <Link
            href="/auth/signup"
            className="w-full sm:w-auto flex items-center justify-center bg-[#060606] hover:bg-zinc-900 text-white font-bold uppercase tracking-wider px-10 py-5 border-2 border-zinc-800 hover:border-white rounded-none transition-all duration-200 shadow-brutalist hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#dffe00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Create Account
          </Link>
        </div>
      </section>

      {/* Kinetic Scrolling Marquee Ticker - Studio Dunbar Style */}
      <div className="w-full border-y border-zinc-800 bg-[#5f5af6] text-black py-4.5 flex overflow-hidden uppercase font-mono font-black text-sm tracking-widest select-none z-10 relative">
        <div className="flex space-x-12 animate-marquee whitespace-nowrap shrink-0">
          <span>Explore Live Events • </span>
          <span>Register Instantly • </span>
          <span>Supabase Realtime Sync • </span>
          <span>Admission Passes • </span>
          <span>Capacity Trackers • </span>
          <span>Zero Placeholders • </span>
          <span>Explore Live Events • </span>
          <span>Register Instantly • </span>
          <span>Supabase Realtime Sync • </span>
          <span>Admission Passes • </span>
          <span>Capacity Trackers • </span>
          <span>Zero Placeholders • </span>
        </div>
        <div className="flex space-x-12 animate-marquee whitespace-nowrap shrink-0">
          <span>Explore Live Events • </span>
          <span>Register Instantly • </span>
          <span>Supabase Realtime Sync • </span>
          <span>Admission Passes • </span>
          <span>Capacity Trackers • </span>
          <span>Zero Placeholders • </span>
          <span>Explore Live Events • </span>
          <span>Register Instantly • </span>
          <span>Supabase Realtime Sync • </span>
          <span>Admission Passes • </span>
          <span>Capacity Trackers • </span>
          <span>Zero Placeholders • </span>
        </div>
      </div>

      {/* Rumbeke Platse Style Grid Architecture for Features */}
      <section className="relative border-b border-zinc-850 bg-[#060606] z-10 font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 border-x border-zinc-850 divide-y md:divide-y-0 md:divide-x divide-zinc-850">
          
          {/* Feature 1 */}
          <div className="group p-10 hover:bg-zinc-950 transition-colors flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="bg-[#5f5af6]/10 text-[#5f5af6] p-4 border border-[#5f5af6]/20 w-14 h-14 flex items-center justify-center shadow-inner group-hover:bg-[#dffe00] group-hover:text-black group-hover:border-black transition-all duration-300">
                  <Search className="h-6 w-6" />
                </div>
                <span className="text-4xl font-extrabold text-zinc-800 group-hover:text-[#5f5af6] transition-colors">01</span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 font-syne group-hover:text-[#dffe00] transition-colors">
                Instant Search
              </h3>
              <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                Scan through a structured, elegant list of upcoming technology summits, masterclasses, and music events without any delay.
              </p>
            </div>
            <div className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">
              Event Directory
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group p-10 hover:bg-zinc-950 transition-colors flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="bg-[#dffe00]/10 text-[#dffe00] p-4 border border-[#dffe00]/20 w-14 h-14 flex items-center justify-center shadow-inner group-hover:bg-[#5f5af6] group-hover:text-white group-hover:border-black transition-all duration-300">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <span className="text-4xl font-extrabold text-zinc-800 group-hover:text-[#dffe00] transition-colors">02</span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 font-syne group-hover:text-[#dffe00] transition-colors">
                Atomic Registry
              </h3>
              <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                Reserve your tickets safely. Backed by atomic transactions, database operations automatically track real-time seat capacities.
              </p>
            </div>
            <div className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">
              Live Database
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group p-10 hover:bg-zinc-950 transition-colors flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="bg-[#8b5cf6]/10 text-[#8b5cf6] p-4 border border-[#8b5cf6]/20 w-14 h-14 flex items-center justify-center shadow-inner group-hover:bg-[#dffe00] group-hover:text-black group-hover:border-black transition-all duration-300">
                  <QrCode className="h-6 w-6" />
                </div>
                <span className="text-4xl font-extrabold text-zinc-800 group-hover:text-[#8b5cf6] transition-colors">03</span>
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4 font-syne group-hover:text-[#dffe00] transition-colors">
                Digital Wallet
              </h3>
              <p className="text-zinc-400 text-xs font-sans font-light leading-relaxed">
                Collect visual admission tickets formatted with individual high-contrast QR validation blocks ready to scan at check-in.
              </p>
            </div>
            <div className="mt-8 text-[10px] text-zinc-600 uppercase tracking-widest">
              Secure QR Codes
            </div>
          </div>

        </div>
      </section>

      {/* Minimal Grid Footer */}
      <footer className="mt-auto border-t border-zinc-850 bg-[#060606] py-10 px-4 sm:px-6 lg:px-8 z-10 font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-[#5f5af6] p-1 text-white border border-black shadow-[1px_1px_0px_#000]">
              <Calendar className="h-4 w-4" />
            </span>
            <span className="font-syne font-bold text-white uppercase tracking-wider">EventHub</span>
            <span>&copy; {new Date().getFullYear()} — All rights reserved.</span>
          </div>
          <div className="flex space-x-6 text-[10px] uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-[#dffe00] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#dffe00] transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-[#dffe00] transition-colors">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
