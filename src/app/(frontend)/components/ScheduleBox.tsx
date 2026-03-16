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
        .sort((a, b) => {
          return toMinutes(a.startTime) - toMinutes(b.startTime)
        })

      if (!dayShows.length) continue

      if (offset === 0) {
        const running = dayShows.find(
          (s) => toMinutes(s.startTime) <= currentMinutes && toMinutes(s.endTime) > currentMinutes,
        )

        if (running) {
          return {
            type: 'now',
            show: running,
            dayLabel: 'Today',
          }
        }

        const nextToday = dayShows.find((s) => toMinutes(s.startTime) > currentMinutes)

        if (nextToday) {
          return {
            type: 'next',
            show: nextToday,
            dayLabel: 'Today',
          }
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
    <div className="relative z-30 bottom-10 w-fit mx-auto grid grid-cols-[auto_1fr] gap-4">
      <div className="w-114"></div>
      <div className="font-serif">
        <div className={`${bgColor} w-200 ml-5 text-white shadow-2xl`}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center gap-6 px-10 border-b md:border-b-0 md:border-r my-10 border-white/40">
              <div>
                <p className="text-[20px] tracking-widest uppercase opacity-80 mb-1">
                  {upcoming.type === 'now' ? 'Now:' : 'On Next:'}
                </p>
                <h4 className="text-2xl font-semibold">{upcoming.show.title}</h4>
                <div className="flex mt-2 items-center gap-2 text-sm opacity-90">
                  <span className="text-[16px]">
                    {upcoming.dayLabel} {upcoming.show.startTime} EST
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 p-5 py-10">
              <div>
                <p className="text-xl tracking-widest capitalize opacity-80 mb-1">
                  Weekly schedule:
                </p>
              </div>

              <div className="w-14 h-14 rounded-full flex items-center justify-center">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
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
