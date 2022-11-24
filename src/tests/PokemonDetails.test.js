import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

const nextPokemon = 'Próximo Pokémon';

test('Verify selected Pokémon info display', () => {
  const { history } = renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  userEvent.click(allButton);

  pokemonList.forEach(({ name, summary, foundAt }, index) => {
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    for (let i = 0; i < index; i += 1) userEvent.click(nextButton);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const pokemonHeader = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(pokemonHeader).toBeInTheDocument();

    const noDetailsButton = screen.queryByRole('button', { name: nextPokemon });
    expect(noDetailsButton).not.toBeInTheDocument();

    const summaryHeader = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(summaryHeader).toBeInTheDocument();

    const resumeParagraph = screen.getByText(summary);
    expect(resumeParagraph).toBeInTheDocument();

    const locationHeader = screen.getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
    expect(locationHeader).toBeInTheDocument();

    const pokemonLocations = screen.getAllByAltText(`${name} location`);
    expect(pokemonLocations).toHaveLength(foundAt.length);

    pokemonLocations.forEach((location, i) => {
      expect(location).toBeInTheDocument();

      const locationName = screen.getByText(foundAt[i].location);
      const locationMap = screen.getAllByAltText(`${name} location`)[i];

      expect(locationName).toBeInTheDocument();
      expect(locationMap).toBeInTheDocument();
      expect(locationMap).toHaveAttribute('src', foundAt[i].map);
      expect(locationMap).toHaveAttribute('alt', `${name} location`);
    });

    act(() => {
      history.goBack();
    });
  });
});

test('Verify ability to favorite Pokémon', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  userEvent.click(allButton);

  pokemonList.forEach(({ name }, index) => {
    const nextButton = screen.getByRole('button', { name: nextPokemon });
    for (let i = 0; i < index; i += 1) userEvent.click(nextButton);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    userEvent.click(detailsLink);

    const favCheck = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheck).toBeInTheDocument();
    userEvent.click(favCheck);

    const favLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favLink).toBeInTheDocument();
    userEvent.click(favLink);

    const favPokemon = screen.getByText(name);
    expect(favPokemon).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
  });
});
