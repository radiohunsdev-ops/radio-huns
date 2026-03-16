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
      className={`w-[33.3333%] shrink-0 space-y-4 font-serif px-6 cursor-pointer transition-opacity hover:opacity-75 ${
        bordered ? 'md:border-l pl-10 border-white/40' : ''
      }`}
    >
      <h4 className={`text-xl font-bold ${active ? 'text-[#F9B855]' : ''}`}>{day}</h4>
      <p className={`text-xl font-bold ${active ? 'text-[#F9B855]' : ''}`}>{name}</p>
      <div
        className={`flex items-center text-xl gap-2  opacity-90 ${active ? 'text-[#F9B855]' : ''}`}
      >
        <Clock className="w-5 h-5" />
        {time}
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
  const sliderRef = useRef<HTMLDivElement>(null)

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
    <div className="relative z-30 -bottom-30 w-fit mx-auto grid grid-cols-[auto_1fr] gap-5">
      <div className="w-120" />
      <div className="relative flex items-center">
        <button
          onClick={() => navigate(-1)}
          className="absolute bottom-12 -left-12 z-20 w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="bg-[#E75023] w-200 ml-5 text-white shadow-2xl overflow-hidden py-10">
          <div
            ref={sliderRef}
            style={{
              display: 'flex',
              transform: `translateX(-${translateIndex * 33.3333}%)`,
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

        <button
          onClick={() => navigate(1)}
          className="absolute bottom-12 -right-12 z-20 w-10 h-10 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
