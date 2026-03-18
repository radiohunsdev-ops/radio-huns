/* eslint-disable @next/next/no-img-element */

type Media = {
  id: string
  url: string
  alt?: string
}

type SlideItem = {
  id: string
  images: Media[]
}

type ImageCollageProps = {
  slides: SlideItem[]
}

export default function ImageCollage({ slides }: ImageCollageProps) {
  const allImages = slides.flatMap((slide) => slide.images)

  if (!allImages.length) return null

  const mainImage = allImages[0]
  const gridImages = allImages.slice(1, 5)

  return (
    <div className="w-full">
      <div className="block md:hidden">
        {mainImage && (
          <div className="relative w-full aspect-4/3">
            <img
              src={mainImage.url}
              alt={mainImage.alt || ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        )}

        {gridImages.length > 0 && (
          <div className="grid grid-cols-2">
            {gridImages.map((image) => (
              <div key={image.id} className="relative aspect-square">
                <img
                  src={image.url}
                  alt={image.alt || ''}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:grid md:grid-cols-[60%_40%] md:h-[80vh]">
        <div className="relative">
          {mainImage && (
            <img
              src={mainImage.url}
              alt={mainImage.alt || ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        <div className="grid grid-cols-2 grid-rows-2">
          {gridImages.map((image) => (
            <div key={image.id} className="relative h-full">
              <img
                src={image.url}
                alt={image.alt || ''}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
