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
    <div className="max-w-8xl mx-auto px-6 pt-10 pb-20 grid grid-cols-[40%_60%] items-start">
      <h1
        className={`text-[78px] ml-7.5 max-w-lg font-serif font-extrabold leading-[1.05] tracking-wide text-[#E75023]`}
      >
        Media
      </h1>

      <div className="text-[#3B4A54] font-serif text-xl max-w-4xl leading-relaxed space-y-6">
        {interviews?.map((item, index) => (
          <div key={index} className="flex items-center gap-6">
            <span className="text-xl text-gray-800">{index + 1}.</span>

            <div className="flex items-center gap-6 rounded-full px-6 py-4 shadow-sm">
              {item.image && (
                <div className="w-10 h-10 flex items-center justify-center border rounded-lg">
                  <img src={item.image.url} className="w-6 h-6" alt={item.title} />
                </div>
              )}

              <span className="text-lg text-gray-800 whitespace-nowrap">{item.title}</span>

              {item.audio && (
                <audio controls className="flex-1">
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
