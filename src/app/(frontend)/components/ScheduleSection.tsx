'use client'

import { useState } from 'react'
import type { Schedule, Media } from '@/payload-types'
import ScheduleContainer from './ScheduleContainer'
import EventsSection from './EventsSection'

const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export const getImageUrl = (image: string | Media | null | undefined): string | null => {
  if (!image || typeof image === 'string') return null
  return image.url ?? null
}

export default function ScheduleSection({ schedules }: { schedules: Schedule[] }) {
  const [selectedDay, setSelectedDay] = useState<string>(DAYS[new Date().getDay()])

  return (
    <>
      <ScheduleContainer
        schedules={schedules}
        onDaySelect={setSelectedDay}
        selectedDay={selectedDay}
      />
      <EventsSection schedules={schedules} selectedDay={selectedDay} />
    </>
  )
}
