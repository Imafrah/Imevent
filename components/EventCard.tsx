import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  // Format date as "Mon DD, YYYY"
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="group bg-zinc-950 border border-zinc-850 rounded-none overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:border-[#5f5af6] flex flex-col h-full shadow-[3px_3px_0px_rgba(255,255,255,0.02)] hover:shadow-brutalist-lime">
      
      {/* Aspect Image Cell with Sharp Board outline */}
      <div className="relative h-56 w-full overflow-hidden bg-[#060606] shrink-0 border-b border-zinc-850">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.image_url}
            alt={event.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#5f5af6]/30 via-zinc-900/40 to-black flex items-center justify-center relative">
            <Calendar className="h-16 w-16 text-[#5f5af6]/25 group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-[#060606]/10" />
          </div>
        )}
        
        {/* Playful Offset Wavy Badge */}
        <div className="absolute top-4 right-4 bg-[#dffe00] text-black text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 border border-black shadow-[2px_2px_0px_#060606]">
          Live Slot
        </div>
      </div>

      {/* Structured Card Content */}
      <div className="p-6.5 flex flex-col flex-grow font-mono">
        <span className="text-[10px] text-[#5f5af6] uppercase font-bold tracking-widest mb-1.5 flex items-center">
          <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
          Featured Experience
        </span>
        
        <h3 className="text-xl font-bold text-white mb-4 font-syne group-hover:text-[#dffe00] tracking-tight transition-colors line-clamp-1">
          {event.title}
        </h3>

        {/* Dynamic Detail grid cells */}
        <div className="space-y-3.5 mb-8 text-xs text-zinc-400 flex-grow pt-2.5 border-t border-zinc-900">
          <div className="flex items-center space-x-2.5">
            <Calendar className="h-4 w-4 text-[#5f5af6] shrink-0" />
            <span className="uppercase">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <MapPin className="h-4 w-4 text-purple-400 shrink-0" />
            <span className="truncate uppercase">{event.location}</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <Users className="h-4 w-4 text-[#dffe00] shrink-0" />
            <span className="uppercase">{event.capacity} seats configured</span>
          </div>
        </div>

        {/* Brutalist Outlined Hover Shift Button */}
        <Link
          href={`/events/${event.id}`}
          className="w-full flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-[#5f5af6] text-white hover:text-black font-extrabold py-4 px-4 rounded-none transition-all duration-200 border border-zinc-800 hover:border-black shadow-[3px_3px_0px_rgba(255,255,255,0.02)] hover:shadow-brutalist-lime hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer text-xs uppercase tracking-wider"
        >
          <span>Get Pass</span>
          <ArrowRight className="h-4 w-4 stroke-[2px]" />
        </Link>
      </div>
    </div>
  );
}
