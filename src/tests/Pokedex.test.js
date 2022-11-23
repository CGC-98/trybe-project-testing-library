import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Verify "Encountered Pokémon" h2', () => {
  renderWithRouter(<App />);

  const encounterHeader = screen.getByRole('heading', { name: 'Encountered Pokémon', level: 2 });
  expect(encounterHeader).toBeInTheDocument();
});

test('Verify existence of all buttons', () => {
  renderWithRouter(<App />);

  const allButton = screen.getByRole('button', { name: 'All' });
  const electricButton = screen.getByRole('button', { name: 'Electric' });
  const fireButton = screen.getByRole('button', { name: 'Fire' });
  const bugButton = screen.getByRole('button', { name: 'Bug' });
  const poisonButton = screen.getByRole('button', { name: 'Poison' });
  const psychicButton = screen.getByRole('button', { name: 'Psychic' });
  const normalButton = screen.getByRole('button', { name: 'Normal' });
  const dragonButton = screen.getByRole('button', { name: 'Dragon' });
  const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });

  expect(allButton).toBeInTheDocument();
  expect(electricButton).toBeInTheDocument();
  expect(fireButton).toBeInTheDocument();
  expect(bugButton).toBeInTheDocument();
  expect(poisonButton).toBeInTheDocument();
  expect(psychicButton).toBeInTheDocument();
  expect(normalButton).toBeInTheDocument();
  expect(dragonButton).toBeInTheDocument();
  expect(nextButton).toBeInTheDocument();

  const pikachuGIF = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(pikachuGIF).toBeInTheDocument();

  userEvent.click(allButton);
  userEvent.click(nextButton);

  const charmanderGIF = screen.getByRole('img', { name: 'Charmander sprite' });
  expect(charmanderGIF).toBeInTheDocument();

  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);

  const mewGIF = screen.getByRole('img', { name: 'Mew sprite' });
  expect(mewGIF).toBeInTheDocument();

  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);

  const newPikachuGIF = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(newPikachuGIF).toBeInTheDocument();

  const typeButtonCount = screen.getAllByTestId('pokemon-type-button');
  expect(typeButtonCount).toHaveLength(7);

  userEvent.click(fireButton);
  userEvent.click(nextButton);

  const rapidashGIF = screen.getByRole('img', { name: 'Rapidash sprite' });
  expect(rapidashGIF).toBeInTheDocument();
});
