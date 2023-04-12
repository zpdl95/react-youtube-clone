import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route, useLocation } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import VideoCard from '../VideoCard';
import { formatAgo } from '../../util/date';
import { fakeVideo as video } from '../../test/videos';
import { withRouter } from '../../test/utils';

describe('VideoCard', () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it('renders grid type correctly', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<VideoCard video={video} />} />)
    );

    // toMatchSnapshot() 함수가 처음실행하면 스냅샷을 만들고 두번째 실행부터 test를 한다
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders list type correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path='/' element={<VideoCard video={video} type='list' />} />
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders video item', () => {
    render(
      withRouter(<Route path='/' element={<VideoCard video={video} />} />)
    );

    const image = screen.getByRole('img');

    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it('navigates to detailed video page with video state when clicked', async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }
    render(
      withRouter(
        <>
          <Route path='/' element={<VideoCard video={video} />} />
          <Route
            path={`/videos/watch/${video.id}`}
            element={<LocationStateDisplay />}
          />
        </>
      )
    );

    const img = screen.getByRole('img');
    await userEvent.click(img);

    expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
  });
});
