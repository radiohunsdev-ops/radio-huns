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
    <section className="relative w-full overflow-hidden bg-[#F9B855]">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-screen">
        <div
          className={`relative h-screen ${imagePosition === 'right' ? 'lg:order-2' : 'lg:order-1'}`}
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
          <div className="flex flex-col px-10 py-20 bg-[#FBF6EE]">
            <h2 className="text-7xl text-[#E75023] font-bold mb-8">{formatHeading(heading)}</h2>

            <div className="text-[#3B4A54] font-serif text-xl max-w-3xl leading-relaxed space-y-6">
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
                    <div key={pIndex} className="mt-8">
                      <a
                        href={url}
                        className="inline-flex items-center gap-4  text-[#E75023]  py-2 font-serif text-xl  transition"
                      >
                        {text}

                        <span className="w-10 h-10 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-5 h-5" />
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
                      className="text-[#E75023] underline"
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

          <IconContainer />
        </div>
      </div>
    </section>
  )
}
