import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import Footer from '../components/footer/Footer'
import MediaSection from '../components/MediaSection'

type Page = {
  title: string
  layout: PageBlock[]
}
export default async function HomePage() {
  const page = (await getPageBySlug('media')) as Page | null
  const schedules = await getActiveSchedule()
  if (!page) return <div>not found</div>
  return (
    <main className="w-full overflow-x-hidden">
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
                <ScheduleBox schedules={schedules} />
              </div>
            )
          case 'InterviewBlock':
            return <MediaSection key={block.id} interviews={block.interviews} />
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}
