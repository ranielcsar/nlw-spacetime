import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { MediaDisplay } from '@/components/MediaDisplay'
import { api } from '@/lib/api'

dayjs.locale(ptBr)

type Memory = {
  id: string
  excerpt: string
  coverUrl: string
  createdAt: string
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories = response.data as Memory[]

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <section className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        return <MemoryCard key={memory.id} {...{ memory }}></MemoryCard>
      })}
    </section>
  )
}

function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <div className="space-y-4">
      <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
        {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
      </time>

      <MediaDisplay url={memory.coverUrl} />

      <p className="text-lg leading-relaxed text-gray-100">{memory.excerpt}</p>

      <Link
        href={`/memories/${memory.id}`}
        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
      >
        Ler mais
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}

function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <a href="/memories/new" className="underline hover:text-gray-50">
          criar agora
        </a>
        !
      </p>
    </div>
  )
}
