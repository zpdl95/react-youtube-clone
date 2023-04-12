import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi } from 'vitest';
import { Route } from 'react-router-dom';
import { fakeVideos } from '../../test/videos';
import { withAllContexts, withRouter } from '../../test/utils';
import SideRelatedVideos from '../SideRelatedVideos';

describe('SideRelatedVideos', () => {
  const fakeYoutube = { relatedVideos: vi.fn() };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it('SideRelatedVideos snapshot', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);

    const { asFragment } = renderSideRelatedVideos();

    await waitForElementToBeRemoved(screen.queryByText('Loading...'));
    expect(asFragment()).toMatchSnapshot();

    // await waitFor(() => screen.getByRole('list'));
    // expect(asFragment()).toMatchSnapshot();
  });

  it('renders related videos correctly', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);

    renderSideRelatedVideos();

    expect(fakeYoutube.relatedVideos).toHaveBeenCalledWith('id');
    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(fakeVideos.length);
    });
  });

  it('renders loading', () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);

    renderSideRelatedVideos();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error', async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error('error');
    });

    renderSideRelatedVideos();

    await screen.findByText('Error!');
  });

  function renderSideRelatedVideos() {
    return render(
      withAllContexts(
        withRouter(<Route path='/' element={<SideRelatedVideos id='id' />} />),
        fakeYoutube
      )
    );
  }
});
