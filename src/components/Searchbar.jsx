import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';

export default function Searchbar() {
  const { query } = useParams();
  const [text, setText] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
    e.target[0].blur();
  };

  useEffect(() => {
    setText(query || '');
  }, [query]);

  return (
    <form className='w-full flex justify-center' onSubmit={handleSubmit}>
      <input
        className='w-7/12 p-2 outline-none bg-black'
        type='text'
        placeholder='Search'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className='bg-zinc-600 px-4'>
        <BsSearch />
      </button>
    </form>
  );
}
