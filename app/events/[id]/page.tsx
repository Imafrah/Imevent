import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Event } from "@/types";
import { ArrowLeft, Calendar, MapPin, Users, Sparkles } from "lucide-react";
import RegistrationCard from "@/components/RegistrationCard";

// Mock Fallbacks matching events/page.tsx
const MOCK_EVENTS: Record<string, Event> = {
  "1": {
    id: "1",
    title: "Global Tech Summit 2026",
    description: "Join industry pioneers, developers, and visionaries for a three-day intensive summit exploring the future of artificial intelligence, cloud infrastructure, and next-generation web technologies. The event covers expert-led panel debates, technical bootcamps, interactive labs, and unmatched networking hubs.",
    location: "San Francisco, CA",
    date: "2026-10-15T09:00:00Z",
    capacity: 500,
    image_url: "",
    created_at: new Date().toISOString(),
  },
  "2": {
    id: "2",
    title: "Vanguard Music Festival",
    description: "An immersive outdoor audio-visual experience featuring world-class electronic music producers, indie rock bands, and multi-dimensional light installations. Experience acoustic brilliance, gourmet food trucks, creative workshops, and deep community connections.",
    location: "Austin, TX",
    date: "2026-11-20T17:00:00Z",
    capacity: 2500,
    image_url: "",
    created_at: new Date().toISOString(),
  },
  "3": {
    id: "3",
    title: "Next.js Advanced Bootcamp",
    description: "A hands-on, expert-led coding masterclass deep-diving into partial preregistration, React server actions, streaming rendering, dynamic routing, and edge-native performance strategies. Build scalable production-ready web apps from scratch.",
    location: "Remote / Online",
    date: "2026-12-05T13:00:00Z",
    capacity: 100,
    image_url: "",
    created_at: new Date().toISOString(),
  },
};

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Fresh data is vital

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  let event: Event | null = null;
  let userLoggedIn = false;
  let alreadyRegistered = false;
  let registeredCount = 0;

  const supabase = await createClient();

  // 1. Get logged in user details
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    userLoggedIn = true;
  }

  // 2. Fetch event
  try {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      event = data;
    }
  } catch (err) {
    console.warn("Could not load from real db, checking mocks", err);
  }

  // Fallback to mock data if not found in db
  if (!event) {
    event = MOCK_EVENTS[id] || null;
  }

  if (!event) {
    notFound();
  }

  // 3. Fetch registration status and count
  try {
    // Already registered check
    if (user) {
      const { data: existingReg } = await supabase
        .from("registrations")
        .select("id")
        .eq("user_id", user.id)
        .eq("event_id", id)
        .maybeSingle();

      if (existingReg) {
        alreadyRegistered = true;
      }
    }

    // Registered count check
    const { count, error } = await supabase
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .eq("event_id", id);

    if (!error && count !== null) {
      registeredCount = count;
    } else if (id === "1" || id === "2" || id === "3") {
      // Simulate realistic registration count for fallback preview
      registeredCount = id === "1" ? 435 : id === "2" ? 2490 : 85;
    }
  } catch (err) {
    console.error("Could not load registration counts:", err);
    registeredCount = id === "1" ? 435 : id === "2" ? 2490 : 85;
  }

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-mono">
      {/* Editorial Structural Grid Overlay */}
      <div className="absolute inset-0 hairline-grid opacity-[0.1] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 border-x border-zinc-850 px-4 sm:px-8 pb-10">
        
        {/* Navigation Breadcrumb - Modern Outline Label */}
        <div className="mb-10 pt-6">
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-[#dffe00] border border-zinc-850 px-4 py-2 bg-zinc-950 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>All Catalog Directory</span>
          </Link>
        </div>

        {/* Detailed Layout - Asymmetrical structural grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Aspect image placeholder or gradient */}
            <div className="relative aspect-video rounded-none overflow-hidden bg-zinc-950 border border-zinc-850 shadow-[3px_3px_0px_rgba(255,255,255,0.02)]">
              {event.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#5f5af6]/30 via-zinc-950 to-black flex flex-col items-center justify-center relative">
                  <Calendar className="h-24 w-24 text-[#5f5af6]/20 mb-4" />
                  <div className="inline-flex items-center space-x-1.5 text-[10px] text-[#dffe00] font-black uppercase tracking-widest bg-black border border-zinc-800 px-4.5 py-2 shadow-brutalist shadow-[#5f5af6]">
                    <Sparkles className="h-3.5 w-3.5 animate-spin" />
                    <span>Premium Master Experience</span>
                  </div>
                </div>
              )}
            </div>

            {/* Event Description and details */}
            <div className="space-y-8 pt-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none text-white font-syne uppercase hover:text-[#5f5af6] transition-colors">
                {event.title}
              </h1>

              {/* Badges info list - Styled as sharp grid cell panels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center space-x-2.5 bg-zinc-950 border border-zinc-850 p-4.5">
                  <Calendar className="h-4.5 w-4.5 text-[#5f5af6] shrink-0" />
                  <span className="leading-snug">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-zinc-950 border border-zinc-850 p-4.5">
                  <MapPin className="h-4.5 w-4.5 text-purple-400 shrink-0" />
                  <span className="leading-snug truncate">{event.location}</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-zinc-950 border border-zinc-850 p-4.5">
                  <Users className="h-4.5 w-4.5 text-[#dffe00] shrink-0" />
                  <span className="leading-snug">{event.capacity} Total Slots</span>
                </div>
              </div>

              {/* Event Description Content */}
              <div className="border-t border-zinc-900 pt-8">
                <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider font-syne">
                  About this Event
                </h2>
                <p className="text-zinc-400 leading-relaxed font-sans font-light text-base whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Ticket Registration Card */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <RegistrationCard
              eventId={event.id}
              userLoggedIn={userLoggedIn}
              alreadyRegistered={alreadyRegistered}
              registeredCount={registeredCount}
              capacity={event.capacity}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
