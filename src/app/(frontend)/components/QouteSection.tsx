import React from 'react'

type QuoteSectionProps = {
  body: string
  colourScheme?: 'beigeOnHighlight' | 'orangeOnWhite' // add more schemes if needed
}

const QuoteSection: React.FC<QuoteSectionProps> = ({ body, colourScheme }) => {
  const bgColor = colourScheme === 'beigeOnHighlight' ? 'bg-[#E85B2A]' : 'bg-[#E85B2A]'

  const textColor = colourScheme === 'beigeOnHighlight' ? 'text-white' : 'text-white'

  return (
    <section className={`w-full ${bgColor}`}>
      <div className="max-w-3xl mx-auto  py-22 flex items-center justify-center">
        <p
          className={`text-center font-serif text-3xl font-extralight leading-relaxed  ${textColor}`}
        >
          {body}
        </p>
      </div>
    </section>
  )
}

export default QuoteSection
