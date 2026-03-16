const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const dates = [
  29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8,
]

export default function Calendar() {
  return (
    <div className="bg-[#F6F1E7] px-10 py-20">
      <div className="grid grid-cols-7 mb-8 text-center font-serif tracking-widest text-[#1F2D2D]">
        {days.map((day, i) => (
          <div key={i}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6 border border-[#EFE4D2] bg-white">
        {dates.map((date, i) => (
          <div key={i} className="relative h-27 border border-[#EFE4D2]">
            <span className="absolute top-4 right-4 text-sm text-[#E6C8A8] font-light">{date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
