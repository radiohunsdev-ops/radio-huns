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
      <div className="w-full h-140">
        <img src={image?.url} alt={image?.alt || 'Hero background'} className="w-full h-full" />
      </div>
    </section>
  )
}

export default ImageContainer
