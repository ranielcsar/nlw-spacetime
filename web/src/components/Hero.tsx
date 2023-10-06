import Image from 'next/image'
import Link from 'next/link'

import nlwLogo from '@/assets/nlw-spacetime-logo.svg'

export function Hero() {
  return (
    <section className="my-8 space-y-5">
      <Image src={nlwLogo} alt="NLW Logo" />

      <hgroup className="max-w-[420px] space-y-4">
        <h1 className="text-2xl font-bold leading-tight text-gray-50 lg:text-5xl">
          Sua cápsula do tempo
        </h1>
        <h4 className="leading-relaxed lg:text-lg">
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
