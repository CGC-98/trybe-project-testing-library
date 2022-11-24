import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verify "Encountered Pokémon" h2', () => {
  renderWithRouter(<App />);

  const encounterHeader = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
  expect(encounterHeader).toBeInTheDocument();
});

test('Verify existence and functionality of all buttons', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });

  expect(allButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  const listOfTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  listOfTypes.forEach((type) => {
    const typeButton = screen.getByRole('button', { name: type });
    expect(typeButton).toBeInTheDocument();

    userEvent.click(typeButton);

    const typeText = screen.getByTestId('pokemon-type', { name: type });
    expect(typeText).toBeInTheDocument();
  });
});

test('Verify integrity of "All" loop', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });

  const pikachuGIF = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(pikachuGIF).toBeInTheDocument();

  userEvent.click(allButton);
  for (let i = 0; i < 5; i += 1) { userEvent.click(nextButton); }

  const mewGIF = screen.getByRole('img', { name: 'Mew sprite' });
  expect(mewGIF).toBeInTheDocument();

  for (let i = 0; i < 4; i += 1) { userEvent.click(nextButton); }

  const newPikachuGIF = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(newPikachuGIF).toBeInTheDocument();

  const typeButtonCount = screen.getAllByTestId('pokemon-type-button');
  expect(typeButtonCount).toHaveLength(7);
});
