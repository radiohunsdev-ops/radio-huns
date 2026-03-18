import config from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import ScheduleBox from '../../components/ScheduleBox'
import { getActiveSchedule } from '@/lib/getSchedule'
import SocialLinks from '../../components/footer/SocialLinks'
import FooterLogo from '../../components/footer/FooterLogo'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import FooterIcon from '../../components/icon/FooterIcon'
import Banner from '../../components/Banner'

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
    <article className=" w-full ">
      <section>
        <Banner
          textColor=""
          title="Journal"
          headline={foundCard.title}
          image={foundCard.image || { url: '', alt: '' }}
        />
        <div className="absolute left-0 w-full lg-bottom-40 z-20">
          <div className="max-w-8xl mx-auto  flex justify-end">
            <ScheduleBox schedules={schedules} />
          </div>
        </div>
      </section>

      {foundCard.content && (
        <main className="min-h-screen flex flex-col font-serif">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[40%_60%] ">
            {/* LEFT */}
            <div className="flex flex-col">
              <div className="relative bg-[#E55322] text-[#F6F1E7]">
                <div className="px-6 sm:px-10 lg:px-15 py-8 sm:py-10">
                  <div className="mt-6 sm:mt-10 space-y-1 text-base sm:text-lg">
                    <p className="font-semibold">Date Posted</p>
                    <p className="text-[#F9B855]">{foundCard.date}</p>
                  </div>

                  <div className="mt-6 sm:mt-10 space-y-1 text-base sm:text-lg">
                    <p className="font-semibold">Category</p>
                    <p className="text-[#F9B855] capitalize">{foundCard.category}</p>
                  </div>

                  <div className="mt-6 sm:mt-10 text-[#F9B855] space-y-1 text-base sm:text-lg">
                    <p className="font-semibold text-white">Share this Post</p>
                    <SocialLinks />
                  </div>
                </div>
              </div>

              <div className="relative h-50 sm:h-62.5 lg:h-full bg-[#E75023] overflow-hidden">
                <FooterIcon />
              </div>
            </div>

            {/* RIGHT */}
            <div className="pt-6 sm:pt-10 flex flex-col justify-between h-auto">
              <div className="px-6 sm:px-10 lg:px-20">
                <div className="prose max-w-none mt-10 sm:mt-20 text-sm sm:text-base lg:text-[1.4vw] [&_a]:text-[#E55322] [&_a]:underline">
                  <RichText data={foundCard.content} />
                </div>

                <div className="mt-10 mb-16 sm:mb-20">
                  <Link
                    href="/journal"
                    className="flex items-center gap-2 text-[#E75023] text-base sm:text-lg lg:text-xl hover:opacity-80 transition"
                  >
                    Back to Journal
                    <ChevronRight size={24} className="lg:w-8 lg:h-8" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER SECTION */}
          <div className="bg-[#F9B855] py-10 lg:h-[20vh] grid grid-cols-1 lg:grid-cols-[40%_60%]">
            {/* LOGO */}
            <div className="flex justify-center lg:block">
              <div className="h-28 w-28 sm:h-32 sm:w-32 lg:h-37.5 lg:w-37.5 p-2 pt-6 lg:pt-9 lg:relative lg:left-12">
                <FooterLogo fill="#E75023" />
              </div>
            </div>

            {/* FOOTER LINKS */}
            <div className="relative mt-6 lg:mt-0">
              <div className="relative lg:absolute lg:left-0 lg:bottom-0 bg-[#E75023] w-full lg:w-[90%] pt-6 sm:pt-10">
                <div className="bg-[#E55322] text-[#F6F1E7] px-6 sm:px-10 py-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x divide-[#F6F1E7]/30 text-xs sm:text-sm mb-4">
                    <FooterCol items={['Home', 'Journal', 'Contact']} />
                    <FooterCol items={['About Us', 'Meet Our Hosts']} />
                    <FooterCol items={['Community', 'Prizes']} />
                    <FooterCol items={['Advertise', 'Charter']} />
                    <FooterCol items={['Schedule', 'Jobs']} />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between text-xs sm:text-sm">
                    <div className="flex flex-wrap gap-4 text-[#F9B855]">
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
