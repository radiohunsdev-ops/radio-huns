import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import DescriptionSection from '../components/DescriptionSection'
import QuoteSection from '../components/QouteSection'

type Page = {
  title: string
  layout: PageBlock[]
}

export default async function Advertise() {
  const page = (await getPageBySlug('charter')) as Page | null
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
                <ScheduleBox schedules={schedules} />
              </div>
            )
          case 'contentSection':
            return <DescriptionSection key={block.id} heading={block.heading} body={block.body} />
          case 'highlightTextSection':
            return (
              <QuoteSection key={block.id} body={block.body} colourScheme={block.colourScheme} />
            )
          default:
            return null
        }
      })}
    </main>
  )
}
