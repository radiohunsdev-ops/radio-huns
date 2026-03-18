/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from 'lucide-react'
import IconContainer from './icon/IconContainer'

type CommunitySectionProps = {
  heading: string
  imagePosition?: 'left' | 'right'
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

export default function CommunitySection({
  heading,
  body,
  image,
  imagePosition = 'left',
}: CommunitySectionProps) {
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
    <section className="relative  w-full overflow-hidden bg-[#F9B855]">
      <div className="grid grid-cols-1  lg:grid-cols-[40%_60%] min-h-auto">
        <div
          className={`hidden lg:block relative h-screen ${
            imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <img
            src={image?.url}
            alt={image?.alt || 'Hero background'}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div
          className={`relative grid grid-rows-[auto_1fr] font-serif ${
            imagePosition === 'right' ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          <div className="grid grid-cols-[1fr_auto] lg:grid-cols-1 lg:contents">
            <div className="flex flex-col px-5 sm:px-8 md:px-10 py-12 sm:py-16 md:py-20 bg-[#FBF6EE]">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#E75023] font-bold mb-6 sm:mb-8">
                {formatHeading(heading)}
              </h2>

              <div className="text-[#3B4A54] font-serif text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed space-y-4 sm:space-y-6">
                {body?.root?.children?.map((node, pIndex) => {
                  if (node.type !== 'paragraph') return null

                  const fullText = (node.children ?? [])
                    .filter((child) => child?.text != null)
                    .map((child) => child.text)
                    .join('')

                  if (!fullText.trim()) return <p key={pIndex} />

                  const buttonRegex = /\[button\s+text="([^"]+)"\s+url="([^"]+)"\]/i
                  const buttonMatch = fullText.match(buttonRegex)

                  if (buttonMatch) {
                    const [, text, url] = buttonMatch

                    return (
                      <div key={pIndex} className="mt-6 sm:mt-8">
                        <a
                          href={url}
                          className="inline-flex items-center gap-3 sm:gap-4 text-[#E75023] py-2 font-serif text-base sm:text-lg md:text-xl transition"
                        >
                          {text}
                          <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </span>
                        </a>
                      </div>
                    )
                  }

                  const emailRegex = /<a href="mailto:([^"]+)".*?>(.*?)<\/a>/gi
                  const parts: React.ReactNode[] = []
                  let lastIndex = 0
                  let match: RegExpExecArray | null

                  while ((match = emailRegex.exec(fullText)) !== null) {
                    const [, email, linkText] = match

                    if (match.index > lastIndex) {
                      parts.push(fullText.slice(lastIndex, match.index))
                    }

                    parts.push(
                      <a
                        key={`link-${pIndex}-${match.index}`}
                        href={`mailto:${email}`}
                        className="text-[#E75023] underline wrap-break-word"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkText.trim() || email}
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
            </div>

            <div className="relative w-20 sm:w-28 lg:w-auto lg:min-h-0 overflow-hidden">
              <IconContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
