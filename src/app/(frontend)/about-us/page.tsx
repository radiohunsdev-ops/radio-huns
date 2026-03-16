import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import DescriptionSection from '../components/DescriptionSection'
import QuoteSection from '../components/QouteSection'
import CommunitySection from '../components/CommunitySection'
import ImageContainer from '../components/ImageContainer'
import Halvesection from '../components/Halvesection'
import TributeDisclaimer from '../components/TributeDisclaimer'
import GallerySection from '../components/image-slider/GallerySection'
import VideoSection from '../components/VideoSection'
import Footer from '../components/footer/Footer'

type Page = {
  title: string
  layout: PageBlock[]
}

export default async function HomePage() {
  const page = (await getPageBySlug('about-us')) as Page | null
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
          case 'slides':
            return <GallerySection key={block.id} slides={block.slides} />
          case 'highlightTextSection':
            return (
              <QuoteSection
                key={block.id}
                body={block.body}
                bgColor={block.bgColor}
                textColor={block.textColor}
              />
            )
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
          case 'image-banner':
            return <ImageContainer key={block.id} image={block.image} />
          case 'VideoGallery':
            return <VideoSection key={block.id} videos={block.videos} />

          case 'halves-section':
            return (
              <Halvesection
                key={block.id}
                body={block.body}
                heading={block.heading}
                image={block.image}
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
