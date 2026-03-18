import React from 'react'

type QuoteSectionProps = {
  body: string
  bgColor: string
  textColor: string
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ body, bgColor, textColor }) => {
  return (
    <section className="w-full" style={{ backgroundColor: bgColor }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-22 flex items-center justify-center">
        <p
          className="text-center font-serif font-extralight leading-relaxed text-lg sm:text-xl md:text-2xl lg:text-3xl"
          style={{ color: textColor }}
        >
          {body}
        </p>
      </div>
    </section>
  )
}

export default QuoteSection
