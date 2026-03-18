import { Play } from 'lucide-react'
import React from 'react'

const ListenNow = () => {
  return (
    <a
      href="https://streema.com/radios/CHIN_Ottawa_CJLL"
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex items-center gap-4 px-3 pr-7 py-3 rounded-full
        bg-amber-400/8 border border-amber-400/20
        hover:bg-amber-400/14 hover:border-amber-400/50
        hover:-translate-y-px active:scale-[0.98]
        transition-all duration-300 group"
    >
      <div className="relative w-13 h-13 shrink-0">
        <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
        <span
          className="absolute inset-0 rounded-full bg-amber-300/20 animate-ping"
          style={{ animationDelay: '0.7s', animationDuration: '2.2s' }}
        />
        <span
          className="relative z-10 flex items-center justify-center w-full h-full rounded-full bg-white
            shadow-[0_2px_12px_rgba(249,184,85,0.35)]
            group-hover:shadow-[0_4px_20px_rgba(249,184,85,0.55)]
            group-hover:scale-105 transition-all duration-300"
        >
          <Play className="text-[#F9B855] ml-0.5" size={18} fill="#F9B855" />
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-serif font-semibold text-[17px] text-white tracking-wide leading-tight">
          Listen Now
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          Live Radio
        </span>
      </div>
    </a>
  )
}

export default ListenNow
