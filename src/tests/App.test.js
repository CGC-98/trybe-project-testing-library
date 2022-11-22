import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verify existing links', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: 'Home' });
  const aboutLink = screen.getByRole('link', { name: 'About' });
  const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favPokemonLink).toBeInTheDocument();
});

test('Verify "/" redirect', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  userEvent.click(homeLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Verify "/about" redirect', async () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Verify "/favorites" redirect', () => {
  const { history } = renderWithRouter(<App />);

  const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
  userEvent.click(favPokemonLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Verify redirect to unexistent route', async () => {
  const { history } = renderWithRouter(<App />);

  act(() => {
    history.push('/non/existent/page');
  });

  const notFound = await screen.findByRole('heading', { name: 'Page requested not found', level: 2 });
  expect(notFound).toBeInTheDocument();
});
