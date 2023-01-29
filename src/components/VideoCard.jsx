import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatAgo } from '../util/date';

export default function VideoCard({ video, type }) {
  const { publishedAt, title, thumbnails, channelTitle } = video.snippet;
  const isList = type === 'list';
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/videos/watch/${video.id}`, {
      state: { video },
    });
  };

  return (
    <li className={`flex ${isList ? 'gap-2' : 'flex-col mb-8'} `}>
      <img
        className={`cursor-pointer ${
          isList ? 'w-40 rounded-md' : 'rounded-lg'
        }`}
        onClick={handleClick}
        src={thumbnails.medium.url}
        alt={title}
      />

      <div>
        <p
          className={`font-semibold my-2 line-clamp-2 ${
            isList ? 'text-sm font-normal' : ''
          }`}
        >
          {title}
        </p>
        <p className={`text-sm opacity-70 ${isList ? 'text-xs' : ''}`}>
          {channelTitle}
        </p>
        <p className={`text-sm opacity-70 ${isList ? 'text-xs' : ''}`}>
          {formatAgo(publishedAt)}
        </p>
      </div>
    </li>
  );
}
