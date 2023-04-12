import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { vi } from 'vitest';
import { ChannelInfo, SideRelatedVideos } from '../../components';
import { withRouter } from '../../test/utils';
import Watch from '../Watch';
import { fakeVideo } from '../../test/videos';

vi.mock('../../components/ChannelInfo');
vi.mock('../../components/SideRelatedVideos');

describe('Watch', () => {
  afterEach(() => {
    ChannelInfo.mockReset();
    SideRelatedVideos.mockReset();
  });

  it('render video item details', () => {
    render(
      withRouter(<Route path='/' element={<Watch />} />, {
        pathname: '/',
        state: { video: fakeVideo },
        key: 'fake-key',
      })
    );

    const { title, channelId, channelTitle } = fakeVideo.snippet;
    // ↓의 테스트는 iframe이 정상 렌더링 됬는지 확인하는 테스트
    // getByTitle() = 해당 요소를 title attribute로 가지고 있는 element가 있는지 테스트를 함
    // snapshot테스트로 대체 가능
    expect(screen.getByTitle(title)).toBeInTheDocument();

    expect(SideRelatedVideos.mock.calls[0][0]).toStrictEqual({
      id: fakeVideo.id,
    });
    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      title: channelTitle,
    });
  });
});
