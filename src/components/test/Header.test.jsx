import React from 'react';
import renderer from 'react-test-renderer';
import { Route } from 'react-router-dom';
import Header from '../Header';
import { withRouter } from '../../test/utils';

describe('Header', () => {
  it('Header snapshot', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<Header />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
