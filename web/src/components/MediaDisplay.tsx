'use client'

import Image from 'next/image'

export function MediaDisplay({ url }: { url: string }) {
  const videoRegex = /\.(mp4|mov|avi|wmv|flv|mkv)$/i
  const isVideo = videoRegex.test(url)

  if (isVideo) {
    return (
      <video
        src={url}
        muted
        onMouseEnter={(evt) => evt.currentTarget.play()}
        onMouseLeave={(evt) => evt.currentTarget.pause()}
      >
        Seu navegador não suporta a tag de vídeo.
      </video>
    )
  }

  return (
    <Image
      src={url}
      alt=""
      width={500}
      height={280}
      className="aspect-video w-full rounded-lg object-cover"
    />
  )
}
