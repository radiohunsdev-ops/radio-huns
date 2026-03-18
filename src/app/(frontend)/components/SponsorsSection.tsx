import SectionLogosLower from '../advertise/SectionLogosLower'
import { SponsorItem } from '../types/blocks'

type Props = {
  title: string
  description?: string
  sponsors: SponsorItem[]
  ctaText?: string
  ctaLink?: string
}

export default function SponsorsSection({ title, description, sponsors, ctaText, ctaLink }: Props) {
  return (
    <section className="bg-[#F6F1E7] pt-12 md:pt-24 font-serif">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
        <h2
          className="
          text-[40px] sm:text-[52px] md:text-[64px] lg:text-[72px]
          font-extrabold text-[#E55322]
          mb-4 md:mb-8
          leading-tight
        "
        >
          {title}
        </h2>

        {description && (
          <p
            className="
            text-[#3F4A54]
            text-[15px] sm:text-[18px] md:text-[20px]
            leading-relaxed
            max-w-3xl mx-auto
          "
          >
            {description}
          </p>
        )}
      </div>

      <div className="pt-6 sm:pt-10 md:pt-15 mt-6 sm:mt-14 md:mt-30">
        <SectionLogosLower sponsors={sponsors} ctaText={ctaText} ctaLink={ctaLink} />
      </div>
    </section>
  )
}
