import { Play } from 'lucide-react'
import React from 'react'

const ListenNow = () => {
  return (
    <a
      href="https://streema.com/radios/CHIN_Ottawa_CJLL"
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center gap-4  py-3 rounded-full font-serif text-white font-semibold 
      transition-all duration-300   "
    >
      <span className="absolute inline-flex h-16 w-16 rounded-full bg-orange-400/60 animate-ping"></span>
      <span className="absolute inline-flex h-16 w-16 rounded-full bg-orange-300/70 animate-[ping_2s_linear_infinite]"></span>

      <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
        <Play className="text-[#F9B855] ml-0.5  transition" size={20} fill="#F9B855" />
      </span>

      <span className="relative text-lg tracking-wide transition-all">Listen Now</span>

      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition"></span>
    </a>
  )
}

export default ListenNow
