'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import type { Schedule } from '@/payload-types'

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function ScheduleItem({
  day,
  name,
  time,
  bordered,
  active,
  onClick,
}: {
  day: string
  name: string
  time: string
  bordered?: boolean
  active?: boolean
  onClick?: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`w-1/2 md:w-[33.3333%] shrink-0 space-y-2 md:space-y-4 font-serif px-3 sm:px-4 md:px-6 cursor-pointer transition-opacity hover:opacity-75 ${
        bordered ? 'md:border-l md:pl-10 border-white/40' : ''
      }`}
    >
      <h4
        className={`text-xs sm:text-sm md:text-lg lg:text-xl font-bold leading-tight ${active ? 'text-[#F9B855]' : ''}`}
      >
        {day}
      </h4>

      <p
        className={`text-xs sm:text-sm md:text-lg lg:text-xl font-bold leading-snug ${active ? 'text-[#F9B855]' : ''}`}
      >
        {name}
      </p>

      <div
        className={`flex text-xs sm:text-sm md:text-lg lg:text-xl items-center gap-1 md:gap-2 opacity-90 ${
          active ? 'text-[#F9B855]' : ''
        }`}
      >
        <Clock className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
        <span className="truncate">{time}</span>
      </div>
    </div>
  )
}

export default function ScheduleContainer({
  schedules,
  onDaySelect,
  selectedDay,
}: {
  schedules: Schedule[]
  onDaySelect: (day: string) => void
  selectedDay: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)
  const [itemsPerView, setItemsPerView] = useState(3)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 2 : 3)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const translatePercentage = 100 / itemsPerView

  const slots = useMemo(() => {
    const now = new Date()
    const todayIndex = now.getDay()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    return Array.from({ length: 7 }, (_, offset) => {
      const day = DAYS[(todayIndex + offset) % 7]
      const dayShows = schedules
        .filter((s) => s.day === day)
        .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime))

      if (!dayShows.length) return null

      const show =
        offset === 0
          ? (dayShows.find((s) => toMinutes(s.endTime) > currentMinutes) ?? dayShows[0])
          : dayShows[0]

      return {
        show,
        label: offset === 0 ? 'Today:' : `${day.charAt(0).toUpperCase() + day.slice(1)}:`,
        day,
      }
    }).filter(Boolean) as { show: Schedule; label: string; day: string }[]
  }, [schedules])

  const total = slots.length
  const extendedSlots = useMemo(() => [...slots, ...slots, ...slots], [slots])
  const realIndex = ((currentIndex % total) + total) % total
  const translateIndex = total + currentIndex

  useEffect(() => {
    if (total > 0) onDaySelect(slots[realIndex].day)
  }, [realIndex, total, onDaySelect, slots])

  const handleTransitionEnd = () => {
    if (currentIndex >= total || currentIndex < 0) {
      setIsAnimating(false)
      setCurrentIndex(realIndex)
      setTimeout(() => setIsAnimating(true), 50)
    }
  }

  const navigate = (dir: 1 | -1) => {
    if (!isAnimating) return
    setCurrentIndex((prev) => prev + dir)
  }

  if (total === 0) return null

  return (
    <div className="relative z-30 -bottom-30 w-full px-10 sm:px-12 md:px-14 lg:px-0 lg:w-fit mx-auto grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-5">
      <div className="hidden lg:block w-120" />

      <div className="relative flex items-center">
        {/* Left nav button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute bottom-1/2 translate-y-1/2 -left-8 sm:-left-10 md:-left-12 z-20 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition"
        >
          <ChevronLeft size={16} className="sm:hidden" />
          <ChevronLeft size={20} className="hidden sm:block" />
        </button>

        {/* Slider track */}
        <div className="bg-[#E75023] w-full lg:w-200 text-white shadow-2xl overflow-hidden py-5 md:py-7">
          <div
            ref={sliderRef}
            style={{
              display: 'flex',
              transform: `translateX(-${translateIndex * translatePercentage}%)`,
              transition: isAnimating ? 'transform 500ms ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlots.map((slot, index) => {
              const positionInWindow = index - translateIndex
              const isCentered = positionInWindow === 0

              return (
                <ScheduleItem
                  key={`${slot.show.id}-${index}`}
                  day={slot.label}
                  name={slot.show.dj}
                  time={`${slot.show.startTime} - ${slot.show.endTime}`}
                  bordered={positionInWindow === 1 || positionInWindow === 2}
                  active={isCentered && slot.day === selectedDay}
                  onClick={() => onDaySelect(slot.day)}
                />
              )
            })}
          </div>
        </div>

        {/* Right nav button */}
        <button
          onClick={() => navigate(1)}
          className="absolute bottom-1/2 translate-y-1/2 -right-8 sm:-right-10 md:-right-12 z-20 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition"
        >
          <ChevronRight size={16} className="sm:hidden" />
          <ChevronRight size={20} className="hidden sm:block" />
        </button>
      </div>
    </div>
  )
}
