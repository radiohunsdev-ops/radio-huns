type Props = {
  images: {
    image: {
      url: string
      alt?: string
    }
    size?: string
  }[]
}

export default function ImageSection({ images }: Props) {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-20">
        <div className="mb-12 sm:mb-14 lg:mb-16 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-[#E75023] mb-4">
            Our Gallery
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
            A dynamic look at our studio life and community events.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative w-full ${
                img.size || 'h-62.5 sm:h-75 lg:h-87.5'
              } overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-100 break-inside-avoid group shadow-sm hover:shadow-xl transition-all duration-500`}
            >
              {img.image?.url && (
                <img
                  src={img.image.url}
                  alt={img.image.alt || 'gallery image'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
