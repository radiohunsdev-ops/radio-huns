import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'Jobs',
  admin: {
    useAsTitle: 'JobTitle',
    defaultColumns: ['JobTitle'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'Description',
      type: 'text',
      required: true,
    },
    {
      name: 'JobTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'JobDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'Salary',
      type: 'text',
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
