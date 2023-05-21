import { User } from 'lucide-react'
import './globals.css'
import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import nlwLogo from '@/assets/nlw-spacetime-logo.svg'
import { Profile } from '@/components/Profile'

const roboto = Roboto({ subsets: ['latin'], variable: '--roboto-font' })
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--bai-font',
})

export const metadata = {
  title: 'Spacetime',
  description:
    'Uma cápsula do tempo construída com React, NextJS, Tailwind e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')

  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <section className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            <BgPurpleBlur />

            <BgStripes />

            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />

            <Copyright />
          </section>

          <section className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover">
            {children}
          </section>
        </main>
      </body>
    </html>
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

      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </Link>
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
