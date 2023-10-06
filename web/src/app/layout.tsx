import './globals.css'
import {
  Bai_Jamjuree as BaiJamjuree,
  Roboto_Flex as Roboto,
} from 'next/font/google'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { MobileMenu } from '@/components/MobileMenu'
import { Profile, SignIn } from '@/components/User'

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
        <main className="relative flex min-h-screen flex-col lg:grid lg:grid-cols-2 lg:gap-0">
          <BgPurpleBlur />
          <BgStripes />

          <section className="relative flex items-center justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-5 lg:flex-col lg:items-start lg:justify-between lg:px-14 lg:py-8 xl:px-28 xl:py-16">
            {isAuthenticated ? <Profile /> : <SignIn />}

            <MobileMenu />

            <div className="my-auto hidden h-full w-full flex-col justify-between lg:flex">
              <div className="my-auto">
                <Hero />
              </div>

              <Copyright />
            </div>
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
    <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 rounded-full bg-purple-700 opacity-50 blur-full lg:right-1/2" />
  )
}

function BgStripes() {
  return (
    <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes lg:right-[50.5%]" />
  )
}
