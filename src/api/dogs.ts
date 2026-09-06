import type { Dog } from '../types/dog';
import { getBreedFromImageUrl } from '../utils/getBreedFromImageUrl';

const DOG_API_URL = 'https://dog.ceo/api';

type DogApiResponse = {
  message: string[];
  status: string;
};

export const getRandomDogs = async (
  count: number,
  signal?: AbortSignal,
): Promise<Dog[]> => {
  if (!Number.isInteger(count) || count < 1 || count > 50) {
    throw new Error('Dog count must be between 1 and 50');
  }

  const response = await fetch(
    `${DOG_API_URL}/breeds/image/random/${count}`,
    {
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch dogs: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as DogApiResponse;

  if (
    data.status !== 'success' ||
    !Array.isArray(data.message)
  ) {
    throw new Error('Unexpected response from Dog API');
  }

  return data.message.map((imageUrl) => ({
    imageUrl,
    breed: getBreedFromImageUrl(imageUrl),
  }));
};
