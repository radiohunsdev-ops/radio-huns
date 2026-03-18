import { getPageBySlug } from '@/lib/getPage'
import { PageBlock } from '../types/blocks'
import { getActiveSchedule } from '@/lib/getSchedule'
import Banner from '../components/Banner'
import ScheduleBox from '../components/ScheduleBox'
import Footer from '../components/footer/Footer'
import ImageCollage from '../components/ImageCollage'
import ImageSection from '../components/ImageSection'

type Page = {
  title: string
  layout: PageBlock[]
}
export default async function HomePage() {
  const page = (await getPageBySlug('gallery')) as Page | null
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
                <div className="absolute left-0 w-full lg-bottom-40 z-20">
                  <div className="max-w-8xl mx-auto  flex justify-end">
                    <ScheduleBox schedules={schedules} />
                  </div>
                </div>
              </section>
            )
          case 'imageGallery':
            return <ImageCollage key={block.id} images={block.images} />
          case 'gallery':
            return <ImageSection key={block.id} images={block.images} />
          default:
            return null
        }
      })}
      <Footer />
    </main>
  )
}
