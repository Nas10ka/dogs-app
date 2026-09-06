import { useEffect, useState } from 'react';

import { getRandomDogs } from './api/dogs';
import { DogGallery } from './components/DogGallery';
import { FavoritesList } from './components/FavoritesList';
import { MainDog } from './components/MainDog';

import type { Dog } from './types/dog';

import './styles/App.scss';

const GALLERY_SIZE = 10;

function App() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDogs = async () => {
      try {
        const [mainDog, ...galleryDogs] = await getRandomDogs(
          GALLERY_SIZE + 1,
        );

        if (!mainDog) {
          throw new Error('No dogs returned');
        }

        setSelectedDog(mainDog);
        setDogs(galleryDogs);
      } catch {
        setError('Could not load dogs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadDogs();
  }, []);

  const addFavorite = (dog: Dog) => {
    setFavorites((current) => {
      const alreadyAdded = current.some(
        (favorite) => favorite.imageUrl === dog.imageUrl,
      );

      return alreadyAdded ? current : [...current, dog];
    });
  };

  const removeFavorite = (dog: Dog) => {
    setFavorites((current) =>
      current.filter(
        (favorite) => favorite.imageUrl !== dog.imageUrl,
      ),
    );
  };

  if (isLoading) {
    return <p className="status-message">Loading dogs...</p>;
  }

  if (error || !selectedDog) {
    return (
      <p className="status-message status-message--error">
        {error || 'Could not load dogs.'}
      </p>
    );
  }

  const isFavorite = favorites.some(
    (dog) => dog.imageUrl === selectedDog.imageUrl,
  );

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Dog Viewer</h1>
      </header>

      <main className="app__layout">
        <div className="app__content">
          <MainDog
            dog={selectedDog}
            isFavorite={isFavorite}
            onAddFavorite={addFavorite}
          />

          <DogGallery
            dogs={dogs}
            selectedDog={selectedDog}
            onSelect={setSelectedDog}
          />
        </div>

        <FavoritesList
          favorites={favorites}
          onSelect={setSelectedDog}
          onRemove={removeFavorite}
        />
      </main>
    </div>
  );
}

export default App;
