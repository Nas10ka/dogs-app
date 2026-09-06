import type { Dog } from '../types/dog';

type MainDogProps = {
  dog: Dog;
  isFavorite: boolean;
  onAddFavorite: (dog: Dog) => void;
};

export const MainDog = ({
  dog,
  isFavorite,
  onAddFavorite,
}: MainDogProps) => {
  return (
    <section className="main-dog">
      <figure className="main-dog__figure">
        <div className="main-dog__image-wrapper">
          <img
            className="main-dog__image"
            src={dog.imageUrl}
            alt={`${dog.breed} dog`}
          />
        </div>

        <figcaption className="main-dog__caption">
          <div>
            <span className="main-dog__label">
              Selected breed
            </span>

            <h2 className="main-dog__breed">
              {dog.breed}
            </h2>
          </div>

          <button
            className="button button--primary"
            type="button"
            onClick={() => onAddFavorite(dog)}
            disabled={isFavorite}
            aria-label={
              isFavorite
                ? `${dog.breed} is in favorites`
                : `Add ${dog.breed} to favorites`
            }
          >
            {isFavorite
              ? 'Added to favorites'
              : 'Add to favorites'}
          </button>
        </figcaption>
      </figure>
    </section>
  );
};
