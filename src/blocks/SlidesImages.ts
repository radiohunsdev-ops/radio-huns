import { Block } from 'payload'

export const SlidesImages: Block = {
  slug: 'slides',
  labels: {
    singular: 'Slides Section',
    plural: 'Slides Sections',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      fields: [
        {
          name: 'images',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          required: true,
        },
      ],
    },
  ],
}
