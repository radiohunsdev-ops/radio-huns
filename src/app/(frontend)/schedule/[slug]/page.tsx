/* eslint-disable @next/next/no-img-element */

import Footer from '../../components/footer/Footer'
import { getScheduleBySlug } from '@/lib/getSchedule'

const formatTime = (time: string) => {
  const [h, m] = time.split('.')
  const hour = Number(h)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 || 12
  return `${formattedHour}:${m} ${suffix}`
}

const getImageData = (image: any, title: string) => {
  if (!image) return { url: '', alt: title }
  if (typeof image === 'string') return { url: image, alt: title }
  return { url: image.url || '', alt: image.alt || title }
}

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

const DAY_SHORT: Record<string, string> = {
  monday: 'MON',
  tuesday: 'TUE',
  wednesday: 'WED',
  thursday: 'THU',
  friday: 'FRI',
  saturday: 'SAT',
  sunday: 'SUN',
}
export default async function HostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const schedules = await getScheduleBySlug(slug)

  if (!schedules || schedules.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="text-center space-y-3">
          <p className="text-[#C9923A] text-xs tracking-[0.3em] uppercase">404</p>
          <h1 className="text-3xl font-light text-white">Schedule Not Found</h1>
          <p className="text-white/30 text-sm">The requested show could not be located.</p>
        </div>
      </main>
    )
  }

  const show = schedules[0]
  const image = getImageData(show.image, show.title)

  const groupedByDay = schedules.reduce((acc: any, item: any) => {
    if (!acc[item.day]) acc[item.day] = []
    acc[item.day].push({ startTime: item.startTime, endTime: item.endTime })
    return acc
  }, {})

  const sortedDays = Object.entries(groupedByDay).sort(
    ([a], [b]) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b),
  )

  return (
    <main className="bg-[#0A0A0A] text-white  font-sans">
      {/* HERO */}
      <section className="relative min-h-[76vh] flex items-end overflow-hidden">
        {image.url && (
          <img
            src={image.url}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover object-top grayscale-20"
          />
        )}

        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20 w-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#C9923A]" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C9923A]">
              Live Radio Show
            </span>
          </div>

          <h1 className="font-serif font-black leading-[0.95] text-5xl md:text-7xl max-w-2xl mb-6">
            {show.title.split(' ').map((word: string, i: number) =>
              i % 3 === 2 ? (
                <em key={i} className="text-[#C9923A] not-italic">
                  {word}{' '}
                </em>
              ) : (
                `${word} `
              ),
            )}
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9923A]/40 bg-[#C9923A]/10 text-sm">
              <span className="w-2 h-2 bg-[#C9923A] rounded-full animate-pulse" />
              <span className="text-white/70">Hosted by</span>
              <span className="text-[#C9923A]">{show.dj}</span>
            </div>

            {show.shortDescription && (
              <p className="text-white/50 text-sm max-w-sm leading-relaxed">
                {show.shortDescription}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-serif font-bold">Weekly Schedule</h2>
          <span className="text-xs text-[#C9923A] uppercase">{sortedDays.length} days</span>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedDays.map(([day, times]: any) => (
            <div
              key={day}
              className="bg-white/3 border border-white/10 rounded-xl hover:border-[#C9923A]/50 hover:-translate-y-1 transition-all"
            >
              <div className="flex justify-between px-5 py-4 border-b border-white/5">
                <span className="text-[10px] tracking-[0.2em] text-[#C9923A] uppercase">
                  {DAY_SHORT[day] ?? day.slice(0, 3).toUpperCase()}
                </span>
                <span className="text-[10px] text-white/30">
                  {times.length} {times.length === 1 ? 'slot' : 'slots'}
                </span>
              </div>

              <div className="p-4 flex flex-col gap-2">
                {times.map((t: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-black/30 border border-white/10"
                  >
                    <span className="text-xs flex-1 text-white/80">{formatTime(t.startTime)}</span>
                    <span className="text-[10px] text-white/30">→</span>
                    <span className="text-xs flex-1 text-white/80">{formatTime(t.endTime)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
