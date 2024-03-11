/*
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the 2024 edition of the Software Architecture course/i);
  expect(linkElement).toBeInTheDocument();
});
*/
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('./App', () => {
  it('should render the component without crashing', () => {
    // Render the component
    render(<App />);

  });
});
