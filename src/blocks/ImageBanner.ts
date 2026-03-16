import { Block } from 'payload'

export const ImageBanner: Block = {
  slug: 'image-banner',
  labels: {
    singular: 'Image Banner',
    plural: 'Image Banners',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Banner Image',
    },
    {
      name: 'overlay',
      type: 'checkbox',
      defaultValue: true,
      label: 'Enable Orange Overlay',
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 0.7,
      min: 0,
      max: 1,
      admin: {
        step: 0.1,
      },
      label: 'Overlay Opacity (0 - 1)',
    },
  ],
}
