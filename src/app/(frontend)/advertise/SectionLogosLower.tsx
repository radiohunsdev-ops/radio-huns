/* eslint-disable @next/next/no-img-element */

import { SponsorItem } from '../types/blocks'

type Props = {
  sponsors: SponsorItem[]
  ctaText?: string
  ctaLink?: string
}

export default function SectionLogosLower({ sponsors, ctaText, ctaLink }: Props) {
  return (
    <section className="relative bg-[#E75023] h-[35vh] px-[5.8vw] py-[6.5vw]">
      <div className="relative flex w-full justify-center h-[40vh]">
        <div className="absolute -top-50 z-20 w-full h-[30vh] bg-[#F9B855]">
          <div className="mx-auto max-w-7xl px-8 h-full">
            <div className="grid grid-cols-4 gap-18 h-full items-center">
              {sponsors?.map((sponsor, i) => (
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
          </div>
        </div>
      </div>
    </section>
  )
}
