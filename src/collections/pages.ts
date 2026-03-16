import type { CollectionConfig } from 'payload'
import { Banner } from '../blocks/Banner'
import { ContentSection } from '@/blocks/ContentSection'
import { ScheduleSection } from '@/blocks/ScheduleSection'
import { HighlightTextSection } from '@/blocks/HighlightTextSection'
import { CommunityBlock } from '@/blocks/CommunityBlock'
import { ImageBanner } from '@/blocks/ImageBanner'
import { HalvesSection } from '@/blocks/HalvesSection'
import { TestimonialBlock } from '@/blocks/TestimonialBlock'
import { SlidesImages } from '@/blocks/SlidesImages'
import { VideoGallery } from '@/blocks/VideoGalleryBlock'
import { SupportPromotion } from '@/blocks/SupportPromotion'
import { SponsorsBlock } from '@/blocks/SponsorsBlock'
import { PackagesBlock } from '@/blocks/PackagesBlock'
import { FilterCardsBlock } from '@/blocks/FilterCardsBlock'
import { HostSection } from '@/blocks/HostSection'
import { JobsBlock } from '@/blocks/JobsBlock'
import { InterviewBlock } from '@/blocks/InterviewBlock'
import { ImageGallery } from '@/blocks/ImageGallery'
import { Gallery } from '@/blocks/GalleryBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Banner,
        ContentSection,
        ScheduleSection,
        HighlightTextSection,
        CommunityBlock,
        ImageBanner,
        HalvesSection,
        TestimonialBlock,
        SlidesImages,
        VideoGallery,
        SupportPromotion,
        SponsorsBlock,
        PackagesBlock,
        FilterCardsBlock,
        HostSection,
        JobsBlock,
        InterviewBlock,
        ImageGallery,
        Gallery,
      ],
    },
  ],
}
