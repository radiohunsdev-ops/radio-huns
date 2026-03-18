'use client'
import { Mic, Play } from 'lucide-react'
/* eslint-disable @next/next/no-img-element */

import { useState } from 'react'

type Media = {
  url: string
  alt?: string
}

type VideoItem = {
  id?: string
  title?: string
  youtubeUrl: string
  date?: string
  thumbnail?: Media | null
}

type VideoSectionProps = {
  videos: VideoItem[]
}

/* Convert YouTube URL to embed */
function getEmbedUrl(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  const videoId = match?.[1]
  return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url
}

/* Fallback YouTube Thumbnail */
function getYoutubeThumbnail(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  const videoId = match?.[1]
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
}

export default function VideoSection({ videos }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!videos?.length) return null

  const video = videos[0]

  const thumbnailSrc = video.thumbnail?.url || getYoutubeThumbnail(video.youtubeUrl)

  return (
    <section className="relative h-auto md:min-h-screen bg-[#0055B8] overflow-hidden flex items-center justify-center py-10 sm:py-14 md:py-0">
      <div className="absolute inset-0 top-0 left-0 hidden md:block">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          fill="#0071CE"
          viewBox="0 0 343.6 287.2"
          xmlSpace="preserve"
          className="w-full h-full relative right-90"
        >
          <path d="M5.8,253.9c12.1,0,24-2.3,35.2-6.8c11.6-4.7,22.1-11.6,30.9-20.5c8.9-8.9,15.9-19.6,20.6-31.3 c4.5-11.3,6.8-23.3,6.7-35.5c0-12-2.3-23.8-6.9-34.8c-4.7-11.4-11.6-21.8-20.4-30.5C63.4,86,53.4,79.2,42.4,74.4 c-10.7-4.7-22.2-7.1-33.9-7.2c-2.3,0-4.7,0.1-7.1,0.2L0,67.5v16.6L1.6,84c2.3-0.2,4.6-0.3,6.9-0.3c9.4,0,18.7,2,27.3,5.8 c9.1,4,17.3,9.6,24.3,16.6c7.2,7.2,12.9,15.7,16.8,25.1c3.7,9,5.7,18.7,5.7,28.5c0,10-1.8,20-5.5,29.4c-3.8,9.6-9.6,18.4-16.9,25.7 c-7.3,7.3-15.9,13-25.4,16.9c-9.2,3.7-19,5.6-29,5.6c-1.3,0-2.8,0-4.2-0.1L0,237.2v16.6l1.4,0.1C2.9,253.9,4.3,253.9,5.8,253.9z"></path>
          <path d="M5.7,220.4c7.7,0,15.4-1.5,22.5-4.4c15-6.1,26.9-17.9,33-32.9c5.8-14.4,5.8-30.6,0-45 c-6.1-14.9-17.9-26.8-32.9-32.9c-8.5-3.5-17.7-4.9-26.9-4.2L0.1,101v16.7l1.6-0.2c1.4-0.1,2.8-0.2,4.2-0.2 c11.4,0,22.4,4.5,30.5,12.6l0,0C44.4,138.1,49,149,49,160.5c0,5.6-1.1,11.1-3.2,16.3c-4.4,10.8-13,19.4-23.8,23.8 c-5.2,2.1-10.7,3.2-16.4,3.2c-1.3,0-2.7-0.1-4-0.2L0,203.4v16.7l1.4,0.1C2.8,220.3,4.3,220.4,5.7,220.4z"></path>
          <path d="M285.7,260.8c-23.8-23.8-56.1-37.2-89.8-37.1c-13.4,0-26.8,2.1-39.6,6.3c-13.1,4.3-25.4,10.6-36.4,18.9 l-0.4,0.3l-0.1,0.1c-9.4,7.1-17.8,15.4-24.9,24.8c0,0.1-0.1,0.1-0.1,0.2c-0.3,0.4-0.6,0.7-0.8,1.1c-2.1,2.8-4.1,5.8-5.9,8.8 l-1.9,3.1h19.8l1.9-2.6c3.2-4.2,6.6-8.3,10.4-12c3.7-3.8,7.7-7.2,12-10.4l0.5-0.4c9.5-7,20-12.4,31.2-16c24.9-8.1,51.8-7.2,76,2.6 c13.7,5.5,26.1,13.8,36.5,24.2c4.1,4.1,7.9,8.6,11.3,13.3l1,1.3H306l-1.9-3C298.9,275.7,292.7,267.9,285.7,260.8z"></path>
          <path d="M231,264.1c-34.4-14-73.9-6.2-100.5,19.8l-3.3,3.3l25.1,0l1.7-1c25.5-16.5,58.3-16.5,83.7,0l1.5,1h25.5 l-3.6-3.3C252.5,275.4,242.3,268.7,231,264.1z"></path>
          <path d="M342.2,284.3c-31.1-68.5-105.5-106.3-179.2-90.9c2.2-10.8,3.4-21.8,3.4-32.8c0-20.7-4-41.3-11.8-60.5 c-8.1-19.9-20.1-38-35.3-53.2c-15.5-15.5-34-27.6-54.4-35.6C45.3,3.8,24.4-0.1,3.3-0.1H1.5H0v16.6h1.5h1.8 c19-0.1,37.9,3.4,55.6,10.3c18.3,7.1,34.9,17.9,48.7,31.8c13.6,13.6,24.4,29.8,31.7,47.7c7,17.2,10.6,35.6,10.5,54.2 c0,12.7-1.7,25.4-5,37.7c-7.1,2.4-14.1,5.3-20.8,8.6c0.9-2.3,1.7-4.6,2.5-6.9c4.2-12.8,6.3-26.1,6.3-39.5c0-16.4-3.2-32.6-9.3-47.7 c-6.4-15.7-15.8-30-27.9-42C83.7,58.8,69.6,49.4,54,43c-15-6.2-31.2-9.4-47.4-9.4c-1.6,0-3.3,0-5.2,0.1L0,33.8v16.6l1.6-0.1 c1.7-0.1,3.4-0.1,5.1-0.1c14.1,0,28.1,2.8,41.1,8.1c13.5,5.6,25.8,13.8,36.2,24.2c10.4,10.4,18.7,22.8,24.2,36.5 c5.4,13.2,8.1,27.3,8.1,41.6c0,11.7-1.8,23.3-5.4,34.4c-3.6,11-8.9,21.4-15.7,30.7c-8.9,7.2-17,15.2-24.2,24.1 c-9.3,6.8-19.7,12.1-30.7,15.7c-11.1,3.6-22.7,5.4-34.3,5.4c-1.3,0-2.6,0-4.2-0.1l-1.5,0v16.6l1.4,0c1.7,0,3,0.1,4.3,0.1 c5.3,0,10.5-0.3,15.8-1l0.9-0.1c7.7-1,15.4-2.7,22.8-5.1c2.3-0.7,4.6-1.6,6.9-2.5c-0.9,1.8-1.8,3.7-2.6,5.5l-1.2,2.9h18.3l0.6-1.7 c6.9-13.6,15.9-26.1,26.8-36.8c16.7-16.8,37.3-29.1,60-36c67-20.3,138.8,10.4,170.5,72.8l0.8,1.6h18.3L342.2,284.3z"></path>
        </svg>
      </div>

      <div className="absolute inset-0 md:hidden pointer-events-none">
        <svg
          viewBox="0 0 400 300"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-8 -right-8 w-64 h-64 opacity-20"
          fill="#0071CE"
        >
          <circle cx="200" cy="200" r="180" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="#0071CE" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative w-[92%] sm:w-[85%] md:w-[75%] max-w-6xl shadow-2xl">
        <div className="relative aspect-video overflow-hidden rounded-sm sm:rounded-none">
          {!isPlaying && (
            <>
              <img
                src={thumbnailSrc}
                alt={video.thumbnail?.alt || video.title || 'Video'}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Play video"
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-white flex items-center justify-center shadow-lg text-xl transition-transform duration-200 hover:scale-110 active:scale-95">
                  <Play className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </span>
              </button>
            </>
          )}

          {isPlaying && (
            <iframe
              src={getEmbedUrl(video.youtubeUrl)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 sm:right-auto sm:bottom-8 sm:left-8 text-white max-w-xl pointer-events-none bg-linear-to-t from-black/60 via-black/20 to-transparent sm:bg-none p-4 sm:p-0">
            <h1 className="text-lg sm:text-2xl md:text-3xl flex items-start sm:items-center space-x-2 sm:space-x-5 font-serif leading-tight">
              <Mic
                className="w-6 h-6 sm:w-10 sm:h-10 md:w-20 md:h-20 shrink-0 mt-0.5 sm:mt-0"
                strokeWidth={2}
              />
              <span>{video.title}</span>
            </h1>

            {video.date && (
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm opacity-80 pl-8 sm:pl-0">
                {new Date(video.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
