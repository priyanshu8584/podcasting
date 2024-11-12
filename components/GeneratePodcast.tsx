import React, { useState } from 'react'
import { GeneratePodcastProps } from '@/types'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

import { api } from '@/convex/_generated/api'

import { v4 as uuidv4 } from 'uuid';
import { useAction, useMutation } from 'convex/react'
import { generateUploadUrl } from '@/convex/files'
import {useUploadFiles} from "@xixixao/uploadstuff/react"
import { Toast } from './ui/toast'
import { useToast } from '@/hooks/use-toast'
const useGeneratePodcast=({setAudio,voiceType,voicePrompt,setAudioStorageId}:GeneratePodcastProps)=>{
  const [isGenerating,setIsGenerating]=useState(false)
  const {toast}=useToast();
  const generateUploadUrl=useMutation(api.files.generateUploadUrl);
  const {startUpload}=useUploadFiles(generateUploadUrl)
  const getPodcastAudio=useAction(api.openai.generateAudioAction)
  const getAudioUrl = useMutation(api.podcasts.getUrl);
  const generatePodcast=async()=>{
    setIsGenerating(true)
    setAudio('')
    if(!voicePrompt){ 
      toast:({
        title:"failed"
      })
      return setIsGenerating(false)
    }
    try{
      const response=await getPodcastAudio({
         voice:voiceType,
        input:voicePrompt
      
    })
    const blob = new Blob([response], { type: 'audio/mpeg' });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: 'audio/mpeg' });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;
       console.log(storageId)
      setAudioStorageId(storageId);
    
   
   
    const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
       toast({
         title: "Podcast generated successfully",
       })
  }
    catch(err)
    {
     console.log("error generating podcast")
     setIsGenerating(false)
     toast:{

     }
    }
  }
  return{
    isGenerating,
    generatePodcast
  }
  }
const GeneratePodcast = (
  
  props
:GeneratePodcastProps) => {
 
  const {isGenerating,generatePodcast}=useGeneratePodcast(props)
  return (
    <div>
      <div className='flex flex-col text-white-1 gap-2.5'>
       <Label className='text-16 font-bold'>
        AI prompt
       </Label>
      <Textarea className='input-class font-light focus-visible:ring-offset-orange-1'
      placeholder='provide text to generate audio'
      rows={5}
      value={props.voicePrompt}
      onChange={(e)=>props.setVoicePrompt(e.target.value)}/>
      </div>
      <div className='mt-5 w-full max-w-[200px]'>
      <Button type="submit" className="bg-orange-1 text-16 py-4 font-bold text-white-1  " onClick={generatePodcast}>
       {isGenerating?(
        <>
        <Loader className="animate-spin ml-2" size={20}/>
                Generating
        </>
       ):(
        'Generate '
       )}
          </Button>
      </div>
      {props.audio && (
        <audio 
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>props.setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast