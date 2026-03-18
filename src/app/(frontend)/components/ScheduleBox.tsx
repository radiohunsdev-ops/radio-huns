'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import type { Schedule } from '@/payload-types'

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

const toMinutes = (time: string) => {
  if (!time) return 0
  const cleaned = time.replace('.', ':')
  const parts = cleaned.split(':')
  const hours = parseInt(parts[0] || '0', 10)
  const minutes = parseInt(parts[1] || '0', 10)
  return hours * 60 + minutes
}

const capitalize = (day: string) => day.charAt(0).toUpperCase() + day.slice(1)

export default function ScheduleBox({ schedules }: { schedules: Schedule[] }) {
  const pathname = usePathname()

  const bgColor = pathname === '/about-us' ? 'bg-blue-600' : 'bg-[#E75023]'

  const upcoming = useMemo(() => {
    if (!schedules?.length) return null

    const now = new Date()
    const todayIndex = now.getDay()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()

    for (let offset = 0; offset < 7; offset++) {
      const dayIndex = (todayIndex + offset) % 7
      const dayName = DAYS[dayIndex]

      const dayShows = schedules
        .filter((s) => s.day === dayName)
        .sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime))

      if (!dayShows.length) continue

      if (offset === 0) {
        const running = dayShows.find(
          (s) => toMinutes(s.startTime) <= currentMinutes && toMinutes(s.endTime) > currentMinutes,
        )

        if (running) {
          return { type: 'now', show: running, dayLabel: 'Today' }
        }

        const nextToday = dayShows.find((s) => toMinutes(s.startTime) > currentMinutes)

        if (nextToday) {
          return { type: 'next', show: nextToday, dayLabel: 'Today' }
        }

        continue
      }

      return {
        type: 'next',
        show: dayShows[0],
        dayLabel: capitalize(dayName),
      }
    }

    return null
  }, [schedules])

  if (!upcoming) return null

  return (
    <div className="relative z-30 bottom-20 w-full lg:w-fit mx-auto lg:ml-auto lg:mr-3 xl:mr-30 px-4 sm:px-6 lg:px-0">
      <div className="font-serif">
        <div className={`${bgColor} w-full lg:w-200 text-white shadow-2xl`}>
          <div className="grid grid-cols-2">
            <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-6 lg:px-10 py-5 sm:py-7 lg:py-10 border-r border-white/40">
              <a
                href="https://streema.com/radios/CHIN_Ottawa_CJLL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="lg:hidden flex  shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white/70  items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <polygon points="6,4 20,12 6,20" />
                  </svg>
                </div>
              </a>

              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs lg:text-sm tracking-widest uppercase opacity-80 mb-0.5">
                  {upcoming.type === 'now' ? 'Now:' : 'On Next:'}
                </p>

                <h4 className="text-xs sm:text-base lg:text-xl font-semibold leading-tight truncate">
                  {upcoming.show.title}
                </h4>

                <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs lg:text-sm opacity-90">
                  <svg
                    className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  <span>
                    {upcoming.dayLabel} {upcoming.show.startTime} EST
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-1 sm:gap-2 px-4 sm:px-6 lg:px-10 py-5 sm:py-7 lg:py-10">
              <p className="text-[10px] sm:text-xs lg:text-sm tracking-widest capitalize opacity-80">
                Weekly schedule:
              </p>

              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                  className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
