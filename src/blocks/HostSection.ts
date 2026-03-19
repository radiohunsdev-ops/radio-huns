import { Block } from 'payload'

export const HostSection: Block = {
  slug: 'host-section',
  labels: {
    singular: 'host Section',
    plural: 'host Sections',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Section Image',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
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
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      admin: {
        placeholder: 'Community',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Body Content',
    },
  ],
}
