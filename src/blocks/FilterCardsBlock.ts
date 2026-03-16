// blocks/FilterCardsBlock.ts
import { Block } from 'payload'

export const FilterCardsBlock: Block = {
  slug: 'filterCardsBlock',
  labels: {
    singular: 'Filter Cards Section',
    plural: 'Filter Cards Sections',
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      fields: [
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Events', value: 'events' },
            { label: 'Memories', value: 'memories' },
            { label: 'Spotlight', value: 'spotlight' },
            { label: 'Updates', value: 'updates' },
          ],
        },
        {
          name: 'date',
          type: 'text',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
          admin: {
            position: 'sidebar',
          },
        },

        {
          name: 'content',
          type: 'richText',
          label: 'Content',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'video',
          type: 'group',
          label: 'Video',
          fields: [
            {
              name: 'upload',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Upload video file',
              },
            },
            {
              name: 'url',
              type: 'text',
              label: 'Video URL',
              admin: {
                description: 'Paste YouTube, Vimeo, or external video URL',
              },
            },
          ],
        },
        {
          name: 'videoThumbnail',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Thumbnail image for video',
          },
        },

        {
          name: 'linkText',
          type: 'text',
          defaultValue: 'Read',
        },
        {
          name: 'link',
          type: 'text',
        },

        {
          name: 'audio',
          type: 'upload',
          relationTo: 'audio',
        },

        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            description: 'Used if image is not provided (#EDE2CF)',
          },
        },
        {
          name: 'textColor',
          type: 'text',
          admin: {
            description: 'Text color for card content (#1F3A44)',
          },
        },
      ],
    },
  ],
}
