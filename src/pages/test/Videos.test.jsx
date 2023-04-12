import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { vi } from 'vitest';
import { fakeVideo, fakeVideos } from '../../test/videos';
import { withAllContexts, withRouter } from '../../test/utils';
import Videos from '../Videos';

describe('Videos', () => {
  const fakeYoutube = {
    search: vi.fn(),
  };

  beforeEach(() => {
    fakeYoutube.search.mockImplementation((query) =>
      query ? [fakeVideo] : fakeVideos
    );
  });

  afterEach(() => {
    fakeYoutube.search.mockReset();
  });

  it('renders all videos when query is not specified', async () => {
    renderWithPath('/');

    // snapshot테스트로 대체 가능
    expect(fakeYoutube.search).toHaveBeenCalledWith(undefined);
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length);
    });
  });

  it('when query is specified, renders search results', async () => {
    const searchQuery = 'fake-query';

    renderWithPath(`/${searchQuery}`);

    expect(fakeYoutube.search).toHaveBeenCalledWith(searchQuery);
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(1);
    });
  });

  it('renders loading state when item are being fetched', async () => {
    renderWithPath('/');

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state when fetching items fails', async () => {
    fakeYoutube.search.mockImplementation(() => {
      throw new Error('error');
    });

    renderWithPath('/');

    await waitFor(() => {
      expect(screen.getByText(/Error!/i)).toBeInTheDocument();
    });
  });

  function renderWithPath(path) {
    return render(
      withAllContexts(
        withRouter(
          <>
            <Route path='/' element={<Videos />} />
            <Route path='/:query' element={<Videos />} />
          </>,
          path
        ),
        fakeYoutube
      )
    );
  }
});
