/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useMemo, useCallback } from 'react'
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

const BUTTON_REGEX = /\[button\s+text="([^"]+)"\s+url="([^"]+)"\]/i
const LINK_REGEX = /<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/gi

const Halvesection = ({ heading, body, image }: HalvesectionProps) => {
  const formattedHeading = useMemo(() => {
    return heading.split(/(\*.*?\*)/g).map((part, index) =>
      part.startsWith('*') && part.endsWith('*') ? (
        <span key={index} className="text-[#F4B860]">
          {part.slice(1, -1)}
        </span>
      ) : (
        part
      ),
    )
  }, [heading])

  const parseLinks = useCallback((text: string, index: number) => {
    const parts: React.ReactNode[] = []
    let lastIndex = 0

    const regex = new RegExp(LINK_REGEX)
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      const [fullMatch, href, linkText] = match

      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }

      parts.push(
        <a
          key={`link-${index}-${match.index}`}
          href={href}
          className="text-[#E75023] underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText.trim() || href}
        </a>,
      )

      lastIndex = match.index + fullMatch.length
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length ? parts : text
  }, [])

  const renderParagraph = useCallback(
    (text: string, index: number) => {
      if (!text.trim()) return <p key={index} />

      const buttonMatch = text.match(BUTTON_REGEX)
      if (buttonMatch) {
        const [, btnText, url] = buttonMatch

        return (
          <a
            key={`btn-${index}`}
            href={url}
            className="flex items-center gap-3 sm:gap-4 text-[#E75023] 
                       text-lg sm:text-xl md:text-2xl 
                       hover:opacity-80 transition"
          >
            {btnText}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </a>
        )
      }

      return (
        <p key={index} className="text-base sm:text-lg md:text-xl">
          {parseLinks(text, index)}
        </p>
      )
    },
    [parseLinks],
  )

  const paragraphs = useMemo(() => {
    return body?.root?.children?.map((node, index) => {
      if (node.type !== 'paragraph') return null

      const text = node.children?.map((child) => child?.text || '').join('') || ''

      return renderParagraph(text, index)
    })
  }, [body, renderParagraph])

  return (
    <section className="w-full bg-[#FBF6EE] font-serif">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        <div className="lg:col-span-6 px-6 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center">
          <h2 className="text-3xl pt-10 sm:text-5xl md:text-6xl lg:text-7xl text-[#E75023] font-bold mb-6 sm:mb-8">
            {formattedHeading}
          </h2>

          <div
            className="text-[#3B4A54] 
                          text-base sm:text-lg md:text-xl 
                          max-w-3xl pb-10 leading-relaxed space-y-4 sm:space-y-6"
          >
            {paragraphs}
          </div>
        </div>

        <div className="lg:col-span-6 relative overflow-hidden">
          {/* Responsive Image Height */}
          <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[50vh]">
            <img
              src={image?.url}
              alt={image?.alt || 'Hero background'}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <SecondIconContainer />
        </div>
      </div>
    </section>
  )
}

export default Halvesection
