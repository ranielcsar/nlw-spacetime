import { User as UserIcon } from 'lucide-react'
import Image from 'next/image'

import { getUser } from '@/lib/auth'

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <section className="flex items-center gap-3 py-4 text-left lg:py-0">
      <Image
        src={avatarUrl}
        alt={`Profile picture from ${name}`}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Sair
        </a>
      </p>
    </section>
  )
}

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 py-4 text-left transition-colors hover:text-gray-50 lg:py-0"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <UserIcon className="h-5 w-5 text-gray-500" />
      </div>

      <p className="max-w-[140px] text-sm leading-snug">
        <span className="underline">Crie sua conta</span> e salve suas memórias!
      </p>
    </a>
  )
}
