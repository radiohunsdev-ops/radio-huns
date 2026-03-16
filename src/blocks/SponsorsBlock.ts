import { Block } from 'payload'

export const SponsorsBlock: Block = {
  slug: 'sponsors',
  labels: {
    singular: 'Sponsors Section',
    plural: 'Sponsors Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Our Sponsors',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
    },

    {
      name: 'sponsors',
      type: 'array',
      label: 'Sponsors',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          label: 'Sponsor Website',
        },
      ],
    },

    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Text',
      defaultValue: 'To be a Huns Club sponsored business click here',
    },
    {
      name: 'ctaLink',
      type: 'text',
      label: 'CTA Link',
    },
  ],
}
