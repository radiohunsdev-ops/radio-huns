import { Block } from 'payload'

export const SupportPromotion: Block = {
  slug: 'supportPromotion',
  labels: {
    singular: 'Support & Promotion Section',
    plural: 'Support & Promotion Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Body Content',
    },
    {
      name: 'organizations',
      type: 'array',
      label: 'Supported Organizations',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
