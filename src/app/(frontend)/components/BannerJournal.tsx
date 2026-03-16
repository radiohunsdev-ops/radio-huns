/* eslint-disable @next/next/no-img-element */

type BannerProps = {
  title: string
  headline: string
  image: {
    url: string
    alt?: string
  }
  textColor?: string
}

export default function BannerJournal({
  title,
  headline,
  image,
  textColor = '#ffffff',
}: BannerProps) {
  const formatHeadline = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*.*?\*)/g)

      return (
        <span key={i} className="block">
          {parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              return (
                <span key={index} className="text-[#F9B855]">
                  {part.replace(/\*/g, '')}
                </span>
              )
            }
            return part
          })}
        </span>
      )
    })
  }

  return (
    <section className=" max-w-8xl container mx-auto overflow-hidden min-h-[76vh]">
      <img
        src={image?.url}
        alt={image?.alt || 'Hero background'}
        className="absolute inset-0 h-full w-full object-cover object-top"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex items-center min-h-[76vh] px-16">
        <div className="font-serif">
          <h2 className="text-2xl text-[#F9B855] mb-4">{title}</h2>

          <h1
            style={{ color: textColor }}
            className="text-[60px] max-w-3xl font-light leading-[1.08] tracking-wide"
          >
            {formatHeadline(headline)}
          </h1>
        </div>
      </div>
    </section>
  )
}
