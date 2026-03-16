import { getPayloadClient } from './payloadClient'

export async function getPageBySlug(slug: string) {
  const payload = await getPayloadClient()

  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
  })

  return page.docs[0] || null
}
