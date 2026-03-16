/* eslint-disable @next/next/no-img-element */

type BannerProps = {
  title: string
  headline: string
  image: {
    url: string
    alt?: string
  }
  textColor: string
}

export default function Banner({ title, headline, image, textColor }: BannerProps) {
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
    <section className="max-w-8xl container   px-18  mx-auto">
      <div className="absolute inset-0">
        <img
          src={image?.url}
          alt={image?.alt || 'Hero background'}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 grid items-center min-h-[76vh]  ">
        <div className="text-white font-serif">
          <h2 className="text-2xl text-[#F9B855] mb-4">{title}</h2>
          <h1
            className={`text-[75px] text-[${textColor}]  max-w-2xl font-extrabold leading-[1.05] tracking-wide`}
          >
            {formatHeadline(headline)}
          </h1>
        </div>
      </div>
    </section>
  )
}
