'use client'

import { useState } from 'react'
import ImageCollage from './ImageCollage'

type Media = {
  id: string
  url: string
  alt?: string
}

type SlideItem = {
  id: string
  images: Media[]
}

type GallerySectionProps = {
  slides: SlideItem[]
}

export default function GallerySection({ slides }: GallerySectionProps) {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <section className="w-full h-[87vh] pb-30 overflow-hidden">
      <div className="h-5 bg-[#ffffff]" />

      <div className="relative flex items-end justify-end bg-[#0071CE] h-30">
        <div className="w-65 h-40 bg-[#0055B8] flex items-center justify-center gap-6 z-20">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#0055B8] transition"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#0055B8] transition"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative h-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full">
              <ImageCollage slides={[slide]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
