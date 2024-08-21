"use client"

import { useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { MainNav } from './main-nav'

const NavbarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div>
      <div className="ml-auto flex items-center space-x-4 md:space-x-6 lg:space-x-8">
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          <MainNav className="flex flex-col space-y-4" />
        </div>
      )}
    </div>
  )
}

export default NavbarMenu