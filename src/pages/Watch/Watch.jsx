import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChannelInfo, SideRelatedVideos } from '../../components';

export default function Watch() {
  const {
    state: { video },
  } = useLocation();

  const { publishedAt, title, channelTitle, channelId, description } =
    video?.snippet;

  return (
    <section className='flex flex-col lg:flex-row gap-5 px-4'>
      <article className='basis-9/12'>
        <iframe
          id='player'
          type='text/html'
          width='100%'
          height='664'
          src={`http://www.youtube.com/embed/${video.id}`}
          frameBorder='0'
          title={title}
        />

        <div>
          <h2 className='text-2xl font-bold py-3'>{title}</h2>
          <ChannelInfo id={channelId} title={channelTitle} />
          <div className='line-clamp-4'>
            <p>
              {new Date(publishedAt).toLocaleDateString()}
              {new Date(publishedAt).toLocaleTimeString()}
            </p>
            <pre className='whitespace-pre-wrap'>{description}</pre>
          </div>
        </div>
      </article>

      <aside className='basis-3/12'>
        <SideRelatedVideos id={video.id} />
      </aside>
    </section>
  );
}
