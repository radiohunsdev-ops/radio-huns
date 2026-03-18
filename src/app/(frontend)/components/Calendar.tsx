const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const dates = [
  29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8,
]

export default function Calendar() {
  return (
    <div className="bg-[#F6F1E7] px-3 py-6 sm:px-6 sm:py-12 lg:px-10 lg:py-20">
      <div className="grid grid-cols-7 mb-4 sm:mb-6 lg:mb-8 text-center font-serif tracking-widest text-[#1F2D2D] text-xs sm:text-sm lg:text-base">
        {days.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 mt-5 grid-rows-6 border border-[#EFE4D2] bg-white">
        {dates.map((date, i) => (
          <div key={i} className="relative h-10 sm:h-16 md:h-20 lg:h-27 border border-[#EFE4D2]">
            <span className="absolute top-1 right-1 sm:top-2 sm:right-2 lg:top-4 lg:right-4 text-[10px] sm:text-xs lg:text-sm text-[#E6C8A8] font-light">
              {date}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
