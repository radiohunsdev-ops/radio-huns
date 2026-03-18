import Image from 'next/image'
import { useMemo } from 'react'

type BannerProps = {
  title: string
  headline: string
  image: {
    url: string
    alt?: string
  }
  textColor: string
}

const highlightText = (text: string) => {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line.split(/(\*.*?\*)/g).map((part, index) => {
        const isHighlighted = part.startsWith('*') && part.endsWith('*')

        return (
          <span key={index} className={isHighlighted ? 'text-[#F9B855]' : ''}>
            {isHighlighted ? part.slice(1, -1) : part}
          </span>
        )
      })}
    </span>
  ))
}

export default function Banner({ title, headline, image, textColor }: BannerProps) {
  const formattedHeadline = useMemo(() => highlightText(headline), [headline])

  return (
    <section
      className="
    relative w-full overflow-hidden
    min-h-[60vh] sm:min-h-[65vh] md:min-h-[75vh]
    lg:min-h-[90vh] xl:min-h-screen
    flex items-center
  "
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={image.url}
          alt={image.alt || 'Hero background'}
          fill
          priority
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      <div
        className="
          relative z-10 h-full flex items-center
          container mx-auto
          px-5 sm:px-8 md:px-12 lg:px-16 xl:px-18
          py-12 sm:py-16 md:py-20 lg:py-24
        "
      >
        <div className="font-serif text-white max-w-[90%] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <h2
            className="
              text-[11px] sm:text-sm md:text-base
              text-[#F9B855]
              mb-3 sm:mb-4 md:mb-5
              font-medium tracking-wide
            "
          >
            {title}
          </h2>

          <h1
            style={{ color: textColor }}
            className="
              font-extrabold tracking-wide
              leading-[1.1] sm:leading-[1.05] md:leading-[1.02]
              text-[32px] sm:text-[42px] md:text-[52px]
              lg:text-[64px] xl:text-[75px]
            "
          >
            {formattedHeadline}
          </h1>
        </div>
      </div>
    </section>
  )
}
