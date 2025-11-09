'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { VerticalMainNav } from '@/components/VerticalMainNav'
import { User, LogOut } from 'lucide-react'

interface ClientNavbarProps {
  stores: Array<{ id: string; name: string }>
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

const ClientNavbar: React.FC<ClientNavbarProps> = ({ stores, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/sign-in' })
  }

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
      
      {/* User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {user?.name && (
            <>
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                {user.email && (
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                )}
              </div>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ClientNavbar
