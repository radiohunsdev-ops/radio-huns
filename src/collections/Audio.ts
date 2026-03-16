import type { CollectionConfig } from 'payload'

export const Audio: CollectionConfig = {
  slug: 'audio',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
}
