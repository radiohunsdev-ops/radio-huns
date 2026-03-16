import { Block } from 'payload'

export const PackagesBlock: Block = {
  slug: 'packages',
  labels: {
    singular: 'Packages Section',
    plural: 'Packages Sections',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Radio Huns 2020-2021',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Advertising Packages',
      required: true,
    },
    {
      name: 'packages',
      type: 'array',
      label: 'Packages',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Package Name',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          required: true,
        },
        {
          name: 'duration',
          type: 'text',
          label: 'Duration',
          defaultValue: 'per month',
        },
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Background Color',
          admin: {
            description: 'Example: #E8A64D',
          },
        },
        {
          name: 'features',
          type: 'array',
          label: 'Package Features',
          fields: [
            {
              name: 'featureKey',
              type: 'text',
              label: 'Feature',
            },
            {
              name: 'featureValue',
              type: 'text',
              label: 'feature-line2',
            },
          ],
        },
      ],
    },
  ],
}
