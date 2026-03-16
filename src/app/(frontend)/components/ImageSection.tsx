import Image from 'next/image'
type Props = {
  images: {
    image: {
      url: string
      alt: string
    }
    size?: string
  }[]
}

export default function ImageSection({ images }: Props) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-8xl mx-auto px-20 ">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black font-serif text-[#E75023] mb-4">
            Our Gallery
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A dynamic look at our studio life and community events.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative w-full ${img.size} overflow-hidden rounded-3xl bg-gray-100 break-inside-avoid group shadow-sm hover:shadow-xl transition-all duration-500`}
            >
              <Image
                src={img.image.url}
                alt={img.image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
