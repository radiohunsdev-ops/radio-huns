/* eslint-disable @next/next/no-img-element */
import React from 'react'
import SecondIconContainer from './icon/SecondIconContainer'
import { ArrowRight } from 'lucide-react'
type HalvesectionProps = {
  heading: string
  body: {
    root: {
      children: {
        type: string
        children?: {
          text?: string
        }[]
      }[]
    }
  }
  image: {
    url: string
    alt?: string
  }
}
const Halvesection = ({ heading, body, image }: HalvesectionProps) => {
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
    <section className="w-full bg-[#FBF6EE] font-serif">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          <div className="lg:col-span-6 px-6 lg:px-16 flex flex-col justify-center">
            <h2 className="text-7xl text-[#E75023]  font-bold mb-8">{formatHeading(heading)}</h2>
            <div className="text-[#3B4A54] font-serif text-xl max-w-3xl leading-relaxed space-y-6">
              {body?.root?.children?.map((node, pIndex) => {
                if (node.type !== 'paragraph') return null

                const fullText = (node.children ?? [])
                  .filter((child) => child?.text != null)
                  .map((child) => child.text)
                  .join('')

                if (!fullText.trim()) return <p key={pIndex} />

                // BUTTON SHORTCODE
                const buttonMatch = fullText.match(/\[button\s+text="([^"]+)"\s+url="([^"]+)"\]/i)

                if (buttonMatch) {
                  const [, text, url] = buttonMatch

                  return (
                    <a
                      key={`btn-${pIndex}`}
                      href={url}
                      className="flex items-center gap-4 text-[#E75023] text-2xl hover:opacity-80 transition"
                    >
                      {text}
                      <ArrowRight size={32} />
                    </a>
                  )
                }

                // LINK PARSER
                const linkRegex = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi
                const parts: React.ReactNode[] = []
                let lastIndex = 0
                let match: RegExpExecArray | null

                while ((match = linkRegex.exec(fullText)) !== null) {
                  const [, href, linkText] = match

                  if (match.index > lastIndex) {
                    parts.push(fullText.slice(lastIndex, match.index))
                  }

                  parts.push(
                    <a
                      key={`link-${pIndex}-${match.index}`}
                      href={href}
                      className="text-[#E75023] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkText.trim() || href}
                    </a>,
                  )

                  lastIndex = match.index + match[0].length
                }

                if (lastIndex < fullText.length) {
                  parts.push(fullText.slice(lastIndex))
                }

                if (parts.length === 0) {
                  return <p key={pIndex}>{fullText}</p>
                }

                return <p key={pIndex}>{parts}</p>
              })}
            </div>

            {/* <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-3 text-[#E75023] text-lg font-medium"
              >
                About Us
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E75023]">
                  →
                </span>
              </a>
            </div> */}
          </div>
          <div className="lg:col-span-6 relative overflow-hidden">
            <div className="relative h-[50vh] ">
              <img
                src={image?.url}
                alt={image?.alt || 'Hero background'}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <SecondIconContainer />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Halvesection
