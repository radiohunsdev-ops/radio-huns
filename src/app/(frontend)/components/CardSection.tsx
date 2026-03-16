'use client'

import { useState, useMemo } from 'react'
import { FileText, Play, Volume2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import RadioWaveIcon from './icon/RadioWaveIcon'
import BroadcastIcon from './icon/BroadcastIcon'
import LoadMore from './icon/LoadMore'
import Link from 'next/link'

type Media =
  | {
      url?: string
    }
  | string
  | null

type CardItem = {
  category: string
  date?: string
  title: string
  slug: string
  linkText?: string
  link?: string
  audio?: Media
  image?: Media
  video?: Media
  videoThumbnail?: Media
  backgroundColor?: string
  textColor?: string
}

type Props = {
  cards: CardItem[]
}

const filters = ['All', 'Events', 'Memories', 'Spotlight', 'Updates']

const getMediaUrl = (media?: Media): string | undefined => {
  if (!media) return undefined
  if (typeof media === 'string') return media
  return media.url
}

const isYoutube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be')

const getYoutubeEmbed = (url: string) => {
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/')
  if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`
  return url
}

const BATCH_SIZE = 6 // number of cards to show per batch

const CardSection = ({ cards }: Props) => {
  const router = useRouter()

  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activeAudio, setActiveAudio] = useState<{
    url: string
    title: string
    date?: string
    textColor?: string
    bgColor?: string
  } | null>(null)

  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE)

  // Memoized filtered cards
  const filteredCards = useMemo(() => {
    if (activeFilter === 'All') return cards
    return cards.filter((card) => card.category.toLowerCase() === activeFilter.toLowerCase())
  }, [activeFilter, cards])

  // Slice cards for "Load More" batching
  const visibleCards = filteredCards.slice(0, visibleCount)

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + BATCH_SIZE)
  }

  return (
    <div>
      {/* FILTER */}
      <section className="relative w-full bg-[#EDDECA] overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <section className="w-full font-serif py-5">
            <div className="max-w-xl mx-auto px-6">
              <h2 className="text-center text-[#E55322] text-xl font-medium mb-10">Filter</h2>

              <div className="flex justify-between items-center text-[#243746] text-lg flex-wrap gap-4">
                {filters.map((filter) => (
                  <span
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter)
                      setVisibleCount(BATCH_SIZE) // reset visible count on filter change
                    }}
                    className={`cursor-pointer transition-colors px-4 py-2 rounded ${
                      activeFilter === filter ? 'bg-[#E55322] text-white' : 'hover:text-[#E55322]'
                    }`}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="section-testimonial-bg">
          <RadioWaveIcon />
        </div>
      </section>

      {/* CARDS */}
      <section className="bg-[#F6F1E8] py-10">
        <div className="mx-auto max-w-7xl px-20">
          <div className="grid grid-cols-3 gap-6 overflow-hidden">
            {visibleCards?.map((card) => {
              const imageUrl = getMediaUrl(card.image)
              const videoUrl = getMediaUrl(card.video)
              const videoThumb = getMediaUrl(card.videoThumbnail)
              const audioUrl = getMediaUrl(card.audio)

              const hasVideo = Boolean(videoUrl)
              const hasImage = Boolean(imageUrl)
              const isPlainCard = !hasVideo && !hasImage

              const textColor = card.textColor || '#1F3A44'
              const bgColor = card.backgroundColor || '#EDE2CF'

              return (
                <div
                  key={card.slug}
                  onClick={() => {
                    if (hasVideo) {
                      setActiveVideo(videoUrl || '')
                    } else if (hasImage) {
                      router.push(`/journal/${card.slug}`)
                    }
                  }}
                  className={`relative overflow-hidden flex flex-col ${
                    hasVideo || hasImage ? 'cursor-pointer' : ''
                  }`}
                  style={{
                    backgroundColor: isPlainCard ? bgColor : undefined,
                  }}
                >
                  {hasVideo && (
                    <div
                      className="relative w-full h-[60%] min-h-65 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${videoThumb})`,
                      }}
                    />
                  )}

                  {!hasVideo && hasImage && (
                    <div
                      className="relative w-full h-[60%] min-h-65 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                    />
                  )}

                  {isPlainCard && (
                    <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                      <div className="absolute -left-20 top-0 w-full">
                        <BroadcastIcon className="block w-full h-[15vw]" color={textColor} />
                      </div>
                    </div>
                  )}

                  <div
                    className={`relative z-10 space-y-2 p-10 flex flex-col justify-end font-serif ${
                      hasVideo || hasImage ? 'min-h-[40%]' : 'min-h-125'
                    }`}
                    style={{
                      color: textColor,
                      background: hasVideo || hasImage ? bgColor : 'transparent',
                    }}
                  >
                    {card.date && <p className="text-[18px]">{card.date}</p>}

                    <h3 className="text-[22px] leading-snug">
                      {card.title.length > 45 ? card.title.slice(0, 48) + '...' : card.title}
                    </h3>

                    {audioUrl ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveAudio({
                            url: audioUrl,
                            title: card.title,
                            date: card.date,
                            textColor: card.textColor,
                            bgColor: card.backgroundColor,
                          })
                        }}
                        className="flex cursor-pointer items-center gap-2 text-[18px]"
                      >
                        Listen
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current">
                          <Volume2 size={16} />
                        </span>
                      </button>
                    ) : hasVideo ? (
                      <button className="flex items-center gap-2 text-[18px]">
                        Watch
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border"
                          style={{ borderColor: textColor }}
                        >
                          <Play size={18} />
                        </span>
                      </button>
                    ) : hasImage ? (
                      <button className="flex cursor-pointer items-center gap-2 text-[18px]">
                        Read
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current">
                          <FileText size={18} />
                        </span>
                      </button>
                    ) : (
                      <Link href={card.link || `/journal/${card.slug}`} className="text-[18px]">
                        {card.linkText || 'Read'}
                      </Link>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* LOAD MORE BUTTON */}
          {filteredCards.length > visibleCount && (
            <div className="my-14 flex flex-col items-center text-[#1F3A44] font-serif">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-3 rounded  text-white font-semibold  transition"
              >
                <LoadMore />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={28} />
            </button>

            {isYoutube(activeVideo) ? (
              <iframe
                src={getYoutubeEmbed(activeVideo)}
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
              />
            ) : (
              <video src={activeVideo} controls autoPlay playsInline className="w-full h-full" />
            )}
          </div>
        </div>
      )}

      {/* AUDIO MODAL */}
      {activeAudio && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div
            className="relative w-full max-w-xl rounded-lg p-10 overflow-hidden font-serif"
            style={{
              backgroundColor: activeAudio.bgColor || '#EDE2CF',
              color: activeAudio.textColor || '#1F3A44',
            }}
          >
            <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
              <div className="absolute -left-26 top-0 w-full">
                <BroadcastIcon className="block w-[50%] h-[6vw]" color={activeAudio.textColor} />
              </div>
            </div>

            <button onClick={() => setActiveAudio(null)} className="absolute top-5 right-5">
              <X size={24} />
            </button>

            <div className="relative z-10 text-center">
              {activeAudio.date && <p className="text-[16px] mb-2">{activeAudio.date}</p>}

              <h3 className="text-[22px] mb-6">{activeAudio.title}</h3>

              <audio src={activeAudio.url} controls autoPlay className="w-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardSection
