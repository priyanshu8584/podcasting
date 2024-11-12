"use client";
import React from 'react'
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from '@/components/ui/button'
import { podcastData } from '@/constants'
import PodcastCard from '@/components/PodcastCard'

const Home = () => {
  const tasks = useQuery(api.tasks.get);
  const trendingPodcasts=useQuery(api.podcasts.getTrendingPodcasts)
  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className='flex flex-col gap-5'>
        <h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>

        <div className="podcast_grid">
          {trendingPodcasts?.map(({ _id, podcastTitle, podcastDescription, imageUrl }:any) => (
            <PodcastCard 
              key={_id}
              imgUrl={imageUrl as string}
              title={podcastTitle}
              description={podcastDescription}
              podcastId={_id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home