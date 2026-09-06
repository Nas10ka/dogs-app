import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import {
  render,
  screen,
} from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { getRandomDogs } from './api/dogs';
import App from './App';

import type { Dog } from './types/dog';

vi.mock('./api/dogs', () => ({
  getRandomDogs: vi.fn(),
}));

const mockDogs: Dog[] = Array.from(
  { length: 11 },
  (_, index) => ({
    imageUrl: `https://example.com/dog-${index + 1}.jpg`,
    breed: `Breed ${index + 1}`,
  }),
);

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('allows selecting and favoriting a dog', async () => {
    vi.mocked(
      getRandomDogs,
    ).mockResolvedValue(mockDogs);

    const user = userEvent.setup();

    render(<App />);

    expect(
      await screen.findByRole(
        'heading',
        {
          name: 'Breed 1',
        },
      ),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Show Breed 2 as main dog',
      }),
    );

    expect(
      screen.getByRole('heading', {
        name: 'Breed 2',
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Add Breed 2 to favorites',
      }),
    );

    expect(
      screen.getByRole('button', {
        name: 'Select Breed 2 from favorites',
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', {
        name: 'Remove Breed 2 from favorites',
      }),
    );

    expect(
      screen.queryByRole('button', {
        name: 'Select Breed 2 from favorites',
      }),
    ).not.toBeInTheDocument();
  });
});
