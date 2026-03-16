import type { CollectionConfig } from 'payload'

export const Schedule: CollectionConfig = {
  slug: 'schedule',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'day', 'startTime', 'endTime', 'dj', 'image'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'text',
      required: true,
    },
    {
      name: 'dj',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'day',
      type: 'select',
      required: true,
      options: [
        { label: 'Monday', value: 'monday' },
        { label: 'Tuesday', value: 'tuesday' },
        { label: 'Wednesday', value: 'wednesday' },
        { label: 'Thursday', value: 'thursday' },
        { label: 'Friday', value: 'friday' },
        { label: 'Saturday', value: 'saturday' },
        { label: 'Sunday', value: 'sunday' },
      ],
    },
    {
      name: 'startTime',
      type: 'text',
      required: true,
      admin: {
        placeholder: '15:00',
      },
    },
    {
      name: 'endTime',
      type: 'text',
      required: true,
      admin: {
        placeholder: '16:00',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
