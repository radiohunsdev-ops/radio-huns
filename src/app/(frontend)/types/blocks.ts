export type BannerBlock = {
  id: string
  blockType: 'banner'
  title: string
  headline: string
  image: {
    url: string
    alt?: string
  }
}

export type ContentSectionBlock = {
  id: string
  blockType: 'contentSection'
  heading: string
  body: never
}

export type ScheduleSectionBlock = {
  id: string
  blockType: 'scheduleSection'
  layout: string
}

export type HighlightTextSectionBlock = {
  id: string
  blockType: 'highlightTextSection'
  body: string
  bgColor: string
  textColor: string
}

// ----slides images----//
export type Media = {
  id: string
  url: string
  alt?: string
}

export type SlideItem = {
  id: string
  images: Media[]
}

export type SlidesImageBlock = {
  id: string
  blockType: 'slides'
  slides: SlideItem[]
}
// ----slides images----//

// ----slides videos----//
export type Media2 = {
  url: string
  alt?: string
}

export type VideoItem = {
  id?: string
  title?: string
  youtubeUrl: string
  date?: string
  thumbnail?: Media2 | null
}

export type VideoBlock = {
  id: string
  blockType: 'VideoGallery'
  displayType: 'list' | 'slider'
  videos: VideoItem[]
}

// ----slides videos----//

export type TributeDisclaimerBlock = {
  id: string
  blockType: 'testimonial'
  quote: string
  author: string
  bgColor: string
  textColor: string
}

export type RichText = {
  root: {
    children: {
      type: string
      children?: { text?: string }[]
    }[]
  }
}

export type CommunitySectionBlock = {
  id: string
  blockType: 'community-section'
  heading: string
  body: RichText
  image: {
    url: string
    alt?: string
  }
  imagePosition?: 'left' | 'right'
}

export type ImageBanner = {
  id: string
  blockType: 'image-banner'
  image: {
    url: string
    alt?: string
  }
}
export type HalvesectionBlock = {
  id: string
  blockType: 'halves-section'
  heading: string
  body: RichText
  button: string
  image: {
    url: string
    alt?: string
  }
  imagePosition?: 'left' | 'right'
}
export type Organization = {
  id?: string
  name: string
  logo: {
    url: string
    alt?: string
  }
}

export type SupportPromotionBlock = {
  id: string
  blockType: 'supportPromotion'
  title: string
  body: RichText
  organizations: Organization[]
}

export type SponsorItem = {
  id?: string
  logo: Media
  link?: string
}

export type SponsorsBlockType = {
  id: string
  blockType: 'sponsors'
  title: string
  description?: string
  sponsors: SponsorItem[]
  ctaText?: string
  ctaLink?: string
}
export type FeatureItem = {
  featureKey: string
  featureValue: string
}
export type PackageItem = {
  id?: string
  name: string
  price: string
  duration?: string
  backgroundColor?: string
  features: FeatureItem[]
}

export type HostSectionBlock = {
  id: string
  blockType: 'host-section'
  heading: string
  slug: string
  body: RichText
  image: {
    url: string
    alt?: string
  }
  imagePosition?: 'left' | 'right'
}

export type CardItem = {
  id?: string
  category: 'events' | 'memories' | 'spotlight' | 'updates'
  date?: string
  title: string
  slug: string
  linkText?: string
  link?: string
  image?: string | Media
  video?: string | Media
  videoThumbnail?: string | Media
  audio?: string | Media
  backgroundColor?: string
  textColor?: string
}
export type PackagesBlockType = {
  id: string
  blockType: 'packages'
  subtitle?: string
  title: string
  packages: PackageItem[]
}
export type FilterCardsBlock = {
  id: string
  blockType: 'filterCardsBlock'
  cards?: CardItem[]
}

export type JobItem = {
  id?: string
  title: string
  description: string
  JobTitle: string
  JobDescription: string
  slug: string
  image: {
    url: string
    alt?: string
  }
}

export type JobsBlock = {
  id: string
  blockType: 'jobsBlock'
  image: {
    url: string
    alt?: string
  }
  jobs: JobItem[]
}

export type InterviewItem = {
  id?: string
  title: string
  image?: {
    url: string
    alt?: string
  }
  audio?: {
    url: string
  }
}

export type InterviewBlockType = {
  id: string
  blockType: 'InterviewBlock'
  interviews: InterviewItem[]
}
export type ImageCollageBlock = {
  id: string
  blockType: 'imageGallery'
  images: {
    image: {
      url: string
      alt?: string
    }
  }[]
}

export type Gallery = {
  id: string
  blockType: 'gallery'
  description: string
  title: string
  images: {
    image: {
      url: string
      alt: string
    }
  }[]
}

export type PageBlock =
  | BannerBlock
  | ContentSectionBlock
  | ScheduleSectionBlock
  | HighlightTextSectionBlock
  | CommunitySectionBlock
  | ImageBanner
  | HalvesectionBlock
  | TributeDisclaimerBlock
  | SlidesImageBlock
  | VideoBlock
  | SupportPromotionBlock
  | SponsorsBlockType
  | PackagesBlockType
  | FilterCardsBlock
  | HostSectionBlock
  | JobsBlock
  | InterviewBlockType
  | ImageCollageBlock
  | Gallery

export type Page = {
  title: string
  layout: PageBlock[]
}
