import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import CommunitySection from '../components/CommunitySection'
import TributeDisclaimer from '../components/TributeDisclaimer'
import DescriptionSection from '../components/DescriptionSection'
import ScheduleSection from '../components/ScheduleSection'
import QuoteSection from '../components/QouteSection'
import Halvesection from '../components/Halvesection'
import Footer from '../components/footer/Footer'

type Page = {
  title: string
  layout: PageBlock[]
}

export default async function Advertise() {
  const page = (await getPageBySlug('schedule')) as Page | null
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
                  textColor="#F9B855"
                  title={block.title}
                  headline={block.headline}
                  image={block.image}
                />
                <ScheduleBox schedules={schedules} />
              </div>
            )
          case 'contentSection':
            return <DescriptionSection key={block.id} heading={block.heading} body={block.body} />
          case 'scheduleSection':
            return <ScheduleSection key={block.id} schedules={schedules} />
          case 'community-section':
            return (
              <CommunitySection
                key={block.id}
                body={block.body}
                heading={block.heading}
                image={block.image}
                imagePosition={block.imagePosition}
              />
            )
          case 'testimonial':
            return (
              <TributeDisclaimer
                key={block.id}
                author={block.author}
                quote={block.quote}
                bgColor={block.bgColor}
                textColor={block.textColor}
              />
            )
          case 'highlightTextSection':
            return (
              <QuoteSection
                key={block.id}
                body={block.body}
                bgColor={block.bgColor}
                textColor={block.textColor}
              />
            )
          case 'halves-section':
            return (
              <Halvesection
                key={block.id}
                body={block.body}
                heading={block.heading}
                image={block.image}
              />
            )
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}
