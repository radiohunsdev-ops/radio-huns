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
    <div className="h-full w-full grid grid-cols-[60%_40%]">
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
  )
}
