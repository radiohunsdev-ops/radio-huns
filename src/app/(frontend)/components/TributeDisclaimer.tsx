'use client'

import Testimonial from './icon/Testimonial'

type QuoteProps = {
  author: string
  quote: string
  bgColor: string
  textColor: string
}

export default function TributeDisclaimer({ author, quote, bgColor, textColor }: QuoteProps) {
  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-20 lg:py-24"
      style={{ backgroundColor: bgColor }}
    >
      <div className="relative z-10 mx-auto max-w-2xl md:max-w-3xl lg:max-w-4xl px-4 sm:px-6 text-center">
        <p
          className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-relaxed md:leading-loose"
          style={{ color: textColor }}
        >
          {quote}
        </p>

        <span className="block mt-4 md:mt-6 text-xl md:text-2xl" style={{ color: textColor }}>
          –
        </span>

        <p
          className="mt-2 md:mt-3 text-sm sm:text-base md:text-lg font-serif"
          style={{ color: textColor }}
        >
          {author}
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <Testimonial textColor={textColor} />
      </div>
    </section>
  )
}
