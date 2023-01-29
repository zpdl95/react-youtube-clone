import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { VideoCard } from '../../components';
import { useYoutubeApi } from '../../context/YoutubeApiContext';

export default function Videos() {
  const { query } = useParams();
  const { youtube } = useYoutubeApi();
  const {
    isLoading,
    isError,
    data: videos,
  } = useQuery({
    queryKey: ['videos', query],
    queryFn: ({ queryKey }) => {
      const [_, query] = queryKey;

      return youtube.search(query);
    },
    staleTime: 1000 * 60 * 1,
  });

  return (
    <section className='px-4'>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}
      {videos && (
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </section>
  );
}
