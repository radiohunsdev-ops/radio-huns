import Testimonial from './icon/Testimonial'

type QuoteProps = {
  author: string
  quote: string
  bgColor: string
  textColor: string
}

export default function TributeDisclaimer({ author, quote, bgColor, textColor }: QuoteProps) {
  return (
    <section className="relative w-full overflow-hidden py-24" style={{ backgroundColor: bgColor }}>
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed"
          style={{ color: textColor }}
        >
          {quote}
        </p>

        <span className="block mt-2" style={{ color: textColor }}>
          –
        </span>

        <p className="mt-2 text-base md:text-lg font-serif" style={{ color: textColor }}>
          {author}
        </p>
      </div>

      <Testimonial textColor={textColor} />
    </section>
  )
}
