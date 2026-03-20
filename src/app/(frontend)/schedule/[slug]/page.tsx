import { getPageBySlug } from '@/lib/getPage'
import HostSection from '../../components/HostSection'
import Footer from '../../components/footer/Footer'

type HostBlock = {
  id: string
  blockType: 'host-section'
  slug: string
  heading: string
  body: any
  image: {
    url: string
    alt?: string
  }
  imagePosition?: 'left' | 'right'
}

type PageType = {
  layout: HostBlock[]
}

export default async function HostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const page = (await getPageBySlug('meet-our-hosts')) as PageType | null

  if (!page) return <div>not found</div>

  const host = page.layout?.find(
    (block) => block.blockType === 'host-section' && block.slug === slug,
  )

  if (!host) return <div>Host not found</div>

  return (
    <main className="w-full overflow-x-hidden pt-40 bg-amber-700">
      <HostSection
        slug={host.slug}
        heading={host.heading}
        body={host.body}
        image={host.image}
        imagePosition={host.imagePosition}
      />
      <Footer />
    </main>
  )
}
