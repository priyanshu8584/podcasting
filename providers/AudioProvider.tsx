'use client'

import { AudioContextType, AudioProps } from "@/types"
import { usePathname } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import React from "react"

const AudioContext=createContext<AudioContextType|undefined>(undefined)

const AudioProvider=({children}:{children:React.ReactNode})=>{
  const [audio,setAudio]=useState<AudioProps|undefined>()
  const pathName=usePathname()
  useEffect(()=>{
    if(pathName=='/create-podcast')setAudio(undefined)
  },[pathName])
return <AudioContext.Provider value={{audio,setAudio}}>
  {children}
</AudioContext.Provider>
}
export const useAudio=()=>{
  const context=useContext(AudioContext)
  if(!context)
    throw new Error('use Audio must use an AUdio Provider')
  return context
}
export default AudioProvider