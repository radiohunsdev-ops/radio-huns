import type { Block } from 'payload'

export const Banner: Block = {
  slug: 'banner',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Optional. If left blank, the title of the page will display.',
      },
    },
    {
      name: 'headline',
      type: 'textarea',
      label: 'Headline',
      required: true,
      admin: {
        description: 'Highlight text by surrounding it with asterisks (*).',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
