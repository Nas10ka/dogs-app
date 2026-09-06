import {
  describe,
  expect,
  it,
} from 'vitest';

import { getBreedFromImageUrl } from './getBreedFromImageUrl';

describe('getBreedFromImageUrl', () => {
  it('extracts a simple breed', () => {
    const result = getBreedFromImageUrl(
      'https://images.dog.ceo/breeds/beagle/n02088364_11136.jpg',
    );

    expect(result).toBe('Beagle');
  });

  it('extracts a breed and sub-breed', () => {
    const result = getBreedFromImageUrl(
      'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
    );

    expect(result).toBe('Hound (Afghan)');
  });

  it('returns Unknown breed for an invalid URL', () => {
    expect(
      getBreedFromImageUrl(
        'not-a-valid-url',
      ),
    ).toBe('Unknown breed');
  });
});
