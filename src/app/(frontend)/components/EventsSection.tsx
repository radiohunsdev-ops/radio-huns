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

    if (role === 'outgoing') {
      return direction === 'right'
        ? 'absolute inset-0 animate-slide-out-left'
        : 'absolute inset-0 animate-slide-out-right'
    }

    if (role === 'incoming') {
      return direction === 'right'
        ? 'relative animate-slide-in-right'
        : 'relative animate-slide-in-left'
    }

    return ''
  })()

  return (
    <section className={`w-full font-serif ${animationClass}`}>
      {!primary ? (
        <div className="flex items-center justify-center h-[80vh] text-2xl text-gray-400">
          No shows scheduled for this day
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative lg:col-span-9 h-[80vh] overflow-hidden">
            <img
              src={getImageUrl(primary.image as string | Media) ?? '/events/eve1.png'}
              alt={primary.title}
              className="w-full h-full object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-transparent" />
            <div className="absolute space-y-3 bottom-8 left-8 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              <h3 className="text-4xl font-light">{primary.title}</h3>
              <p className="text-5xl opacity-90">{primary.dj}</p>
              <p className="text-2xl">
                {primary.startTime} – {primary.endTime} EST
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            {rest.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-lg px-4 text-center">
                No other shows this day
              </div>
            ) : (
              rest.slice(0, 2).map((show) => (
                <div key={show.id} className="relative overflow-hidden h-[40vh]">
                  <img
                    src={getImageUrl(show.image as string | Media) ?? '/events/events2.jpg'}
                    alt={show.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/55 to-transparent" />
                  <div className="absolute space-y-2 bottom-4 left-4 text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
                    <p className="text-2xl opacity-90">{show.startTime} EST</p>
                    <h4 className="text-4xl ">{show.title}</h4>
                    <p className="text-xl opacity-80">{show.dj}</p>
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
