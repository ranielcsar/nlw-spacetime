'use client'

import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

import { MediaPicker } from '@/components/MediaPicker'
import { api } from '@/lib/api'

export function NewMemoryForm() {
  const router = useRouter()

  const handleCreateMemory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (fileToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileToUpload)

      const uploadReponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadReponse.data.fileUrl
    }

    const token = Cookie.get('token')

    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    router.push('/')
  }

  return (
    <form
      className="flex h-[80vh] flex-col gap-4 lg:flex-1"
      onSubmit={handleCreateMemory}
    >
      <section className="my-2 flex flex-col gap-4 lg:m-0 lg:flex-row lg:items-center">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500 focus:ring-0"
          />
          Tornar memória pública
        </label>
      </section>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-gray-800/60 p-2 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
