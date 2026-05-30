import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import TicketCard from "@/components/TicketCard";
import { Registration, Event } from "@/types";
import { Calendar, Ticket, ArrowRight, AlertCircle } from "lucide-react";

// Mock fallbacks
const MOCK_EVENTS: Record<string, Event> = {
  "1": {
    id: "1",
    title: "Global Tech Summit 2026",
    description: "Join industry pioneers, developers, and visionaries for a three-day intensive summit exploring the future of artificial intelligence.",
    location: "San Francisco, CA",
    date: "2026-10-15T09:00:00Z",
    capacity: 500,
    image_url: "",
    created_at: new Date().toISOString(),
  },
  "3": {
    id: "3",
    title: "Next.js Advanced Bootcamp",
    description: "A hands-on, expert-led coding masterclass deep-diving into partial pre-rendering, server actions, and dynamic route speedups.",
    location: "Remote / Online",
    date: "2026-12-05T13:00:00Z",
    capacity: 100,
    image_url: "",
    created_at: new Date().toISOString(),
  },
};

const MOCK_REGISTRATIONS = (userId: string): Registration[] => [
  {
    id: "reg-demo-summit",
    user_id: userId,
    event_id: "1",
    registered_at: new Date().toISOString(),
    qr_code: "reg-demo-summit-uuid-token-string",
    event: MOCK_EVENTS["1"],
  },
  {
    id: "reg-demo-bootcamp",
    user_id: userId,
    event_id: "3",
    registered_at: new Date().toISOString(),
    qr_code: "reg-demo-bootcamp-uuid-token-string",
    event: MOCK_EVENTS["3"],
  },
];

export const revalidate = 0; // Fresh content

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Get logged in user details
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth/login");
  }

  let registrations: Registration[] = [];
  let usingMockData = false;

  // 2. Fetch registrations joining with event
  try {
    const { data, error } = await supabase
      .from("registrations")
      .select("*, event:events(*)")
      .eq("user_id", user.id)
      .order("registered_at", { ascending: false });

    if (error) {
      console.warn("Could not load registrations, using demo ones", error.message);
      registrations = MOCK_REGISTRATIONS(user.id);
      usingMockData = true;
    } else {
      registrations = data || [];
    }
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    registrations = MOCK_REGISTRATIONS(user.id);
    usingMockData = true;
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-mono">
      {/* Editorial Structural Grid Overlay */}
      <div className="absolute inset-0 hairline-grid opacity-[0.1] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 border-x border-zinc-850 px-4 sm:px-8 pb-10">
        
        {/* Page title - Asymmetrical split cell */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-8 border-b border-zinc-850 pt-8">
          <div>
            <div className="flex items-center space-x-2 text-[#5f5af6] text-xs font-bold uppercase tracking-widest mb-3">
              <Ticket className="h-4 w-4" />
              <span>Personal Ticket Wallet</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-syne uppercase tracking-tight">
              My <span className="text-[#dffe00]">Tickets</span>
            </h1>
          </div>
          
          <div className="text-[10px] text-zinc-400 bg-zinc-950 border border-zinc-850 px-4 py-3.5 shadow-[2px_2px_0px_rgba(255,255,255,0.02)] uppercase tracking-wider">
            Verified Pass Account: <span className="text-white block font-bold mt-1">{user.email}</span>
          </div>
        </div>

        {/* Demo Mode Notice */}
        {usingMockData && (
          <div className="flex items-start space-x-3.5 bg-zinc-950 border border-zinc-850 p-5 rounded-none mb-10 shadow-[3px_3px_0px_#5f5af6]">
            <AlertCircle className="h-5 w-5 text-[#dffe00] shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-400 font-sans leading-relaxed">
              <span className="font-bold text-white uppercase tracking-wider block mb-1 font-mono">Demo Passes Loaded</span>
              These are preview tickets simulated for your convenience. Configure your Supabase schema and credentials to retrieve live registrations.
            </div>
          </div>
        )}

        {/* Dynamic Display */}
        {registrations.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {registrations.map((registration) => (
              <TicketCard key={registration.id} registration={registration} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-950 border border-zinc-850 rounded-none shadow-xl p-8">
            <div className="bg-[#5f5af6]/10 text-[#5f5af6] p-4 border border-[#5f5af6]/20 w-16 h-16 flex items-center justify-center mb-8 mx-auto shadow-inner">
              <Ticket className="h-8 w-8 text-[#dffe00]" />
            </div>
            <h3 className="text-xl font-bold text-white uppercase font-syne mb-3">No Active Tickets</h3>
            <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-10 font-sans leading-relaxed">
              You haven't reserved admission passes for any scheduled events yet. Explore our calendar catalog to book your experiences.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center space-x-2 bg-[#dffe00] hover:bg-[#c9e500] text-black font-extrabold uppercase tracking-wider px-8 py-4.5 border-2 border-black rounded-none transition-all duration-200 shadow-brutalist-indigo hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#5f5af6] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none cursor-pointer text-xs"
            >
              <span>Browse Event Calendar</span>
              <ArrowRight className="h-4 w-4 stroke-[3px]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
