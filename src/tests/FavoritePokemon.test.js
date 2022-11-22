import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

test('Verify message for No Favorite Pokémon', () => {
  renderWithRouter(<FavoritePokemon />);

  const noFavPokemon = screen.getByText(/No favorite Pokémon found/);
  expect(noFavPokemon).toBeInTheDocument();
});

test('Verify Favorite Pokémon Cards', () => {
  renderWithRouter(<App />);

  const fireButton = screen.getByRole('button', { name: 'Fire' });
  const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });

  expect(fireButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  userEvent.click(fireButton);
  userEvent.click(nextButton);

  const details = screen.getByRole('link', { name: 'More details' });
  expect(details).toBeInTheDocument();
  userEvent.click(details);

  const rapidashHeader = screen.getByRole('heading', { name: 'Rapidash Details', level: 2 });
  const favIcon = screen.getByText('Pokémon favoritado?', { selector: 'label' });
  const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

  expect(rapidashHeader).toBeInTheDocument();
  expect(favIcon).toBeInTheDocument();
  userEvent.click(favIcon);
  userEvent.click(favPokemonLink);

  const favHeader = screen.getByRole('heading', { name: 'Favorite Pokémon', level: 2 });
  const favPokemon = screen.getByTestId('pokemon-name');
  const { getByText } = within(favPokemon);
  expect(favHeader).toBeInTheDocument();
  expect(favPokemon).toBeInTheDocument();
  expect(getByText('Rapidash')).toBeInTheDocument();
});
