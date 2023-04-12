import React from 'react';
import { Link } from 'react-router-dom';
import { BsYoutube } from 'react-icons/bs';
import Searchbar from './Searchbar';

export default function Header() {
  return (
    <header className='flex items-center p-4 text-2xl border-b-2 border-zinc-600 border-solid mb-4'>
      <Link to='/' className='flex items-center capitalize cursor-pointer'>
        <BsYoutube className='text-4xl text-brand' />
        <h1 className='font-bold ml-2 text-3xl'>Youtube</h1>
      </Link>
      <Searchbar />
    </header>
  );
}
