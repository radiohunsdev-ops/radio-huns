import React from 'react'

type QuoteSectionProps = {
  body: string
  bgColor: string
  textColor: string
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ body, bgColor, textColor }) => {
  return (
    <section className="w-full" style={{ backgroundColor: bgColor }}>
      <div className="max-w-3xl mx-auto py-22 flex items-center justify-center">
        <p
          className="text-center font-serif text-3xl font-extralight leading-relaxed"
          style={{ color: textColor }}
        >
          {body}
        </p>
      </div>
    </section>
  )
}

export default QuoteSection
