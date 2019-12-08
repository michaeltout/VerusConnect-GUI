import React from 'react'
import Main from '../../src/components/main/main'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer
    .create(<Main />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});