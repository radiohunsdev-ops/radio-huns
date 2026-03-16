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

  const formatHeading = (text: string) => {
    const parts = text.split(/(\*.*?\*)/g)
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <span key={index} className="text-[#F4B860]">
            {part.replace(/\*/g, '')}
          </span>
        )
      }
      return part
    })
  }

  return (
    <div>
      <div className="max-w-8xl container mx-auto px-6 py-20 grid grid-cols-[40%_60%] items-start">
        <h1
          className={`text-[78px] ml-7.5 max-w-lg font-serif font-extrabold leading-[1.05] tracking-wide ${headingColor}`}
        >
          {formatHeading(heading)}
        </h1>

        <div className="text-[#3B4A54] font-serif text-xl max-w-4xl leading-relaxed space-y-6">
          <div className="max-w-full mt-0 text-[1.4vw] [&_a]:text-[#E55322] [&_a]:underline [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2">
            <RichText data={body} />
          </div>
        </div>
      </div>
    </div>
  )
}
