import React from 'react'
import { SignIn } from '@clerk/nextjs'
const Page = () => {
  return (
    <div className='flex-center glassmorphism-auth h-screen w0-full'>
      <SignIn/>

    </div>
  )
}

export default Page