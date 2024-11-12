"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import {Loader }from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import GeneratePodcast from "@/components/GeneratePodcast"
import GenerateThumbnail from "@/components/GenerateThumbnail"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Id } from "@/convex/_generated/dataModel"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useRouter } from "next/navigation"
const voiceCategories=['alloy','echo','fable','onyx','nova']

const formSchema = z.object({
  podcastTitle: z.string().min(10),
  podcastDescription:z.string()
})

const CreatePodcast=()=> {
  const router=useRouter()
const [voiceType,setVoiceType]=useState<string>('')
const [isSubmitting,setIsSubmitting]=useState(false)
const [imageUrl,setImageUrl]=useState('')
const [imagePrompt,setImagePrompt]=useState('');
const [audioUrl,setAudioUrl]=useState('')
const [audioStorageId,setAudioStorageId]=useState<Id<"_storage">|null>(null)
const [imageStorageId,setImageStorageId]=useState<Id<"_storage">|null>(null)
const [audioDuration,setAudioDuration]=useState(0)
const [voicePrompt,setVoicePrompt]=useState('')
const createPodcast=useMutation(api.podcasts.createPodcast)
const {toast}=useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
     podcastTitle:"",
     podcastDescription:""
    },
  })
 
  
 async  function onSubmit(data: z.infer<typeof formSchema>) {
  try{
  setIsSubmitting(true)
  if(!audioUrl||!imageUrl)
   {
   
    toast({
      title:"please generate audio or image"
    })
    setIsSubmitting(false)
    throw new Error('no audio or image')
   }
  await createPodcast({
    podcastTitle: data.podcastTitle,
    podcastDescription: data.podcastDescription,
    audioUrl,
    imageUrl,
    voiceType,
    imagePrompt,
    voicePrompt,
    views: 0,
    audioDuration,
    audioStorageId: audioStorageId!,
    imageStorageId: imageStorageId!,
   })
   toast({
    title:'podcast created successfully'
   })
   setIsSubmitting(false)
   router.push('/')
  }
  catch(e)
  {
    console.log(e)
     toast({
      title:"Error",
      variant:"destructive"
     })
     setIsSubmitting(false)
  }
  }
  return (
    <section className="mt-10 flex flex-col">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
        <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
        <FormField
          control={form.control}
          name="podcastTitle"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
              <FormControl>
                <Input placeholder="Give your podcast a title" {...field} className="input-class focus-visible ring-orange-1" aria-placeholder="podcast"/>
              </FormControl>
              <FormDescription>
          
              </FormDescription>
              <FormMessage className="text-white-1"/>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2.5">
          <Label className="text-16 font-bold text-white-1">
          Select Ai voice
          </Label>
          <Select onValueChange={(value)=>setVoiceType(value)}>
  <SelectTrigger className={cn('text-16 border-b w-full bg-black-1 text-gray-1')}>
    <SelectValue placeholder="select AI voice" className="placeholder:text-gray-1"/>
  </SelectTrigger>
  <SelectContent className="text-16 bg-black-1 text-white-1 border-none focus:ring-orange-1">
   {voiceCategories.map((category)=>(
    <SelectItem className="capitalise focus:bg-orange-1" key={category} value={category}>
      {category} </SelectItem>
   ))}
  </SelectContent>
  {voiceType && (<audio src={`/${voiceType}.mp3`} autoPlay className="hidden"/>)}
</Select>


        </div>
        <FormField
          control={form.control}
          name="podcastDescription"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2.5">
              <FormLabel className="text-16 font-bold text-white-1">Podcast Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write a description about your podcast" {...field} className="input-class focus-visible ring-orange-1" aria-placeholder="podcast"/>
              </FormControl>
              <FormDescription>
               
              </FormDescription>
              <FormMessage className="text-white-1"/>
            </FormItem>
          )}
        />

        </div>
        
       <div className="flex flex-col pt-10">
         <GeneratePodcast setAudioStorageId={setAudioStorageId}
         setAudio={setAudioUrl}
         voicePrompt={voicePrompt}
         voiceType={voiceType!}
         audio={audioUrl}
         setVoicePrompt={setVoicePrompt}
         setAudioDuration={setAudioDuration}/>
         <GenerateThumbnail setImage={setImageUrl}
         setImageStorageId={setImageStorageId}
         image={imageUrl}
         imagePrompt={imagePrompt}
         setImagePrompt={setImagePrompt}/>
         <div className="mt-10 w-full">
          <Button type="submit" className="bg-orange-1 text-16 py-4 font-extrabold text-white-1  transition-all duration-500 hover:bg-black-1 w-full">
       {isSubmitting?(
        <>
        <Loader className="animate-spin ml-2" size={20}/>
                Submitting
        </>
       ):(
        'Submit and Publish'
       )}
          </Button>
         </div>
       </div>
      
      </form>
    </Form>
    </section>
  )
}
export default CreatePodcast