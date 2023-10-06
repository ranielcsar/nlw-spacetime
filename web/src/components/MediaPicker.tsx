'use client'

import { ChangeEvent, useState } from 'react'

export function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
        type="file"
        id="media"
        name="coverUrl"
        className="invisible h-0 w-0"
        accept="image/*, video/*"
        onChange={onFileSelected}
      />

      {preview && (
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover md:max-h-[45%] md:object-fill lg:max-h-[50%]"
        />
      )}
    </>
  )
}
