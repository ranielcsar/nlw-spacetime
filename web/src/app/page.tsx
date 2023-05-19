import { User } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'

import nlwLogo from '../assets/nlw-spacetime-logo.svg'

import { Profile } from '@/components/Profile'

export default function Home() {
  const isAuthenticated = cookies().has('token')

  return (
    <main className="grid min-h-screen grid-cols-2">
      <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        <BgPurpleBlur />

        <BgStripes />

        {isAuthenticated ? <Profile /> : <SignIn />}

        <Hero />

        <Copyright />
      </section>

      <section className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </section>
    </main>
  )
}

function BgPurpleBlur() {
  return (
    <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
  )
}

function BgStripes() {
  return <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
}

function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="h-5 w-5 text-gray-500" />
      </div>

      <p className="max-w-[140px] text-sm leading-snug">
        <span className="underline">Crie sua conta</span> e salve suas memórias!
      </p>
    </a>
  )
}

function Hero() {
  return (
    <section className="space-y-5">
      <Image src={nlwLogo} alt="NLW Logo" />

      <hgroup className="max-w-[420px] space-y-4">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Sua cápsula do tempo
        </h1>
        <h4 className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </h4>
      </hgroup>

      <a
        href=""
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </a>
    </section>
  )
}

function Copyright() {
  return (
    <footer className="text-sm leading-relaxed text-gray-200">
      Feito com 💜 no NLW da{' '}
      <a
        className="underline hover:text-gray-100"
        href="https://rocketseat.com.br"
        target="_blank"
        rel="noreferrer"
      >
        Rocketseat
      </a>
    </footer>
  )
}

function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center ">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não registrou nenhuma lembrança, comece a{' '}
        <a href="#" className="underline hover:text-gray-50">
          criar agora
        </a>
        !
      </p>
    </div>
  )
}
