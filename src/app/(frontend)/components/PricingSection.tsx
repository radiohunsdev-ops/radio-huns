import { Check } from 'lucide-react'
import { PackageItem } from '../types/blocks'

type Props = {
  subtitle?: string
  title: string
  packages: PackageItem[]
}

export default function PricingSection({ subtitle, title, packages }: Props) {
  return (
    <section className="w-full bg-[#F3E6D4] py-24">
      <div className="text-center mb-20">
        {subtitle && (
          <h1 className="text-[56px] md:text-[64px] font-serif text-[#E55322] mb-4">{subtitle}</h1>
        )}

        <h2 className="text-[42px] md:text-[56px] font-serif text-[#F9B855]">{title}</h2>
      </div>

      <div className="max-w-7xl text-gray-900  mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
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
