import { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote',
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'Author',
    },
    {
      name: 'bgColor',
      type: 'text',
      label: 'Background Color (Hex)',
      defaultValue: '#F3E6D4',
      required: true,
    },
    {
      name: 'textColor',
      type: 'text',
      label: 'Text Color (Hex)',
      defaultValue: '#E75023',
      required: true,
    },
  ],
}
