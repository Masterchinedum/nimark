'use client'

import React, { useState } from 'react'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { VerticalMainNav } from '@/components/VerticalMainNav'

interface ClientNavbarProps {
  stores: Array<{ id: string; name: string }>
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ stores }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className='flex items-center ml-auto space-x-4 w-full md:w-auto'>
      {/* Hide ThemeToggle on small devices, show on larger ones, and hide it when dropdown is open */}
      <div className={`hidden md:block ${isDropdownOpen ? 'hidden' : 'block'}`}>
        <ThemeToggle />
      </div>
      <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="md:hidden w-full">
            Open Menu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full md:w-56 md:hidden">
          <VerticalMainNav className="px-4 py-3 w-full" />
          {/* Show ThemeToggle only in the dropdown menu on small devices */}
          <ThemeToggle />
        </DropdownMenuContent>
      </DropdownMenu>
      <UserButton afterSignOutUrl='/'/>
    </div>
  )
}

export default ClientNavbar
