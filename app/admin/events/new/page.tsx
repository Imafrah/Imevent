"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createEvent } from "@/app/admin/actions";
import { Calendar, FileText, MapPin, Users, Image as ImageIcon, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

export default function NewEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const result = await createEvent({
        title,
        description,
        location,
        date: new Date(date).toISOString(),
        capacity: Number(capacity),
        image_url: imageUrl,
      });

      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          router.push("/admin/events");
          router.refresh();
        }, 1500);
      } else {
        setError(result.message);
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to create event. Please verify inputs.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-10 w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10 space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/admin/events"
            className="inline-flex items-center space-x-2 text-sm text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Events</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="bg-[#1a1a1a] border border-neutral-850 rounded-2xl p-8 sm:p-10 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Add New Event</h1>
            <p className="text-neutral-400 text-sm mt-2">
              Fill in the specifications below to schedule a new premium event on the catalog.
            </p>
          </div>

          {/* Dynamic alerts */}
          {error && (
            <div className="flex items-start space-x-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6 animate-in fade-in duration-200">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-4 rounded-xl mb-6 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{success} — Redirecting back to event list...</span>
            </div>
          )}

          {/* New Event Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-300 mb-1.5">
                Event Title
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Calendar className="h-5 w-5" />
                </span>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Global Design Summit 2026"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-300 mb-1.5">
                Event Description
              </label>
              <div className="relative">
                <span className="absolute top-3.5 left-3.5 flex items-start pointer-events-none text-neutral-500">
                  <FileText className="h-5 w-5" />
                </span>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed info about schedules, panel sessions, keynotes..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm resize-none"
                />
              </div>
            </div>

            {/* Location & Date grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Location
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <input
                    id="location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Austin, TX or Online"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Date & Time
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="datetime-local"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Capacity & Image URL grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Capacity (Seats)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <Users className="h-5 w-5" />
                  </span>
                  <input
                    id="capacity"
                    type="number"
                    required
                    min={1}
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g., 250"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-neutral-300 mb-1.5">
                  Image URL (Optional)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                    <ImageIcon className="h-5 w-5" />
                  </span>
                  <input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#2a2a2a] border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-600/50 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 cursor-pointer disabled:cursor-not-allowed text-sm"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Event</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
