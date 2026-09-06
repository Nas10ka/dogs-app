import type { Dog } from '../types/dog';

type DogThumbnailProps = {
  dog: Dog;
  isSelected: boolean;
  onSelect: (dog: Dog) => void;
};

export const DogThumbnail = ({
  dog,
  isSelected,
  onSelect,
}: DogThumbnailProps) => {
  return (
    <button
      className={`dog-thumbnail ${
        isSelected ? 'dog-thumbnail--selected' : ''
      }`}
      type="button"
      onClick={() => onSelect(dog)}
      aria-label={`Show ${dog.breed} as main dog`}
      aria-pressed={isSelected}
    >
      <img
        className="dog-thumbnail__image"
        src={dog.imageUrl}
        alt={`${dog.breed} dog`}
        loading="lazy"
        decoding="async"
      />

      <span className="dog-thumbnail__breed">
        {dog.breed}
      </span>
    </button>
  );
};
