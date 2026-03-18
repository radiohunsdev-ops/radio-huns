/* eslint-disable @next/next/no-img-element */

type Interview = {
  title: string
  image?: {
    url: string
  }
  audio?: {
    url: string
  }
}

type MediaSectionProps = {
  interviews: Interview[]
}

export default function MediaSection({ interviews }: MediaSectionProps) {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 pt-10 pb-20 grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 lg:gap-0 items-start">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[78px] ml-0 lg:ml-7.5 max-w-full lg:max-w-lg font-serif font-extrabold leading-tight lg:leading-[1.05] tracking-wide text-[#E75023]">
        Media
      </h1>

      <div className="text-[#3B4A54] font-serif text-base sm:text-lg md:text-xl max-w-full lg:max-w-4xl leading-relaxed space-y-6">
        {interviews?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
          >
            <span className="text-base sm:text-xl text-gray-800">{index + 1}.</span>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-xl sm:rounded-full px-4 sm:px-6 py-4 shadow-sm w-full">
              {item.image && (
                <div className="w-10 h-10 flex items-center justify-center border rounded-lg shrink-0">
                  <img src={item.image.url} className="w-6 h-6 object-contain" alt={item.title} />
                </div>
              )}

              <span className="text-base sm:text-lg text-gray-800 wrap-break-word">
                {item.title}
              </span>

              {item.audio && (
                <audio controls className="w-full sm:flex-1 mt-2 sm:mt-0">
                  <source src={item.audio.url} />
                </audio>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
