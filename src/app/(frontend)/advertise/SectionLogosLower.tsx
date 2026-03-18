/* eslint-disable @next/next/no-img-element */

import { SponsorItem } from '../types/blocks'

type Props = {
  sponsors: SponsorItem[]
  ctaText?: string
  ctaLink?: string
}

export default function SectionLogosLower({ sponsors, ctaText, ctaLink }: Props) {
  const allItems = [...(sponsors ?? [])]

  return (
    <section className="relative bg-[#E75023] px-[5.8vw] py-[6.5vw] h-auto md:h-[35vh]">
      <div className="relative flex w-full justify-center h-auto md:h-[40vh]">
        <div
          className="
          relative md:absolute md:-top-50 z-20
          w-full h-auto md:h-[30vh]
          bg-[#F9B855]
        "
        >
          <div className="mx-auto max-w-7xl px-4 md:px-8 h-full">
            <div className="hidden md:grid grid-cols-4 gap-18 h-full items-center">
              {allItems.map((sponsor, i) => (
                <div key={i} className="relative flex items-center justify-center h-full">
                  {sponsor.link ? (
                    <a
                      href={sponsor.link}
                      target="_blank"
                      className="flex items-center justify-center w-full h-full"
                    >
                      <img
                        src={sponsor.logo?.url}
                        alt="sponsor"
                        className="max-h-20 w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={sponsor.logo?.url}
                      alt="sponsor"
                      className="max-h-20 w-auto object-contain"
                    />
                  )}
                  <span className="absolute -right-8 top-1/2 -translate-y-1/2 h-[50%] w-px bg-white/30" />
                </div>
              ))}

              <div className="flex flex-col items-center justify-center text-center h-full">
                <p className="text-lg text-white">{ctaText}</p>
                {ctaLink && (
                  <a href={ctaLink} className="text-red-600 text-lg">
                    click here
                  </a>
                )}
              </div>
            </div>

            <div className="md:hidden grid grid-cols-2">
              {allItems.slice(0, 2).map((sponsor, i) => (
                <div
                  key={i}
                  className={`
                    flex items-center justify-center
                    py-7 px-5
                    border-b border-white/30
                    ${i === 0 ? 'border-r border-white/30' : ''}
                  `}
                >
                  {sponsor.link ? (
                    <a
                      href={sponsor.link}
                      target="_blank"
                      className="flex items-center justify-center w-full"
                    >
                      <img
                        src={sponsor.logo?.url}
                        alt="sponsor"
                        className="max-h-10 w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={sponsor.logo?.url}
                      alt="sponsor"
                      className="max-h-10 w-auto object-contain"
                    />
                  )}
                </div>
              ))}

              {allItems.slice(2).map((sponsor, i) => (
                <div
                  key={i + 2}
                  className={`
                    flex items-center justify-center
                    py-7 px-5
                    ${i === 0 ? 'border-r border-white/30' : ''}
                  `}
                >
                  {sponsor.link ? (
                    <a
                      href={sponsor.link}
                      target="_blank"
                      className="flex items-center justify-center w-full"
                    >
                      <img
                        src={sponsor.logo?.url}
                        alt="sponsor"
                        className="max-h-16 w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <img
                      src={sponsor.logo?.url}
                      alt="sponsor"
                      className="max-h-16 w-auto object-contain"
                    />
                  )}
                </div>
              ))}

              <div className="flex flex-col items-center justify-center text-center py-7 px-4">
                <p className="text-sm text-white leading-snug">{ctaText}</p>
                {ctaLink && (
                  <a href={ctaLink} className="text-red-600 text-sm mt-1 font-medium">
                    click here
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
