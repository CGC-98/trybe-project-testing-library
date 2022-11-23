import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

test('Find Pokédex info', () => {
  renderWithRouter(<About />);

  const aboutHeader = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
  const aboutP1 = screen.getByText(/This application simulates a Pokédex/);
  const aboutP2 = screen.getByText(/One can filter Pokémon by type/);

  expect(aboutHeader).toBeInTheDocument();
  expect(aboutP1).toBeInTheDocument();
  expect(aboutP2).toBeInTheDocument();
});

test('Find Pokédex images', () => {
  renderWithRouter(<About />);

  const pokedexImg = screen.getByRole('img');
  const pokedexImgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

  expect(pokedexImg).toBeInTheDocument();
  expect(pokedexImg).toHaveAttribute('src', pokedexImgURL);
  expect(pokedexImg).toHaveAttribute('alt', 'Pokédex');
});
