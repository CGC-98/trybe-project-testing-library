import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';
import App from '../App';

test('Verify display of name, type and weight', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });

  userEvent.click(allButton);

  pokemonList.forEach(({ name, type, image, averageWeight: AW }) => {
    const weight = `Average weight: ${AW.value} ${AW.measurementUnit}`;
    const sprite = `${name} sprite`;

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', { alt: sprite });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(name);

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(type);

    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(weight);

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', image);
    expect(pokemonImg).toHaveAttribute('alt', sprite);

    userEvent.click(nextButton);
  });
});

test('Verify display of "More details" link and if it works', () => {
  const { history } = renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  userEvent.click(allButton);

  pokemonList.forEach(({ id, name, image }, index) => {
    const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    for (let i = 0; i < index; i += 1) userEvent.click(nextButton);

    const detailsButton = screen.getByRole('link', { name: 'More details' });
    expect(detailsButton).toBeInTheDocument();
    userEvent.click(detailsButton);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${id}`);

    const pokemonImg = screen.getByRole('img', { name: `${name} sprite` });
    const favCheck = screen.getByLabelText('Pokémon favoritado?');

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', image);
    expect(favCheck).toBeInTheDocument();

    userEvent.click(favCheck);

    const starIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');

    const homeButton = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeButton);
  });
});
