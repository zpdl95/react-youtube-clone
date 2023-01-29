import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './Root.pcss';
import { YoutubeApiProvider } from '../context/YoutubeApiContext';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <>
      <Header />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}
