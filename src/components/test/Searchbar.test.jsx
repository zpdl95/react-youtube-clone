import React from 'react';
import renderer from 'react-test-renderer';
import { Outlet, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withRouter } from '../../test/utils';
import Searchbar from '../Searchbar';

describe('Searchbar', () => {
  it('Searchbar snapshot', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<Searchbar />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders with query correctly', () => {
    render(
      withRouter(<Route path='/:query' element={<Searchbar />} />, '/bts')
    );

    expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('bts');
  });

  it('navigates to results page on searchbar submit', async () => {
    const query = 'fake-query';

    render(
      withRouter(
        <Route
          path='/'
          element={
            <>
              <Searchbar />
              <Outlet />
            </>
          }
        >
          <Route
            path={`/videos/${query}`}
            element={<p>{`Search result for ${query}`}</p>}
          />
        </Route>
      )
    );

    const searchInput = screen.getByRole('textbox');

    await userEvent.type(searchInput, query);
    await userEvent.type(searchInput, '{Enter}');
    // fireEvent.submit(screen.getByTestId('search-form'));

    // 버튼 방식
    // const searchButton = screen.getByRole('button');
    // const searchInput = screen.getByRole('textbox');
    // userEvent.type(searchInput, searchKeyword);
    // userEvent.click(searchButton);

    expect(screen.getByText(`Search result for ${query}`)).toBeInTheDocument();
  });
});
