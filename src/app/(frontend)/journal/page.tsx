import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import CardSection from '../components/CardSection'
import Footer from '../components/footer/Footer'

type Page = {
  title: string
  layout: PageBlock[]
}

export default async function Advertise() {
  const page = (await getPageBySlug('journal')) as Page | null
  const schedules = await getActiveSchedule()
  if (!page) return <div>not found</div>

  return (
    <main>
      {page.layout?.map((block) => {
        switch (block.blockType) {
          case 'banner':
            return (
              <div key={block.id}>
                <Banner
                  textColor=""
                  title={block.title}
                  headline={block.headline}
                  image={block.image}
                />
                <div className="absolute left-0 w-full -bottom-16 z-20">
                  <div className="max-w-8xl mx-auto  flex justify-end">
                    <ScheduleBox schedules={schedules} />
                  </div>
                </div>
              </div>
            )
          case 'filterCardsBlock':
            return <CardSection key={block.id} cards={block.cards || []} />
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}
