import { Block } from 'payload'

export const VideoGallery: Block = {
  slug: 'VideoGallery',
  labels: {
    singular: 'Video Gallery',
    plural: 'Video Galleries',
  },
  fields: [
    {
      name: 'displayType',
      label: 'Display Type',
      type: 'radio',
      required: true,
      defaultValue: 'list',
      options: [
        { label: 'List', value: 'list' },
        { label: 'Slider', value: 'slider' },
      ],
    },
    {
      name: 'videos',
      label: 'Videos',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Video Title',
          type: 'text',
        },
        {
          name: 'youtubeUrl',
          label: 'YouTube URL',
          type: 'text',
          required: true,
        },
        {
          name: 'date',
          label: 'Video Date',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
            },
          },
        },
        {
          name: 'thumbnail',
          label: 'Custom Thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
      ],
    },
  ],
}
