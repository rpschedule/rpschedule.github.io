import { render, screen } from '@testing-library/react';
import Clock from './Clock';

test('renders event', () => {
  render(<Clock />);
  const linkElement = screen.getByText(/until/i);
  expect(linkElement).toBeInTheDocument();
});