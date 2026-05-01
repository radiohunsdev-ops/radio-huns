'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import FooterLogo from './FooterLogo'
import SocialLinks from './SocialLinks'

type InputProps = {
  label: string
  color: string
}

const Input = ({ label, color }: InputProps) => (
  <div>
    <label className="font-semibold text-sm md:text-base" style={{ color }}>
      {label}
    </label>
    <input
      type="text"
      className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 text-sm md:text-base"
    />
  </div>
)

type FooterItem = {
  label: string
  href: string
}

const FooterCol = ({ items }: { items: FooterItem[] }) => (
  <div className="pl-0 md:pl-7 space-y-2 text-xs md:text-sm">
    {items.map((item) => (
      <Link
        key={item.label}
        href={item.href}
        className="block cursor-pointer hover:opacity-70 transition"
      >
        {item.label}
      </Link>
    ))}
  </div>
)

const FormRow = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">{children}</div>
)

const Footer = () => {
  const pathname = usePathname()
  const isAbout = pathname === '/about-us'

  const primaryColor = isAbout ? '#0071CE' : '#E55322'
  const secondaryColor = isAbout ? '#0071CE' : '#E75023'

  return (
    <main className="min-h-screen font-serif flex flex-col bg-[#F6F1E7]">
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] min-h-[80vh]">
        <div className="flex flex-col">
          <div className="relative text-[#F6F1E7]" style={{ backgroundColor: primaryColor }}>
            <div className="px-6 sm:px-10 md:px-10 lg:px-15 py-10">
              <div className="flex w-full justify-between">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.05]">
                  Get in
                  <br />
                  <span className="text-[#F9B855]">touch</span>
                </h1>
                <div className="block lg:hidden md:hidden justify-center md:relative md:left-12 py-6 md:py-0">
                  <div className="h-20 w-20 md:h-37.5 md:w-37.5 p-2 pt-4 md:pt-9">
                    <FooterLogo fill="#F9B855" />
                  </div>
                </div>
              </div>

              <p className="mt-5 max-w-sm text-sm sm:text-base md:text-lg leading-relaxed">
                To contact Radio Huns, please fill in the form or email us with a few words about
                yourself and the nature of the query.
              </p>

              <div className="mt-6 md:mt-10 space-y-2 text-sm sm:text-base md:text-lg">
                <p>
                  <span className="font-semibold">E.</span> info@radiohuns.ca
                </p>
                <p>
                  <span className="font-semibold">T.</span> 613 518 8075
                </p>
              </div>

              <div className="mt-6 md:mt-8">
                <SocialLinks />
              </div>
            </div>
          </div>

          <div
            className="relative h-40 md:h-full overflow-hidden"
            style={{ backgroundColor: secondaryColor }}
          >
            <svg
              viewBox="0 0 345.6 282.2"
              preserveAspectRatio="xMidYMax meet"
              fill="#EDDECA"
              className="absolute bottom-0 left-0 w-full h-auto"
            >
              <path d="M5.8,253.9c12.1,0,24-2.3,35.2-6.8c11.6-4.7,22.1-11.6,30.9-20.5c8.9-8.9,15.9-19.6,20.6-31.3 c4.5-11.3,6.8-23.3,6.7-35.5c0-12-2.3-23.8-6.9-34.8c-4.7-11.4-11.6-21.8-20.4-30.5C63.4,86,53.4,79.2,42.4,74.4 c-10.7-4.7-22.2-7.1-33.9-7.2c-2.3,0-4.7,0.1-7.1,0.2L0,67.5v16.6L1.6,84c2.3-0.2,4.6-0.3,6.9-0.3c9.4,0,18.7,2,27.3,5.8 c9.1,4,17.3,9.6,24.3,16.6c7.2,7.2,12.9,15.7,16.8,25.1c3.7,9,5.7,18.7,5.7,28.5c0,10-1.8,20-5.5,29.4c-3.8,9.6-9.6,18.4-16.9,25.7 c-7.3,7.3-15.9,13-25.4,16.9c-9.2,3.7-19,5.6-29,5.6c-1.3,0-2.8,0-4.2-0.1L0,237.2v16.6l1.4,0.1C2.9,253.9,4.3,253.9,5.8,253.9z"></path>
            </svg>
          </div>
        </div>

        <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-10">
          <form className="space-y-10 md:space-y-16">
            <FormRow>
              <Input label="First name *" color={primaryColor} />
              <Input label="Surname *" color={primaryColor} />
            </FormRow>

            <FormRow>
              <Input label="Email address *" color={primaryColor} />
              <Input label="Subject" color={primaryColor} />
            </FormRow>

            <div>
              <label className="font-semibold text-sm md:text-base" style={{ color: primaryColor }}>
                Enter your message *
              </label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b border-gray-600 focus:outline-none py-2 resize-none text-sm md:text-base"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 md:pt-8">
              <p className="text-xs sm:text-sm" style={{ color: primaryColor }}>
                * Mandatory fields
              </p>

              <button
                className="flex items-center gap-3 md:gap-4 font-semibold text-base md:text-lg cursor-pointer"
                style={{ color: primaryColor }}
              >
                Send
                <span
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center"
                  style={{ borderColor: primaryColor }}
                >
                  →
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-[#F9B855] md:h-[20vh] grid grid-cols-1 md:grid-cols-[40%_60%]">
        <div className="hidden lg:block justify-center md:block md:relative md:left-12 py-6 md:py-0">
          <div className="h-20 w-20 md:h-37.5 md:w-37.5 p-2 pt-4 md:pt-9">
            <FooterLogo fill="#E75023 " />
          </div>
        </div>

        <div className="relative">
          <div
            className="relative md:absolute left-0 bottom-0 w-full md:w-[90%] pt-6 md:pt-10 md:h-[25vh]"
            style={{ backgroundColor: secondaryColor }}
          >
            <div
              className="text-[#F6F1E7] px-6 md:px-10 py-6 md:py-0"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-0 md:divide-x md:divide-[#F6F1E7]/30 text-xs md:text-sm mb-4 md:mb-3">
                <FooterCol
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Journal', href: '/journal' },
                    { label: 'Contact', href: '/contact' },
                  ]}
                />
                <FooterCol
                  items={[
                    { label: 'About Us', href: '/about-us' },
                    { label: 'Meet Our Hosts', href: '/hosts' },
                  ]}
                />
                <FooterCol
                  items={[
                    { label: 'Community', href: '/community' },
                    { label: 'Prizes', href: '/prizes' },
                  ]}
                />
                <FooterCol
                  items={[
                    { label: 'Advertise', href: '/advertise' },
                    { label: 'Charter', href: '/charter' },
                  ]}
                />
                <FooterCol
                  items={[
                    { label: 'Schedule', href: '/schedule' },
                    { label: 'Jobs', href: '/jobs' },
                  ]}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs md:text-sm">
                <div className="flex flex-wrap gap-4 md:gap-6 text-[#F9B855]">
                 
                  <span>Branding by Fable&Co.</span>
                </div>

                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Footer
