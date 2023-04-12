import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function ChannelInfo({ id, title }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery({
    queryKey: ['channel', id],
    queryFn: ({ queryKey }) => {
      const [_, id] = queryKey;

      return youtube.channelImgURL(id);
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <div className='flex items-center py-2 gap-3'>
      {url && <img src={url} alt={title} className='w-10 h-10 rounded-full' />}

      <p className='text-lg font-medium'>{title}</p>
    </div>
  );
}
