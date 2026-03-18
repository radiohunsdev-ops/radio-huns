/* eslint-disable @next/next/no-img-element */

type Props = {
  title: string
  body: {
    root: {
      children: {
        type: string
        children?: {
          text?: string
        }[]
      }[]
    }
  }
  organizations: {
    name: string
    logo: {
      url: string
      alt?: string
    }
  }[]
}

export default function SupportPromotionSection({ title, body, organizations }: Props) {
  return (
    <section className="min-h-screen bg-[#F5F1E8] font-serif">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[50%_50%]">
        {/* ── Left column ── */}
        <div className="relative flex flex-col justify-between">
          {/* Text content */}
          <div className="max-w-4xl px-6 py-10 sm:px-10 sm:py-14 lg:px-15 lg:py-23 space-y-6 sm:space-y-8 lg:space-y-10">
            <h1 className="font-extrabold text-[40px] sm:text-[52px] lg:text-[64px] leading-[1.05] text-[#E55322]">
              {title}
            </h1>
            <div className="text-[#3B4A54] font-serif text-base sm:text-lg lg:text-xl max-w-4xl leading-relaxed space-y-6">
              {body?.root?.children?.map((node, pIndex) => {
                if (node.type !== 'paragraph') return null
                const fullText = (node.children ?? [])
                  .filter((child) => child?.text != null)
                  .map((child) => child.text)
                  .join('')

                if (!fullText.trim()) return <p key={pIndex} />

                const emailRegex = /<a href="mailto:([^"]+)".*?>(.*?)<\/a>/gi
                const parts: React.ReactNode[] = []
                let lastIndex = 0

                let match: RegExpExecArray | null
                while ((match = emailRegex.exec(fullText)) !== null) {
                  const [, email, linkText] = match

                  if (match.index > lastIndex) {
                    parts.push(fullText.slice(lastIndex, match.index))
                  }
                  parts.push(
                    <a
                      key={`link-${pIndex}-${match.index}`}
                      href={`mailto:${email}`}
                      className="text-[#E75023] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {linkText.trim() || email}
                    </a>,
                  )

                  lastIndex = match.index + match[0].length
                }

                if (lastIndex < fullText.length) {
                  parts.push(fullText.slice(lastIndex))
                }
                if (parts.length === 0) {
                  return <p key={pIndex}>{fullText}</p>
                }

                return <p key={pIndex}>{parts}</p>
              })}
            </div>
          </div>

          {/* Orange SVG strip — hidden on mobile, visible md+ */}
          <div className="relative hidden md:block h-[35vh] bg-[#E75023] overflow-hidden">
            <div className="section-half-social-fill">
              <svg
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 370.4 342.4"
                xmlSpace="preserve"
              >
                <path d="M0,342.3h17c0.5-10.5,2.1-21.1,4.9-31.3c20.6-76,99-120.9,175-100.3c1,3.1,2.2,6.2,3.4,9.2 c1.4,3.6,3.1,7.2,4.8,10.7c-12.5-4.8-25.7-7.6-39.1-8.3c-69.7-3.4-129,50.3-132.5,120h17c1.2-21.1,8.4-41.4,20.9-58.5 c35.6-48.7,104-59.3,152.7-23.7c3.6,4.4,7.4,8.6,11.4,12.6c4,4.1,8.2,7.8,12.6,11.4c12.4,17.1,19.6,37.3,20.8,58.3h17 c-0.6-13.5-3.5-26.8-8.3-39.4c3.6,1.7,7.2,3.3,10.8,4.8c3,1.2,6.1,2.4,9.2,3.4c2.8,10.1,4.4,20.6,4.8,31.1h17 c-0.3-8.8-1.4-17.5-3.1-26.1c17.9,3.7,36.3,4.3,54.4,1.8v-17.2c-25.6,4-51.8,1-75.8-8.7c-35.7-14.6-64-42.9-78.6-78.6 c-13.9-34.4-13.9-72.9,0-107.4c14.6-35.7,42.9-64.1,78.6-78.6c24-9.7,50.2-12.7,75.8-8.7V1.6c-49.6-7-99.6,9.8-135.1,45.3 c-15.1,15-27.1,33-35.1,52.8c-11.8,29.3-14.8,61.5-8.4,92.4c-10.6-2.2-21.4-3.3-32.2-3.3c-65.1,0-123.7,39.4-148.1,99.7 C4.9,305.6,1,323.9,0,342.3z"></path>
                <path d="M94.1,282.8c-15.9,15.9-25.5,37.1-26.9,59.8h17c0.6-7.7,2.4-15.3,5.3-22.5c11.6-28.5,39.3-47.3,70.1-47.4 c9.8-0.1,19.6,1.8,28.8,5.5c19.1,7.7,34.3,22.8,42,41.9c2.9,7.1,4.7,14.7,5.3,22.4h17c-0.7-9.9-2.9-19.6-6.6-28.8 c-9.5-23.4-28-41.9-51.4-51.3c-11.2-4.5-23.2-6.8-35.2-6.8C135,255.6,111.4,265.4,94.1,282.8L94.1,282.8z"></path>
                <path d="M117.7,306.4c-9.7,9.7-15.8,22.4-17.1,36.1h17.1c3-21,21-36.5,42.1-36.5c5.5,0,11,1,16.1,3.1 c5.3,2.1,10.2,5.3,14.2,9.3c6.5,6.5,10.7,14.9,12,24h17.1c-2.2-21.9-16.4-40.9-36.9-49.1c-7.2-2.9-14.8-4.4-22.5-4.4 C144,288.9,128.9,295.2,117.7,306.4L117.7,306.4z"></path>
                <path d="M348.9,286.2c7.3,0,14.6-0.6,21.8-1.9V267c-7.2,1.5-14.5,2.2-21.8,2.2c-14.2,0-28.2-2.7-41.4-8 c-13.6-5.5-25.9-13.6-36.3-24c-10.4-10.4-18.5-22.7-24-36.3c-5.3-13.1-8-27.1-8-41.3c0-28.9,11.5-56.7,32-77.1 c10.3-10.3,22.5-18.5,36-24c12.9-5.3,26.8-8,40.8-8c7.6,0,15.2,0.8,22.7,2.3V35.5c-7.5-1.3-15.1-2-22.7-2c-16.2,0-32.3,3.2-47.3,9.3 c-15.5,6.4-29.6,15.8-41.4,27.6c-23.7,23.6-37,55.7-37,89.1c0,16.3,3.1,32.5,9.2,47.7c12.8,31.7,38,56.9,69.7,69.7 C316.4,283,332.6,286.2,348.9,286.2z"></path>
                <path d="M370.7,250.2v-17.6c-16.6,5-34.5,4.2-50.7-2.3c-19-7.7-34.1-22.8-41.8-41.8c-7.4-18.4-7.4-38.9,0-57.3 c7.7-19,22.8-34.1,41.8-41.8c16.1-6.5,34-7.3,50.7-2.3V69.5c-7.2-1.8-14.7-2.7-22.1-2.7c-37.9,0-72,22.9-86.2,58 c-9.1,22.5-9.1,47.5,0,70c9.5,23.3,27.9,41.8,51.2,51.2C331.7,253.3,351.7,254.8,370.7,250.2z"></path>
                <path d="M370.6,215.3v-18.9c-1.9,1.2-3.9,2.2-6,3c-10.3,4.2-21.8,4.2-32.1,0c-10.7-4.3-19.2-12.7-23.5-23.4 c-4.2-10.3-4.2-21.8,0-32.1c6.6-16.1,22.2-26.6,39.5-26.6c5.5,0,11,1,16.1,3.1c2.1,0.8,4.2,1.8,6.1,3v-18.9 c-7-2.8-14.5-4.2-22.1-4.2c-15.9-0.1-31,6.2-42.2,17.4c-5.7,5.6-10.1,12.3-13.1,19.7c-5.8,14.4-5.8,30.5,0,44.9 c3,7.4,7.5,14.1,13.1,19.7c5.7,5.6,12.4,10.1,19.8,13.1C340.4,220.8,356.4,220.9,370.6,215.3z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* ── Right column — organizations ── */}
        {/*
          On mobile/tablet: stacks below the left column, uses a horizontal
          wrapping row of logos. On lg+: original side-by-side flex column.
        */}
        <div className="flex flex-col items-center justify-center bg-[#EFE2CF] px-6 py-10 sm:px-10 sm:py-14 lg:px-10 lg:py-20">
          {/* Mobile/tablet: wrap logos in a row; lg: keep original column */}
          <div className="flex flex-wrap justify-center gap-10 lg:flex-col lg:items-center lg:gap-20">
            {organizations?.map((org, index) => (
              <div key={index} className="flex flex-col items-center gap-4">
                <img
                  src={org.logo?.url}
                  alt={org.logo?.alt || org.name}
                  className="h-14 sm:h-16 lg:h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
