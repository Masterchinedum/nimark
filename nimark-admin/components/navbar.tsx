import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { MainNav } from '@/components/main-nav'
import { VerticalMainNav } from '@/components/VerticalMainNav'
import StoreSwitcher from '@/components/store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const Navbar = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const stores = await prismadb?.store.findMany({
    where: {
      userId,
    },
  })

  return (
    <div className='border-b'>
      <div className='flex items-center h-16 px-4'>
        <StoreSwitcher items={stores} />
        <div className='hidden md:flex mx-6'>
          <MainNav />
        </div>
        <div className='flex items-center ml-auto space-x-4'>
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="md:hidden">
                Open Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 md:hidden">
              <VerticalMainNav className="px-4 py-3" />
              <ThemeToggle />
            </DropdownMenuContent>
          </DropdownMenu>
          <UserButton afterSignOutUrl='/'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar