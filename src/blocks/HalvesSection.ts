import { Block } from 'payload'

export const HalvesSection: Block = {
  slug: 'halves-section',
  labels: {
    singular: 'Halves Section',
    plural: 'Halves Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      admin: {
        placeholder: 'A tribute to *Name*',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Body Content',
    },
    {
      name: 'button',
      type: 'group',
      label: 'Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Section Image',
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      label: 'Image Position',
      options: [
        { label: 'Right', value: 'right' },
        { label: 'Left', value: 'left' },
      ],
      admin: {
        description: 'Choose whether image appears left or right',
      },
    },
  ],
}
