import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import SponsorsSection from '../components/SponsorsSection'
import CommunitySection from '../components/CommunitySection'
import PricingSection from '../components/PricingSection'
import TributeDisclaimer from '../components/TributeDisclaimer'
import Footer from '../components/footer/Footer'

type Page = {
  title: string
  layout: PageBlock[]
}

export default async function Advertise() {
  const page = (await getPageBySlug('advertise')) as Page | null
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
                <div className="absolute left-0 w-full lg-bottom-40 z-20">
                  <div className="max-w-8xl mx-auto  flex justify-end">
                    <ScheduleBox schedules={schedules} />
                  </div>
                </div>
              </div>
            )
          case 'sponsors':
            return <SponsorsSection key={block.id} {...block} />
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
          case 'packages':
            return (
              <PricingSection
                key={block.id}
                subtitle={block.subtitle}
                title={block.title}
                packages={block.packages}
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
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}
