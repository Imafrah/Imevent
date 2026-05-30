import type { Metadata } from "next";
import { Syne, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "EventHub - Discover & Register for Events",
  description: "The premium platform to find, register, and manage tickets for your favorite events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#060606] text-zinc-100 font-sans selection:bg-[#dffe00] selection:text-[#060606]" suppressHydrationWarning>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#ffffff",
              border: "1px solid #2a2a2a",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#1a1a1a",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#1a1a1a",
              },
            },
          }}
        />
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
      </body>
    </html>
  );
}
