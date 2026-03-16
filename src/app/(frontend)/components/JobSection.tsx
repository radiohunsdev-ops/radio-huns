/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

type JobItem = {
  id?: string
  title: string
  description: string
  JobTitle: string
  JobDescription: string
  slug: string
}

type JobSectionProps = {
  id?: string
  jobs: JobItem[]
  image: {
    url: string
    alt?: string
  }
}

export default function JobSection({ jobs, image }: JobSectionProps) {
  const sliceWords = (text: string, words: number) => {
    return text.split(' ').slice(0, words).join(' ') + '...'
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#F9B855]">
      <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] min-h-screen">
        <div className="flex flex-col font-serif px-10 py-20 bg-[#EDE9E3]">
          <h2 className="text-7xl text-[#E75023] font-bold mb-16">Current jobs</h2>

          <div className="space-y-12 max-w-3xl">
            {jobs?.map((job, index) => (
              <div key={job.id || index} className="border-b border-gray-300 pb-8">
                <h3 className="text-2xl font-bold text-[#E75023] mb-3">{job.JobTitle}</h3>

                <span className="text-[#3B4A54] text-lg leading-relaxed">
                  {sliceWords(job.JobDescription, 30)}
                </span>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="text-[#E75023] font-semibold ml-2 hover:underline inline-flex items-center gap-1"
                >
                  Find out more
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-100 lg:h-auto">
          {image && (
            <img
              src={image.url}
              alt={image.alt || 'Jobs image'}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  )
}
