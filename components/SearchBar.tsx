'use client'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useDebounce } from '@/lib/useDebounce'

const SearchBar = () => {

  const [search,setSearch]=useState('')
  const debouncedValue=useDebounce(search,500)
  const router=useRouter()
  const pathName=usePathname()
  useEffect(()=>{
if(debouncedValue)
{
  router.push(`/discover?search=${debouncedValue}`)

}
else if(!debouncedValue && pathName==='/discover')
  router.push('/discover')
  },[router,pathName,debouncedValue])
  return (
    <div className='relative mt-8 block'>
      <Input 
      className='input-class py-6 pl-12 focus:visible ring-offset-orange-1'
      placeholder='Search for Podcasts'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      onLoad={()=>setSearch('')}/>
      <Image
      src="/icons/search.svg"
      alt='search'
      height={20}
      width={20}
      className='absolute left-4 top-3.5'/>
    </div>
  )
}

export default SearchBar