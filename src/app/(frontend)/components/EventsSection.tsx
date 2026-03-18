/* eslint-disable @next/next/no-img-element */
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
    <div className="relative overflow-hidden">
      <div className="bg-[#F9B855] h-30" />
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

  const [primary, ...rest] = shows

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

  return (
    <section className={`w-full font-serif ${animationClass}`}>
      {!primary ? (
        <div className="flex items-center justify-center h-[50vh] text-lg text-gray-400">
          No shows scheduled for this day
        </div>
      ) : (
        /* Always side-by-side: primary left (2/3), side cards right (1/3) */
        <div className="flex h-[55vw] sm:h-[45vw] md:h-[40vw] lg:h-[80vh]">
          {/* ── Primary show — left column ── */}
          <div className="relative w-2/3 lg:w-9/12 h-full overflow-hidden">
            <img
              src={getImageUrl(primary.image as string | Media) ?? '/events/eve1.png'}
              alt={primary.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 md:bottom-6 md:left-6 lg:bottom-8 lg:left-8 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] space-y-0.5 sm:space-y-1 md:space-y-2 lg:space-y-3">
              <h3 className="text-xs sm:text-sm md:text-xl lg:text-4xl font-light leading-tight">
                {primary.title}
              </h3>
              <p className="text-sm sm:text-base md:text-2xl lg:text-5xl opacity-90 leading-tight">
                {primary.dj}
              </p>
              <p className="text-[10px] sm:text-xs md:text-base lg:text-2xl opacity-80">
                {primary.startTime} – {primary.endTime} EST
              </p>
            </div>
          </div>

          <div className="relative w-1/3 lg:w-3/12 h-full flex flex-col">
            {rest.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-[10px] sm:text-xs px-2 text-center">
                No other shows
              </div>
            ) : (
              rest.slice(0, 2).map((show) => (
                <div key={show.id} className="relative overflow-hidden flex-1">
                  <img
                    src={getImageUrl(show.image as string | Media) ?? '/events/events2.jpg'}
                    alt={show.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 md:bottom-4 md:left-4 text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] space-y-0.5 sm:space-y-1 md:space-y-1.5 lg:space-y-2">
                    <p className="text-[10px] sm:text-xs md:text-base lg:text-2xl opacity-90 font-bold">
                      {show.startTime} EST
                    </p>
                    <h4 className="text-[10px] sm:text-xs md:text-lg lg:text-4xl leading-tight">
                      {show.title}
                    </h4>
                    <p className="text-[9px] sm:text-[11px] md:text-sm lg:text-xl opacity-80">
                      {show.dj}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  )
}
