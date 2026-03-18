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
    <section className="w-full overflow-hidden">
      <div className="h-5 bg-white" />
      <div className="relative flex items-end justify-end bg-[#0071CE] h-20 md:h-30">
        <div className="w-40 md:w-65 h-14 md:h-40 bg-[#0055B8] flex items-center justify-center gap-4 md:gap-6 z-20">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#0055B8] transition"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#0055B8] transition"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full">
              <ImageCollage slides={[slide]} />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="flex justify-center gap-2 py-3 bg-white">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-[#0071CE] w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
