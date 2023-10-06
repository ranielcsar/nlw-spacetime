'use client'

import { Menu } from 'lucide-react'
import { useState } from 'react'

import { Copyright } from '@/components/Copyright'
import { Hero } from '@/components/Hero'
import { Slideover } from '@/components/Slideover'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenMenu() {
    setIsOpen(true)
  }

  function handleCloseMenu() {
    setIsOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="block lg:hidden"
        onClick={handleOpenMenu}
      >
        <Menu className="mr-3 h-7 w-7" />
      </button>

      <Slideover isOpen={isOpen} onClose={handleCloseMenu}>
        <Hero />

        <div className="fixed bottom-10">
          <Copyright />
        </div>
      </Slideover>
    </>
  )
}
