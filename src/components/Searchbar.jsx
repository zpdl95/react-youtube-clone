import React, { useEffect, useState, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';

export default function Searchbar() {
  const { query } = useParams();
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
    inputRef.current.blur();
  };

  useEffect(() => setText(query || ''), [query]);

  return (
    <form
      data-testid='search-form'
      className='w-full flex justify-center'
      onSubmit={handleSubmit}
    >
      <input
        className='w-7/12 p-2 outline-none bg-black'
        type='text'
        placeholder='Search'
        name='text'
        value={text}
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
      />
      <button className='bg-zinc-600 px-4'>
        <BsSearch />
      </button>
    </form>
  );
}
