import { getPayloadClient } from '@/lib/payloadClient'

export async function getActiveSchedule() {
  const payload = await getPayloadClient()

  const data = await payload.find({
    collection: 'schedule',
    where: {
      active: {
        equals: true,
      },
    },
    limit: 100,
  })

  return data.docs
}
