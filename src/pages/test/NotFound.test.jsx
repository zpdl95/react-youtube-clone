import React from 'react';
import { Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { withRouter } from '../../test/utils';
import { NotFound } from '../index';

describe('NotFound', () => {
  it('NotFound snapshot', () => {
    const component = renderer.create(
      withRouter(<Route path='/' element={<NotFound />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
