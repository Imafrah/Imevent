"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Menu, X, Calendar, Ticket, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    }

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Events", href: "/events", icon: Calendar },
    ...(user ? [{ name: "My Tickets", href: "/dashboard", icon: Ticket }] : []),
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="bg-[#060606] border-b border-zinc-800 text-white sticky top-0 z-50 transition-all font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - Modular Brutalist Block */}
          <div className="flex items-center h-full border-r border-zinc-800 pr-8">
            <Link href="/" className="flex items-center space-x-2.5 text-lg font-bold tracking-tighter text-white hover:text-[#dffe00] transition-colors group">
              <span className="bg-[#5f5af6] p-2 border border-black rounded-none text-white shadow-[2px_2px_0px_#060606] group-hover:bg-[#dffe00] group-hover:text-[#060606] group-hover:shadow-[2px_2px_0px_#5f5af6] transition-all">
                <Calendar className="h-5 w-5" />
              </span>
              <span className="font-syne text-xl tracking-tight uppercase">Event<span className="text-[#5f5af6] group-hover:text-[#dffe00]">Hub</span></span>
            </Link>
          </div>

          {/* Desktop Navigation Links - Structured in high-contrast cells */}
          <div className="hidden md:flex items-center h-full">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-2 px-6 h-20 border-r border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all ${
                    active
                      ? "bg-[#5f5af6]/10 text-[#dffe00] border-b-2 border-b-[#dffe00]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Supabase Connection Health Status (Studio Dunbar theme) */}
          <div className="hidden lg:flex items-center space-x-2 text-[10px] text-zinc-500 uppercase tracking-widest pl-4">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${user ? "bg-[#dffe00]" : "bg-purple-500"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${user ? "bg-[#dffe00]" : "bg-purple-500"}`}></span>
            </span>
            <span>Supabase Live</span>
          </div>

          {/* Desktop Right Actions - Modular Cards */}
          <div className="hidden md:flex items-center space-x-4 h-full pl-6">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4 h-full">
                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 border border-zinc-800 max-w-[180px] truncate uppercase tracking-wider">
                      {user.email}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-1.5 bg-zinc-900 hover:bg-red-500 hover:text-black border border-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-[2px_2px_0px_rgba(255,255,255,0.05)] hover:shadow-brutalist"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/auth/login"
                      className="flex items-center space-x-1.5 hover:bg-zinc-900 text-zinc-300 px-4 py-2 border border-transparent hover:border-zinc-800 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="flex items-center space-x-1.5 bg-[#dffe00] hover:bg-[#c9e500] text-black border border-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-brutalist shadow-[#5f5af6] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#5f5af6]"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-none text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#060606] border-b border-zinc-800 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive(link.href)
                      ? "bg-[#5f5af6]/20 text-[#dffe00] border-l-4 border-l-[#dffe00]"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Right Actions */}
          <div className="pt-4 pb-4 border-t border-zinc-800 px-4">
            {!loading && (
              <div className="space-y-3">
                {user ? (
                  <div className="flex flex-col space-y-3">
                    <div className="text-xs text-zinc-400 bg-zinc-900 px-3 py-2 border border-zinc-800 truncate uppercase tracking-wider">
                      User: <span className="text-white block font-bold mt-0.5">{user.email}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleSignOut();
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-zinc-900 hover:bg-red-500 hover:text-black border border-zinc-800 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2.5">
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 border border-zinc-800 hover:bg-zinc-900 text-zinc-300 py-3 text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center justify-center space-x-2 bg-[#dffe00] text-black border border-black py-3 text-xs font-bold uppercase tracking-wider transition-colors shadow-brutalist"
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
