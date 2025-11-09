import React from 'react'
import { auth } from '@/auth'
import { MainNav } from '@/components/main-nav'
import StoreSwitcher from '@/components/store-switcher'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import ClientNavbar from './ClientNavbar'  // Import the client component

const Navbar = async () => {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  const stores = await prismadb?.store.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return (
    <div className='border-b'>
      <div className='flex items-center h-16 px-0'>
        <StoreSwitcher items={stores} />
        <div className='hidden md:flex mx-6'>
          <MainNav />
        </div>
        {/* Render the client component and pass necessary props */}
        <ClientNavbar stores={stores} user={session.user} />
      </div>
    </div>
  )
}

export default Navbar
