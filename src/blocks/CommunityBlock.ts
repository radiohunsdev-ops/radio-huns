import { Block } from 'payload'

export const CommunityBlock: Block = {
  slug: 'community-section',
  labels: {
    singular: 'Community Section',
    plural: 'Community Sections',
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
