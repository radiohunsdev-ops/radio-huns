import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import CalendarSection from '../components/CalendarSection'
import TributeDisclaimer from '../components/TributeDisclaimer'
import SupportPromotionSection from '../components/SupportPromotionSection'
import ImageContainer from '../components/ImageContainer'
import Footer from '../components/footer/Footer'
type Page = {
  title: string
  layout: PageBlock[]
}
export default async function HomePage() {
  const page = (await getPageBySlug('community')) as Page | null
  const schedules = await getActiveSchedule()
  if (!page) return <div>not found</div>
  return (
    <main className="w-full overflow-x-hidden">
      {page.layout?.map((block) => {
        switch (block.blockType) {
          case 'banner':
            return (
              <section key={block.id}>
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
              </section>
            )
          case 'contentSection':
            return <CalendarSection key={block.id} heading={block.heading} body={block.body} />
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
          case 'supportPromotion':
            return (
              <SupportPromotionSection
                key={block.id}
                title={block.title}
                body={block.body}
                organizations={block.organizations}
              />
            )
          case 'image-banner':
            return <ImageContainer key={block.id} image={block.image} />
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}
