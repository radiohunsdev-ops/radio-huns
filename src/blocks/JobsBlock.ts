import { Block } from 'payload'

export const JobsBlock: Block = {
  slug: 'jobsBlock',
  labels: {
    singular: 'Jobs Section',
    plural: 'Jobs Sections',
  },
  fields: [
    {
      name: 'jobs',
      type: 'relationship',
      relationTo: 'Jobs',
      hasMany: true,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Section Image',
    },
  ],
}
