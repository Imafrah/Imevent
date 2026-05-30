"use client";

import { Download, Ticket, AlertCircle, FileText } from "lucide-react";
import Papa from "papaparse";

export interface RegistrationRow {
  id: string;
  userName: string;
  email: string;
  eventTitle: string;
  registeredAt: string;
}

interface RegistrationsTableProps {
  registrations: RegistrationRow[];
}

export default function RegistrationsTable({ registrations }: RegistrationsTableProps) {
  const handleExportCSV = () => {
    try {
      const exportData = registrations.map((reg) => ({
        "Registration ID": reg.id,
        "Participant Name": reg.userName,
        "Email": reg.email,
        "Event Title": reg.eventTitle,
        "Registered Date": reg.registeredAt,
      }));

      const csv = Papa.unparse(exportData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "event-registrations.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to export registrations CSV:", error);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Table & controls */}
      <div className="flex justify-between items-center bg-[#1a1a1a] px-6 py-4 border border-neutral-850 rounded-2xl">
        <div className="text-xs text-neutral-400">
          Showing <span className="text-white font-semibold font-mono">{registrations.length}</span> registrations total
        </div>
        <button
          onClick={handleExportCSV}
          disabled={registrations.length === 0}
          className="inline-flex items-center space-x-2 bg-indigo-650 hover:bg-indigo-600 disabled:bg-indigo-600/30 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-md text-xs cursor-pointer disabled:cursor-not-allowed border border-indigo-500"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Grid Table */}
      <div className="bg-[#1a1a1a] border border-neutral-850 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-indigo-900/60 text-white text-xs font-semibold uppercase tracking-wider border-b border-neutral-800">
                <th className="px-6 py-4">Participant Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850">
              {registrations.length > 0 ? (
                registrations.map((reg, index) => (
                  <tr
                    key={reg.id}
                    className={`transition-colors hover:bg-neutral-900/35 ${
                      index % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#141414]"
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">{reg.userName}</td>
                    <td className="px-6 py-4 text-neutral-300 font-mono text-xs">{reg.email}</td>
                    <td className="px-6 py-4 text-neutral-350 truncate max-w-[200px]">{reg.eventTitle}</td>
                    <td className="px-6 py-4 text-neutral-450 text-xs whitespace-nowrap">
                      {formatDate(reg.registeredAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-[#1a1a1a]">
                  <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                    <Ticket className="h-10 w-10 text-neutral-600 mx-auto mb-3" />
                    <span>No registration tickets issued yet.</span>
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
