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
      name: 'colourScheme',
      type: 'radio',
      required: true,
      label: 'Colour Scheme',
      options: [
        {
          label: 'Beige text on highlight background',
          value: 'beigeOnHighlight',
        },
        {
          label: 'Highlight colour on yellow background',
          value: 'highlightOnYellow',
        },
        {
          label: 'Highlight colour on beige background',
          value: 'highlightOnBeige',
        },
      ],
      defaultValue: 'beigeOnHighlight',
    },
  ],
}
