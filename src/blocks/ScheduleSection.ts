import type { Block } from 'payload'

export const ScheduleSection: Block = {
  slug: 'scheduleSection',
  labels: {
    singular: 'Schedule Section',
    plural: 'Schedule Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Schedule',
    },
    {
      name: 'layout',
      type: 'radio',
      required: true,
      options: [
        {
          label: 'List',
          value: 'list',
        },
        {
          label: 'Slider',
          value: 'slider',
        },
      ],
      defaultValue: 'list',
    },
  ],
}
