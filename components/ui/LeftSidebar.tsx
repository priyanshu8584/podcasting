"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sideLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { SignedOut,SignedIn } from '@clerk/nextjs'
import { useClerk } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
const LeftSidebar = () => {
  const pathName=usePathname();
  const { signOut } = useClerk();
  const router=useRouter();
  return (
    <section className='left_sidebar'>
      <nav className='flex flex-col gap-6'>
        <Link href="/" className='flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center'>
          <Image src="/icons/logo.svg"
          width={23}
          height={23}
          alt='logo'
          />
            <h1 className='text-24 font-extrabold text-white-1 max-lg:hidden'>Podcastr</h1>
       
        </Link>
        {sideLinks.map(({route,label,imgURL})=>{
          const isActive=pathName===route||pathName.startsWith(`${route}/`)
          return <Link href={route} key={label} className={cn('flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start',{
            'bg-nav-focus border-r-4  border-orange-1':isActive
          })}>
            <Image  src={imgURL}  alt='logo' height={24} width={24}/>
            {label}
          </Link>
        })}

      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button asChild className="text-16 w-full bg-orange-1 font-extrabold">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button className="text-16 w-full bg-orange-1 font-extrabold" onClick={() => signOut(() => router.push('/'))}>
            Log Out
          </Button>
        </div>
      </SignedIn>
      
    </section>
  )
}

export default LeftSidebar