import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import ScheduleBox from '../../components/ScheduleBox'
import { getActiveSchedule } from '@/lib/getSchedule'
import BannerJournal from '../../components/BannerJournal'
import SocialLinks from '../../components/footer/SocialLinks'
import FooterLogo from '../../components/footer/FooterLogo'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import FooterIcon from '../../components/icon/FooterIcon'

type Media = {
  url?: string
}

type Card = {
  slug: string
  title: string
  date?: string
  category?: string
  content?: never
  image: {
    url: string
    alt?: string
  }
  video?: Media
  audio?: Media
}

type FilterCardsBlock = {
  blockType: 'filterCardsBlock'
  cards: Card[]
}

function FooterCol({ items }: { items: string[] }) {
  return (
    <div className="pl-7 space-y-2">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  )
}

export default async function JournalPage({ params }: { params: Promise<{ slug: string }> }) {
  const schedules = await getActiveSchedule()
  const { slug } = await params

  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    limit: 10,
  })
  let allCards: Card[] = []

  for (const page of result.docs) {
    const layout = page.layout as FilterCardsBlock[]
    const block = layout?.find((b) => b.blockType === 'filterCardsBlock')
    if (block?.cards) {
      allCards = [...allCards, ...block.cards]
    }
  }

  const currentIndex = allCards.findIndex((c) => c.slug === slug)
  if (currentIndex === -1) return notFound()

  const foundCard = allCards[currentIndex]

  return (
    <article className="max-w-8xl mx-auto font-serif">
      <BannerJournal
        title="Journal"
        textColor="#EDDECA"
        headline={foundCard.title}
        image={foundCard.image || { url: '', alt: '' }}
      />

      <div className="absolute left-0 w-full -bottom-16 z-20">
        <div className="max-w-8xl mx-auto flex justify-end">
          <ScheduleBox schedules={schedules} />
        </div>
      </div>

      {foundCard.content && (
        <main className="min-h-screen flex flex-col">
          <div className="grid grid-cols-[40%_60%] min-h-[80vh]">
            <div className="flex flex-col">
              <div className="relative bg-[#E55322] text-[#F6F1E7]">
                <div className="px-15 py-10">
                  <div className="mt-10 space-y-1 text-lg">
                    <p className="font-semibold">Date Posted</p>
                    <p className="text-[#F9B855]">{foundCard.date}</p>
                  </div>

                  <div className="mt-10 space-y-1 text-lg">
                    <p className="font-semibold">Category</p>
                    <p className="text-[#F9B855] capitalize">{foundCard.category}</p>
                  </div>

                  <div className="mt-10 text-[#F9B855] space-y-1 text-lg">
                    <p className="font-semibold text-white">Share this Post</p>
                    <SocialLinks />
                  </div>
                </div>
              </div>

              <div className="relative h-full bg-[#E75023] overflow-hidden">
                <FooterIcon />
              </div>
            </div>

            <div className="pt-10 flex flex-col justify-between h-auto">
              <div className="px-20">
                <div className="prose max-w-none mt-20 text-[1.4vw] [&_a]:text-[#E55322] [&_a]:underline">
                  <RichText data={foundCard.content} />
                </div>
                <div className="mt-10 mb-20">
                  <Link
                    href="/journal"
                    className="flex items-center gap-2 text-[#E75023] text-xl hover:opacity-80 transition"
                  >
                    Back to Journal
                    <ChevronRight size={32} />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F9B855] h-[20vh] grid grid-cols-[40%_60%]">
            <div className="h-37.5 w-37.5 p-2 pt-9 relative left-12">
              <FooterLogo />
            </div>

            <div className="relative">
              <div className="absolute left-0 bottom-0 h-[25vh] bg-[#E75023] w-[90%] pt-10">
                <div className="bg-[#E55322] text-[#F6F1E7] px-10">
                  <div className="grid grid-cols-5 divide-x divide-[#F6F1E7]/30 text-sm mb-3">
                    <FooterCol items={['Home', 'Journal', 'Contact']} />
                    <FooterCol items={['About Us', 'Meet Our Hosts']} />
                    <FooterCol items={['Community', 'Prizes']} />
                    <FooterCol items={['Advertise', 'Charter']} />
                    <FooterCol items={['Schedule', 'Jobs']} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-6 text-[#F9B855]">
                      <span>Privacy Policy</span>
                      <span>Branding by Fable&Co.</span>
                    </div>

                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </article>
  )
}
