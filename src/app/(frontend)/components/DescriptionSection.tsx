'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { usePathname } from 'next/navigation'

type DescriptionSectionProps = {
  heading: string
  body: never
}

export default function DescriptionSection({ heading, body }: DescriptionSectionProps) {
  const pathname = usePathname()
  const headingColor = pathname === '/about-us' ? 'text-blue-600' : 'text-[#E75023]'

  const formatHeading = (text: string) =>
    text.split(/(\*.*?\*)/g).map((part, index) =>
      part.startsWith('*') && part.endsWith('*') ? (
        <span key={index} className="text-[#F4B860]">
          {part.slice(1, -1)}
        </span>
      ) : (
        part
      ),
    )

  return (
    <div className="max-w-8xl container mx-auto px-4 sm:px-5 md:px-6 lg:px-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[40%_60%] items-start gap-y-4 md:gap-y-6 lg:gap-y-0">
      <h1
        className={`text-[42px] sm:text-[52px] md:text-[62px] lg:text-[78px] ml-0 sm:ml-2 md:ml-4 lg:ml-7.5 max-w-full lg:max-w-lg font-serif font-extrabold leading-[1.05] tracking-wide ${headingColor}`}
      >
        {formatHeading(heading)}
      </h1>

      <div className="text-[#3B4A54] font-serif text-xl max-w-4xl leading-relaxed ">
        <div className="max-w-full mt-0 text-[4.5vw] sm:text-[3.2vw] md:text-[2.4vw] lg:text-[1.4vw] [&_a]:text-[#E55322] [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2">
          <RichText data={body} />
        </div>
      </div>
    </div>
  )
}
