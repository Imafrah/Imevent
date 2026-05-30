"use client";

import { useState } from "react";
import { deleteEvent } from "@/app/admin/actions";
import { Calendar, MapPin, Users, Trash2, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { Event } from "@/types";

interface AdminEvent extends Event {
  registrationsCount: number;
}

interface EventsTableProps {
  initialEvents: AdminEvent[];
}

export default function EventsTable({ initialEvents }: EventsTableProps) {
  const [events, setEvents] = useState<AdminEvent[]>(initialEvents);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    const confirmed = window.confirm(`Are you absolutely sure you want to delete "${title}"? This will cancel all registrations!`);
    if (!confirmed) return;

    setError(null);
    setSuccess(null);
    setDeletingId(id);

    try {
      const result = await deleteEvent(id);
      if (result.success) {
        setSuccess(`"${title}" deleted successfully.`);
        setEvents((prev) => prev.filter((e) => e.id !== id));
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  };

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
    <div className="space-y-6">
      {/* Dynamic Alerts */}
      {error && (
        <div className="flex items-start space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl animate-in fade-in duration-200">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-start space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-4 rounded-xl animate-in fade-in duration-200">
          <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{success}</span>
        </div>
      )}

      {/* Events Table Container */}
      <div className="bg-[#1a1a1a] border border-neutral-850 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#141414] text-neutral-300 text-xs font-semibold uppercase tracking-wider border-b border-neutral-850">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Capacity</th>
                <th className="px-6 py-4 text-center">Registrations</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-neutral-900/35 transition-colors">
                    <td className="px-6 py-4 font-bold text-white max-w-[200px] truncate">{event.title}</td>
                    <td className="px-6 py-4 text-neutral-300 whitespace-nowrap">{formatDate(event.date)}</td>
                    <td className="px-6 py-4 text-neutral-400 truncate max-w-[150px]">{event.location}</td>
                    <td className="px-6 py-4 text-center font-mono text-neutral-300">{event.capacity}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center font-semibold px-2.5 py-1 rounded-full text-xs font-mono ${
                        event.registrationsCount >= event.capacity
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                      }`}>
                        {event.registrationsCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(event.id, event.title)}
                        disabled={deletingId === event.id}
                        className="inline-flex items-center space-x-1 bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/30 hover:border-red-900/50 p-2 rounded-lg text-xs font-semibold cursor-pointer disabled:cursor-not-allowed transition-all"
                      >
                        {deletingId === event.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin text-red-400" />
                        ) : (
                          <>
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-500">
                    <Calendar className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
                    <span>No events scheduled. Click "Add Event" to create one.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
