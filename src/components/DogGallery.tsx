import type { Dog } from '../types/dog';
import { DogThumbnail } from './DogThumbnail';

type DogGalleryProps = {
  dogs: Dog[];
  selectedDog: Dog | null;
  onSelect: (dog: Dog) => void;
};

export const DogGallery = ({
  dogs,
  selectedDog,
  onSelect,
}: DogGalleryProps) => {
  return (
    <section
      className="dog-gallery"
      aria-labelledby="dog-gallery-title"
    >
      <h2
        id="dog-gallery-title"
        className="dog-gallery__title"
      >
        Discover dogs
      </h2>

      <div className="dog-gallery__grid">
        {dogs.map((dog, index) => (
          <DogThumbnail
            key={`${dog.imageUrl}-${index}`}
            dog={dog}
            isSelected={
              selectedDog?.imageUrl === dog.imageUrl
            }
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
};
