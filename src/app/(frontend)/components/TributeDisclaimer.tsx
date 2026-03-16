import Testimonial from './icon/Testimonial'

type QuoteProps = {
  author: string
  quote: string
  colourScheme: string
}

export default function TributeDisclaimer({ author, quote, colourScheme }: QuoteProps) {
  const bgColor = colourScheme === 'highlight-on-yellow' ? 'bg-[#F9B855]' : 'bg-[#F3E6D4]'

  return (
    <section className={`relative w-full ${bgColor} overflow-hidden py-24`}>
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#E75023] leading-relaxed">
          {quote}
        </p>
        <span className="block mt-2 text-[#E75023]">–</span>
        <p className="mt-2 text-base md:text-lg text-[#E75023] font-serif">{author}</p>
      </div>
      <Testimonial colourScheme={colourScheme} />
    </section>
  )
}
