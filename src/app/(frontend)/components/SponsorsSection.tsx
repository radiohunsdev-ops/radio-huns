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
    <section className="bg-[#F6F1E7] pt-24 font-serif">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-[64px] md:text-[72px] font-extrabold text-[#E55322] mb-8">{title}</h2>

        {description && (
          <p className="text-[#3F4A54] text-[20px] leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="pt-15 mt-30">
        <SectionLogosLower sponsors={sponsors} ctaText={ctaText} ctaLink={ctaLink} />
      </div>
    </section>
  )
}
