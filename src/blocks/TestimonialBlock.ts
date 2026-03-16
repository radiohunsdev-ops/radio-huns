import { Block } from "payload";


export const TestimonialBlock: Block = {
  slug: "testimonial",
  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
      label: "Quote",
    },
    {
      name: "author",
      type: "text",
      required: true,
      label: "Author",
    },
    {
      name: "colorScheme",
      type: "radio",
      required: true,
      defaultValue: "highlight-on-beige",
      label: "Colour Scheme",
      options: [
        {
          label: "Beige text on highlight background",
          value: "beige-on-highlight",
        },
        {
          label: "Highlight colour on yellow background",
          value: "highlight-on-yellow",
        },
        {
          label: "Highlight colour on beige background",
          value: "highlight-on-beige",
        },
      ],
    },
  ],
};