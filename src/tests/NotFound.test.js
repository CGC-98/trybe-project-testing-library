import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

test('Verify "Page requested not found" h2', () => {
  renderWithRouter(<NotFound />);

  const notFoundHeader = screen.getByRole('heading', { name: 'Page requested not found', value: 2 });
  expect(notFoundHeader).toBeInTheDocument();
});

test('Verify image with right alt and src', () => {
  renderWithRouter(<NotFound />);

  const notFoundAlt = 'Pikachu crying because the page requested was not found';
  const notFoundLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const notFoundImage = screen.getByRole('img', { name: notFoundAlt });

  expect(notFoundImage).toBeInTheDocument();
  expect(notFoundImage).toHaveAttribute('src', notFoundLink);
});
