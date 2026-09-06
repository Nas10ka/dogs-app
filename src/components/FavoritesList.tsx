import type { Dog } from '../types/dog';

type FavoritesListProps = {
  favorites: Dog[];
  onSelect: (dog: Dog) => void;
  onRemove: (dog: Dog) => void;
};

export const FavoritesList = ({
  favorites,
  onSelect,
  onRemove,
}: FavoritesListProps) => {
  return (
    <aside
      className="favorites"
      aria-labelledby="favorites-title"
    >
      <div className="favorites__header">
        <h2
          id="favorites-title"
          className="favorites__title"
        >
          Favorites
        </h2>

        <span
          className="favorites__count"
          aria-label={`${favorites.length} favorites`}
        >
          {favorites.length}
        </span>
      </div>

      {favorites.length === 0 ? (
        <p className="favorites__empty">
          Your favorite dogs will appear here.
        </p>
      ) : (
        <ul className="favorites__list">
          {favorites.map((dog) => (
            <li
              className="favorite-item"
              key={dog.imageUrl}
            >
              <button
                className="favorite-item__select"
                type="button"
                onClick={() => onSelect(dog)}
                aria-label={`Select ${dog.breed} from favorites`}
              >
                <img
                  className="favorite-item__image"
                  src={dog.imageUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />

                <span className="favorite-item__breed">
                  {dog.breed}
                </span>
              </button>

              <button
                className="favorite-item__remove"
                type="button"
                onClick={() => onRemove(dog)}
                aria-label={`Remove ${dog.breed} from favorites`}
                title="Remove from favorites"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};
