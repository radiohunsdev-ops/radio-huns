'use client'

import { useState, useMemo, useCallback } from 'react'
import { FileText, Play, Volume2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import RadioWaveIcon from './icon/RadioWaveIcon'
import BroadcastIcon from './icon/BroadcastIcon'
import LoadMore from './icon/LoadMore'
import Link from 'next/link'

type Media = { url?: string } | string | null

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

type AudioState = {
  url: string
  title: string
  date?: string
  textColor?: string
  bgColor?: string
}

type Props = { cards: CardItem[] }

const FILTERS = ['All', 'Events', 'Memories', 'Spotlight', 'Updates'] as const
const BATCH_SIZE = 6
const DEFAULT_TEXT_COLOR = '#1F3A44'
const DEFAULT_BG_COLOR = '#EDE2CF'

const getMediaUrl = (media?: Media): string | undefined => {
  if (!media) return undefined
  return typeof media === 'string' ? media : media.url
}

const isYoutube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be')

const getYoutubeEmbed = (url: string): string => {
  if (url.includes('watch?v=')) return url.replace('watch?v=', 'embed/')
  if (url.includes('youtu.be')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`
  return url
}

const truncateTitle = (title: string, max = 45) =>
  title.length > max ? title.slice(0, max + 3) + '...' : title

const ActionButton = ({
  icon,
  label,
  onClick,
  textColor,
}: {
  icon: React.ReactNode
  label: string
  onClick?: (e: React.MouseEvent) => void
  textColor: string
}) => (
  <button
    onClick={onClick}
    className="flex cursor-pointer items-center gap-2 text-[16px] sm:text-[18px]"
  >
    {label}
    <span
      className="inline-flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border"
      style={{ borderColor: textColor }}
    >
      {icon}
    </span>
  </button>
)

const Overlay = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div className="relative w-full max-w-4xl aspect-video">
      <button onClick={onClose} className="absolute -top-10 right-0 text-white">
        <X size={28} />
      </button>
      {children}
    </div>
  </div>
)

const VideoOverlay = ({ url, onClose }: { url: string; onClose: () => void }) => (
  <Overlay onClose={onClose}>
    {isYoutube(url) ? (
      <iframe
        src={getYoutubeEmbed(url)}
        className="w-full h-full"
        allow="autoplay"
        allowFullScreen
      />
    ) : (
      <video src={url} controls autoPlay playsInline className="w-full h-full" />
    )}
  </Overlay>
)

const AudioOverlay = ({ audio, onClose }: { audio: AudioState; onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
    <div
      className="relative w-full max-w-xl rounded-lg p-6 sm:p-10 overflow-hidden font-serif mx-4"
      style={{
        backgroundColor: audio.bgColor || DEFAULT_BG_COLOR,
        color: audio.textColor || DEFAULT_TEXT_COLOR,
      }}
    >
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <div className="absolute -left-26 top-0 w-full">
          <BroadcastIcon className="block w-[50%] h-[6vw]" color={audio.textColor} />
        </div>
      </div>

      <button onClick={onClose} className="absolute top-4 right-4 sm:top-5 sm:right-5">
        <X size={24} />
      </button>

      <div className="relative z-10 text-center">
        {audio.date && <p className="text-[14px] sm:text-[16px] mb-2">{audio.date}</p>}
        <h3 className="text-[18px] sm:text-[22px] mb-4 sm:mb-6">{audio.title}</h3>
        <audio src={audio.url} controls autoPlay className="w-full" />
      </div>
    </div>
  </div>
)

const Card = ({
  card,
  onVideoClick,
  onAudioClick,
  onImageClick,
}: {
  card: CardItem
  onVideoClick: (url: string) => void
  onAudioClick: (state: AudioState) => void
  onImageClick: (slug: string) => void
}) => {
  const imageUrl = getMediaUrl(card.image)
  const videoUrl = getMediaUrl(card.video)
  const videoThumb = getMediaUrl(card.videoThumbnail)
  const audioUrl = getMediaUrl(card.audio)

  const hasVideo = Boolean(videoUrl)
  const hasImage = Boolean(imageUrl)
  const isPlainCard = !hasVideo && !hasImage

  const textColor = card.textColor || DEFAULT_TEXT_COLOR
  const bgColor = card.backgroundColor || DEFAULT_BG_COLOR

  const handleCardClick = () => {
    if (hasVideo) onVideoClick(videoUrl!)
    else if (hasImage) onImageClick(card.slug)
  }

  return (
    <div
      key={card.slug}
      onClick={handleCardClick}
      className={`relative overflow-hidden flex flex-col ${
        hasVideo || hasImage ? 'cursor-pointer' : ''
      }`}
      style={{ backgroundColor: isPlainCard ? bgColor : undefined }}
    >
      {(hasVideo || hasImage) && (
        <div
          className="relative w-full h-50 sm:h-60 lg:h-[60%] lg:min-h-65 bg-cover bg-center"
          style={{
            backgroundImage: `url(${hasVideo ? videoThumb : imageUrl})`,
          }}
        />
      )}

      {isPlainCard && (
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
          <div className="absolute -left-20 top-0 w-[77%] md:w-[80%] lg:w-full">
            <BroadcastIcon
              className="block w-full  h-[40vw] sm:h-[25vw] lg:h-[15vw]"
              color={textColor}
            />
          </div>
        </div>
      )}

      <div
        className={`relative z-10 space-y-2 p-5 sm:p-7 lg:p-10 flex flex-col justify-end font-serif ${
          hasVideo || hasImage
            ? 'min-h-30 sm:min-h-35 lg:min-h-[40%]'
            : 'min-h-70 sm:min-h-80 lg:min-h-125'
        }`}
        style={{
          color: textColor,
          background: hasVideo || hasImage ? bgColor : 'transparent',
        }}
      >
        {card.date && <p className="text-[14px] sm:text-[16px] lg:text-[18px]">{card.date}</p>}

        <h3 className="text-[17px] sm:text-[19px] lg:text-[22px] leading-snug">
          {truncateTitle(card.title)}
        </h3>

        {audioUrl ? (
          <ActionButton
            label="Listen"
            icon={<Volume2 size={14} />}
            textColor={textColor}
            onClick={(e) => {
              e.stopPropagation()
              onAudioClick({
                url: audioUrl,
                title: card.title,
                date: card.date,
                textColor: card.textColor,
                bgColor: card.backgroundColor,
              })
            }}
          />
        ) : hasVideo ? (
          <ActionButton label="Watch" icon={<Play size={16} />} textColor={textColor} />
        ) : hasImage ? (
          <ActionButton label="Read" icon={<FileText size={16} />} textColor={textColor} />
        ) : (
          <Link href={card.link || `/journal/${card.slug}`} className="text-[16px] sm:text-[18px]">
            {card.linkText || 'Read'}
          </Link>
        )}
      </div>
    </div>
  )
}

const CardSection = ({ cards }: Props) => {
  const router = useRouter()

  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activeAudio, setActiveAudio] = useState<AudioState | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE)

  const filteredCards = useMemo(
    () =>
      activeFilter === 'All'
        ? cards
        : cards.filter((c) => c.category.toLowerCase() === activeFilter.toLowerCase()),
    [activeFilter, cards],
  )

  const visibleCards = filteredCards.slice(0, visibleCount)
  const hasMore = filteredCards.length > visibleCount

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter)
    setVisibleCount(BATCH_SIZE)
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + BATCH_SIZE)
  }, [])

  return (
    <div>
      <section className="relative w-full bg-[#EDDECA] overflow-hidden py-12 sm:py-16 lg:py-24">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <section className="w-full font-serif py-3 sm:py-5">
            <div className="max-w-xl mx-auto px-4 sm:px-6">
              <h2 className="text-center text-[#E55322] text-lg sm:text-xl font-medium mb-6 sm:mb-10">
                Filter
              </h2>

              <div className="flex sm:hidden overflow-hidden  gap-2 pb-2 scrollbar-hide -mx-2 px-2">
                {FILTERS.map((filter) => (
                  <span
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`cursor-pointer  whitespace-nowrap transition-colors px-3 py-1.5 rounded text-sm shrink-0 ${
                      activeFilter === filter
                        ? 'bg-[#E55322] text-white'
                        : 'text-[#243746] hover:text-[#E55322]'
                    }`}
                  >
                    {filter}
                  </span>
                ))}
              </div>

              <div className="hidden   sm:flex justify-between items-center text-[#243746] text-lg flex-wrap gap-4">
                {FILTERS.map((filter) => (
                  <span
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
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

      <section className="bg-[#F6F1E8] py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 overflow-hidden">
            {visibleCards.map((card) => (
              <Card
                key={card.slug}
                card={card}
                onVideoClick={setActiveVideo}
                onAudioClick={setActiveAudio}
                onImageClick={(slug) => router.push(`/journal/${slug}`)}
              />
            ))}
          </div>

          {hasMore && (
            <div className="my-10 sm:my-14 flex flex-col items-center text-[#1F3A44] font-serif">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-3 rounded text-white font-semibold transition"
              >
                <LoadMore />
              </button>
            </div>
          )}
        </div>
      </section>

      {activeVideo && <VideoOverlay url={activeVideo} onClose={() => setActiveVideo(null)} />}
      {activeAudio && <AudioOverlay audio={activeAudio} onClose={() => setActiveAudio(null)} />}
    </div>
  )
}

export default CardSection
