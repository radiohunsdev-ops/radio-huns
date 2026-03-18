/* eslint-disable @next/next/no-img-element */

type ImageProps = {
  image: {
    url: string
    alt?: string
  }
}

const ImageContainer = ({ image }: ImageProps) => {
  return (
    <section>
      <div className="w-full h-62.5 sm:h-87.5 md:h-112.5 lg:h-150 xl:h-180">
        <img
          src={image?.url}
          alt={image?.alt || 'Hero background'}
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  )
}

export default ImageContainer
