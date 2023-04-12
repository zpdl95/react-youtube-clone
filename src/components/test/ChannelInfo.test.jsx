import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { vi } from 'vitest';
import { withAllContexts, withRouter } from '../../test/utils';
import ChannelInfo from '../ChannelInfo';

describe('ChannelInfo', () => {
  const fakeYoutube = { channelImgURL: vi.fn() };

  afterEach(() => fakeYoutube.channelImgURL.mockReset());

  it('ChannelInfo snapshot', async () => {
    fakeYoutube.channelImgURL.mockImplementation(() => 'url');

    // asFragment = 이 함수를 실행시키면 그 타이밍의 렌더링 컴포넌트를 리턴한다
    const { asFragment } = renderChannelInfo();

    await screen.findByRole('img');
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without URL', () => {
    fakeYoutube.channelImgURL.mockImplementation(() => {
      throw new Error('error');
    });

    renderChannelInfo();

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('renders with URL', async () => {
    fakeYoutube.channelImgURL.mockImplementation(() => 'url');

    renderChannelInfo();

    await screen.findByRole('img');
  });

  function renderChannelInfo() {
    return render(
      withAllContexts(
        withRouter(
          <Route path='/' element={<ChannelInfo id='id' title='title' />} />
        ),
        fakeYoutube
      )
    );
  }
});
