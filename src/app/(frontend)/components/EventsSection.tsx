'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Schedule, Media } from '@/payload-types'
import { getImageUrl } from './ScheduleSection'

const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

type EventsSectionProps = {
  schedules: Schedule[]
  selectedDay: string
  direction?: 'left' | 'right'
}

type SlideEntry = {
  day: string
  key: number
  role: 'current' | 'outgoing' | 'incoming'
  direction: 'left' | 'right'
}

export default function EventsSection({
  schedules,
  selectedDay,
  direction = 'right',
}: EventsSectionProps) {
  const keyRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [slides, setSlides] = useState<SlideEntry[]>([
    { day: selectedDay, key: 0, role: 'current', direction: 'right' },
  ])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    keyRef.current += 1
    const newKey = keyRef.current

    setSlides((prev) => {
      const active = prev.find((s) => s.role === 'current' || s.role === 'incoming')
      if (active?.day === selectedDay) return prev
      if (!active) return prev
      return [
        { ...active, role: 'outgoing', direction },
        { day: selectedDay, key: newKey, role: 'incoming', direction },
      ]
    })

    timerRef.current = setTimeout(() => {
      setSlides([{ day: selectedDay, key: newKey, role: 'current', direction }])
    }, 500)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [selectedDay, direction])

  return (
    <div className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="relative w-full overflow-hidden">
        {slides.map((slide) => (
          <SlideContent
            key={slide.key}
            schedules={schedules}
            day={slide.day}
            role={slide.role}
            direction={slide.direction}
          />
        ))}
      </div>
    </div>
  )
}

type SlideContentProps = {
  schedules: Schedule[]
  day: string
  role: SlideEntry['role']
  direction: 'left' | 'right'
}

function SlideContent({ schedules, day, role, direction }: SlideContentProps) {
  const shows = useMemo(() => {
    return schedules
      .filter((s) => s.day === day)
      .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime))
  }, [schedules, day])

  const animationClass = (() => {
    if (role === 'current') return 'relative translate-x-0'
    if (role === 'outgoing')
      return direction === 'right'
        ? 'absolute inset-0 animate-slide-out-left'
        : 'absolute inset-0 animate-slide-out-right'
    if (role === 'incoming')
      return direction === 'right'
        ? 'relative animate-slide-in-right'
        : 'relative animate-slide-in-left'
    return ''
  })()

  if (shows.length === 0) {
    return (
      <section className={`w-full ${animationClass}`}>
        <div className="flex items-center justify-center h-[50vh] text-gray-500 text-lg tracking-widest uppercase font-light">
          No shows scheduled
        </div>
      </section>
    )
  }

  const [hero, ...rest] = shows

  return (
    <section className={`w-full bg-[#0a0a0a] ${animationClass}`}>
      <div className="relative w-full h-[30vh] md:h-[40vh] overflow-hidden">
        <img
          src={getImageUrl(hero.image as string | Media) ?? '/events/eve1.png'}
          alt={hero.title}
          className="w-full h-full object-cover object-center transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/60 via-transparent to-transparent" />

        <div className="absolute top-6 left-6 md:top-8 md:left-10">
          <span className="inline-block bg-[#F9B855] text-[#0a0a0a] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase px-3 py-1">
            Featured
          </span>
        </div>

        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-10 max-w-2xl">
          <p className="text-[#F9B855] text-xs md:text-sm tracking-[0.25em] uppercase mb-3 font-medium">
            {hero.startTime} – {hero.endTime} EST
          </p>
          <h2 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[0.95] mb-3">
            {hero.title}
          </h2>
          <p className="text-white/70 text-base md:text-xl tracking-wide">{hero.dj}</p>
        </div>
      </div>

      {rest.length > 0 && (
        <div className="px-4 md:px-10 py-8 md:py-10">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-medium">
              All Shows
            </span>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-[10px] tracking-[0.2em]">{shows.length} total</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4">
            {rest.map((show, i) => (
              <ShowCard key={show.id} show={show} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

type ShowCardProps = {
  show: Schedule
  index: number
}

function ShowCard({ show, index }: ShowCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-3/4 overflow-hidden bg-[#141414]">
        <img
          src={getImageUrl(show.image as string | Media) ?? '/events/events2.jpg'}
          alt={show.title}
          className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
            hovered ? 'scale-110' : 'scale-100'
          }`}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

        <div
          className={`absolute inset-0 bg-[#F9B855]/10 transition-opacity duration-300 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute top-0 left-0 w-0.5 h-0 bg-[#F9B855] group-hover:h-full transition-all duration-500 ease-out" />

        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
          <p className="text-[#F9B855] text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold mb-1.5">
            {show.startTime} EST
          </p>
          <h4 className="text-white text-xs md:text-sm lg:text-base font-serif leading-tight mb-1">
            {show.title}
          </h4>
          <p className="text-white/55 text-[10px] md:text-xs tracking-wide truncate">{show.dj}</p>
        </div>

        <div
          className={`absolute top-3 right-3 transition-all duration-300 ${
            hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-[#F9B855] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2 5h6M5 2l3 3-3 3"
                stroke="#0a0a0a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="pt-3 pb-1 px-0.5">
        <p className="text-white/80 text-[11px] md:text-xs font-medium leading-tight truncate">
          {show.title}
        </p>
        <p className="text-white/35 text-[10px] mt-0.5 truncate">
          {show.startTime} – {show.endTime}
        </p>
      </div>
    </div>
  )
}
