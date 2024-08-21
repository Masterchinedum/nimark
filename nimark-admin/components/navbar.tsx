import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { MainNav } from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from '@/components/theme-toggle'
import NavbarMenu from './navbarmenu'

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
      <div className='flex items-center h-16 px-4 md:px-8 lg:px-12'>
        <StoreSwitcher items={stores} />
        <div className="hidden md:block">
          <MainNav className='mx-6 md:mx-8 lg:mx-12' />
        </div>
        <NavbarMenu />
        <div className="hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-8">
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default Navbar