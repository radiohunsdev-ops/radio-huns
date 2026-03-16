import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import DescriptionSection from '../components/DescriptionSection'
import HostSection from '../components/HostSection'

type Page = {
  title: string
  layout: PageBlock[]
}
export default async function HomePage() {
  const page = (await getPageBySlug('meet-our-hosts')) as Page | null
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
          case 'contentSection':
            return <DescriptionSection key={block.id} heading={block.heading} body={block.body} />
          case 'host-section':
            return (
              <HostSection
                key={block.id}
                body={block.body}
                heading={block.heading}
                image={block.image}
                imagePosition={block.imagePosition}
              />
            )
          default:
            return null
        }
      })}
    </main>
  )
}
