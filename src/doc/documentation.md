## Features

- Displays a random dog as the main image
- Displays 10 random dog thumbnails
- Shows the breed associated with each image
- Selecting a thumbnail updates the main image
- Thumbnail hover animation
- Add the selected dog to favorites
- Remove dogs from favorites
- Select dogs directly from favorites
- Loading and error states
- Responsive layout
- Keyboard-accessible interactive elements

## Architecture

The project intentionally keeps the architecture small.
App owns the application state because the currently selected dog and favorites are shared between multiple components.
The Dog API integration is isolated in src/api/dogs.ts.
UI components work with the internal Dog model rather than the external API response structure.

## API strategy

The Dog API supports requesting multiple random images in a single request.

The application requests 11 dogs at startup:

1 main dog
10 thumbnails

This avoids making an individual network request for every image.

## Scalability considerations

The current requirement only needs 10 thumbnails, so pagination and infinite scrolling are intentionally not implemented.
If the gallery grew significantly, the next steps would be:
request dogs incrementally
add pagination or a "Load more" interaction
keep native lazy loading for images
introduce virtualization only for very large collections

The API function already accepts a configurable count, so the data layer does not depend on the current number of thumbnails.
