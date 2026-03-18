'use client'

import { Check } from 'lucide-react'
import { useState, useRef } from 'react'
import { PackageItem } from '../types/blocks'

type Props = {
  subtitle?: string
  title: string
  packages: PackageItem[]
}

export default function PricingSection({ subtitle, title, packages }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        setActiveIndex((prev) => Math.min(prev + 1, packages.length - 1))
      } else {
        setActiveIndex((prev) => Math.max(prev - 1, 0))
      }
    }
    touchStartX.current = null
  }

  return (
    <section className="w-full bg-[#F3E6D4] py-12 sm:py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 md:mb-20 px-4 sm:px-6">
        {subtitle && (
          <h1 className="text-[36px] sm:text-[44px] md:text-[56px] lg:text-[64px] font-serif text-[#E55322] mb-3 sm:mb-4 leading-tight">
            {subtitle}
          </h1>
        )}
        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[56px] font-serif text-[#F9B855] leading-tight">
          {title}
        </h2>
      </div>

      {/* ─── MOBILE: Tab switcher + single sliding card (below md) ─── */}
      <div className="md:hidden px-4 sm:px-6">
        {/* Tab buttons with animated underline */}
        <div className="flex justify-center gap-6 sm:gap-10 mb-8">
          {packages?.map((pkg, index) => (
            <button
              key={pkg.id || index}
              onClick={() => setActiveIndex(index)}
              className="relative pb-2 text-sm sm:text-base font-semibold uppercase font-serif tracking-wide text-gray-800 transition-colors focus:outline-none"
            >
              {pkg.name}
              <span
                className="absolute bottom-0 left-0 w-full h-[2.5px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: activeIndex === index ? '#E55322' : 'transparent',
                  transform: activeIndex === index ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'center',
                }}
              />
            </button>
          ))}
        </div>

        {/* Sliding card viewport */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {packages?.map((pkg, index) => (
              <div key={pkg.id || index} className="w-full shrink-0 px-1">
                <div
                  className="rounded-2xl px-6 py-10 text-center shadow-lg"
                  style={{ backgroundColor: pkg.backgroundColor || '#F9C36A' }}
                >
                  <h3 className="text-3xl font-bold uppercase font-serif mb-3 leading-tight">
                    {pkg.name}
                  </h3>

                  <p className="text-2xl font-semibold mb-7">
                    {pkg.price}{' '}
                    {pkg.duration && <span className="text-xs font-normal">/ {pkg.duration}</span>}
                  </p>

                  <div className="space-y-3 text-base">
                    {pkg.features?.map((feature, featureIndex: number) => {
                      const isTick =
                        feature.featureValue?.toLowerCase() === 'tickicon' ||
                        feature.featureValue === '✓'

                      return (
                        <div key={featureIndex} className="flex flex-col items-center">
                          <div>{feature.featureKey}</div>
                          <div
                            className={`flex justify-center ${featureIndex === 0 ? 'line-through' : ''}`}
                          >
                            {isTick ? <Check className="w-5 h-5 stroke-3" /> : feature.featureValue}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-5">
          {packages?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="w-2 h-2 rounded-full transition-all duration-300 focus:outline-none"
              style={{
                backgroundColor: activeIndex === index ? '#E55322' : '#C4A882',
                transform: activeIndex === index ? 'scale(1.4)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* ─── DESKTOP: Original 3-column grid (md and above, untouched) ─── */}
      <div className="hidden md:grid max-w-7xl text-gray-900 mx-auto md:grid-cols-3 gap-8 px-6">
        {packages?.map((pkg, index) => (
          <div
            key={pkg.id || index}
            className="rounded-3xl px-10 py-16 text-center shadow-lg hover:scale-[1.02] transition"
            style={{
              backgroundColor: pkg.backgroundColor || '#F9C36A',
            }}
          >
            <h3 className="text-5xl font-bold uppercase font-serif mb-4">{pkg.name}</h3>

            <p className="text-3xl font-semibold mb-10">
              {pkg.price}{' '}
              {pkg.duration && <span className="text-sm font-normal">/ {pkg.duration}</span>}
            </p>

            <div className="space-y-4 text-lg">
              {pkg.features?.map((feature, featureIndex: number) => {
                const isTick =
                  feature.featureValue?.toLowerCase() === 'tickicon' || feature.featureValue === '✓'

                return (
                  <div key={featureIndex} className="flex flex-col items-center">
                    <div>{feature.featureKey}</div>
                    <div
                      className={`flex justify-center ${featureIndex === 0 ? 'line-through' : ''}`}
                    >
                      {isTick ? <Check className="w-6 h-6 stroke-3" /> : feature.featureValue}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
