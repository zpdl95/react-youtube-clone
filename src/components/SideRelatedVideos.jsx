import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from './VideoCard';

export default function SideRelatedVideos({ id }) {
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    isError,
    data: videos,
  } = useQuery({
    queryKey: ['related', id],
    queryFn: ({ queryKey }) => {
      const [_, id] = queryKey;

      return youtube.relatedVideos(id);
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}
      {videos && (
        <ul className='flex flex-col gap-2 mb-4'>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} type='list' />
          ))}
        </ul>
      )}
    </>
  );
}
