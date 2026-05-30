import { createClient } from "@/lib/supabase/server";
import EventCard from "@/components/EventCard";
import { Event } from "@/types";
import { Calendar, Filter, AlertCircle, Sparkles } from "lucide-react";

// Fallback mock events
const MOCK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Global Tech Summit 2026",
    description: "Join industry pioneers, developers, and visionaries for a three-day intensive summit exploring the future of artificial intelligence, cloud infrastructure, and next-generation web technologies.",
    location: "San Francisco, CA",
    date: "2026-10-15T09:00:00Z",
    capacity: 500,
    image_url: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Vanguard Music Festival",
    description: "An immersive outdoor audio-visual experience featuring world-class electronic music producers, indie rock bands, and multi-dimensional light installations.",
    location: "Austin, TX",
    date: "2026-11-20T17:00:00Z",
    capacity: 2500,
    image_url: "",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Next.js Advanced Bootcamp",
    description: "A hands-on, expert-led coding masterclass deep-diving into partial preregistration, React server actions, streaming rendering, dynamic routing, and edge-native performance strategies.",
    location: "Remote / Online",
    date: "2026-12-05T13:00:00Z",
    capacity: 100,
    image_url: "",
    created_at: new Date().toISOString(),
  },
];

export const revalidate = 0; // Ensure fresh data

export default async function EventsPage() {
  let events: Event[] = [];
  let usingMockData = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.warn("Could not fetch events from database, using mock events:", error.message);
      events = MOCK_EVENTS;
      usingMockData = true;
    } else {
      events = data || [];
      if (events.length === 0) {
        events = MOCK_EVENTS;
        usingMockData = true;
      }
    }
  } catch (err: any) {
    console.error("Supabase client init error:", err);
    events = MOCK_EVENTS;
    usingMockData = true;
  }

  return (
    <div className="min-h-screen bg-[#060606] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-mono">
      {/* Editorial Structural Grid Overlay */}
      <div className="absolute inset-0 hairline-grid opacity-[0.1] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 border-x border-zinc-850 px-4 sm:px-8 pb-10">
        
        {/* Page Header - Asymmetrical structural split */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-10 border-b border-zinc-850 pt-8">
          <div>
            <div className="flex items-center space-x-2 text-[#5f5af6] text-xs font-bold uppercase tracking-widest mb-3">
              <Calendar className="h-4 w-4" />
              <span>Premium Live Calendar</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase font-syne text-white leading-none">
              Explore <span className="text-[#dffe00] hover:underline decoration-[#5f5af6]">Live Events</span>
            </h1>
          </div>

          <div className="flex items-center space-x-3 bg-zinc-950 border border-zinc-850 px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-300 shadow-[2px_2px_0px_rgba(255,255,255,0.02)]">
            <Filter className="h-4 w-4 text-[#dffe00]" />
            <span>Sort: Date Ascending</span>
          </div>
        </div>

        {/* Database connectivity advisory badge if using mock data */}
        {usingMockData && (
          <div className="flex items-start space-x-3.5 bg-zinc-950 border border-zinc-850 p-5 rounded-none mb-14 shadow-[3px_3px_0px_#5f5af6] animate-in fade-in duration-200">
            <AlertCircle className="h-5 w-5 text-[#dffe00] shrink-0 mt-0.5" />
            <div className="text-xs text-zinc-400 font-sans leading-relaxed">
              <span className="font-bold text-white uppercase tracking-wider block mb-1 font-mono">Demo Mode Activated</span>
              We've initialized the dashboard with premium preview events because your database tables aren't populated yet. Connect your Supabase instance to fetch live entries.
            </div>
          </div>
        )}

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-950 border border-zinc-850 rounded-none shadow-xl">
            <Calendar className="h-14 w-14 text-zinc-700 mx-auto mb-5" />
            <h3 className="text-xl font-bold text-white uppercase font-syne mb-2">No Scheduled Events</h3>
            <p className="text-zinc-500 text-xs max-w-sm mx-auto font-sans leading-relaxed">
              We couldn't find any events scheduled for the near future. Check back later or create a new event in the admin dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
