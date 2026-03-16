import type { Block } from 'payload'

export const HighlightTextSection: Block = {
  slug: 'highlightTextSection',
  labels: {
    singular: 'Highlight Text Section',
    plural: 'Highlight Text Sections',
  },
  fields: [
    {
      name: 'body',
      type: 'textarea',
      required: true,
      label: 'Body',
    },
    {
      name: 'bgColor',
      type: 'text',
      label: 'Background Color (Hex)',
      defaultValue: '#E85B2A',
      required: true,
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color (Hex)',
      defaultValue: '#ffffff',
      required: true,
    },
  ],
}
