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
    <section className="w-full h-screen">
      <div className="grid grid-cols-[50%_50%] h-full mt-2">
        <div className="relative h-full">
          <Image
            src={images[0].image.url}
            alt={images[0].image.alt || ''}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 h-full">
          {images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative">
              <Image src={img.image.url} alt={img.image.alt || ''} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
