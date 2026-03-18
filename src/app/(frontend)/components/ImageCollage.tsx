import Image from 'next/image'

type Props = {
  images: {
    image: {
      url: string
      alt?: string
    }
  }[]
}

export default function ImageCollage({ images }: Props) {
  if (!images || images.length < 5) return null

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[50%_50%] gap-2 h-auto lg:h-screen">
        <div className="relative w-full h-[60vw] md:h-[40vw] lg:h-full">
          <Image
            src={images[0].image.url}
            alt={images[0].image.alt || ''}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 h-[60vw] md:h-[40vw] lg:h-full">
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative w-full h-full">
              <Image src={img.image.url} alt={img.image.alt || ''} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
