export default function Loading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#0a0a0a]">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-16 h-16 rounded-full border-4 border-indigo-500/10 border-t-indigo-500 animate-spin" />
        {/* Inner reverse-spinning ring */}
        <div className="w-10 h-10 rounded-full border-4 border-purple-500/5 border-t-purple-400 animate-spin animate-duration-1000 direction-reverse" />
      </div>
      <p className="mt-6 text-sm text-neutral-400 font-medium tracking-wide animate-pulse">
        Loading EventHub...
      </p>
    </div>
  );
}
