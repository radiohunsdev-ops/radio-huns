// /blocks/ContentSection.ts
import type { Block } from 'payload'

export const ContentSection: Block = {
  slug: 'contentSection',
  labels: {
    singular: 'Content Section',
    plural: 'Content Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      label: 'Heading',
      admin: {
        description: 'Highlight text by surrounding it with asterisks (*).',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Body',
    },
  ],
}
