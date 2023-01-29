import React from 'react';
import Searchbar from './Searchbar';
import { BsYoutube } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <header className='flex items-center p-4 text-2xl border-b-2 border-zinc-600 border-solid mb-4'>
      <div
        className='flex items-center capitalize cursor-pointer'
        onClick={handleClick}
      >
        <BsYoutube className='text-4xl text-brand' />
        <h1 className='font-bold ml-2 text-3xl'>youtube</h1>
      </div>
      <Searchbar />
    </header>
  );
}
