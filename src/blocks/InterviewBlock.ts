import { Block } from 'payload'

export const InterviewBlock: Block = {
  slug: 'InterviewBlock',
  labels: {
    singular: 'Interview Section',
    plural: 'Interview Sections',
  },
  fields: [
    {
      name: 'interviews',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'audio',
          type: 'upload',
          relationTo: 'audio',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
