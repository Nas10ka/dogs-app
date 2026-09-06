const capitalize = (value: string): string => {
  if (!value) {
    return value;
  }

  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
};

export const getBreedFromImageUrl = (imageUrl: string): string => {
  try {
    const url = new URL(imageUrl);

    const pathParts = url.pathname
      .split('/')
      .filter(Boolean);

    const breedsIndex = pathParts.indexOf('breeds');

    if (breedsIndex === -1) {
      return 'Unknown breed';
    }

    const breedSlug = pathParts[breedsIndex + 1];

    if (!breedSlug) {
      return 'Unknown breed';
    }

    const [breed, ...subBreed] = breedSlug
      .split('-')
      .map(capitalize);

    if (subBreed.length > 0) {
      return `${breed} (${subBreed.join(' ')})`;
    }

    return breed;
  } catch {
    return 'Unknown breed';
  }
};
