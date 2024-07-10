
# Music Player App

This project is a music player application built with React. It features a sleek user interface that allows users to play, pause, and skip tracks. The application also includes a library of songs that can be accessed and played, with the current song's details displayed prominently.

## Features

- **Play/Pause Functionality**: Users can play and pause the current track.
- **Skip Tracks**: Users can skip to the next or previous track in the playlist.
- **Song Progress Bar**: A progress bar shows the current time of the track and allows users to seek to different parts of the track.
- **Song Library**: A list of all available songs that users can select from.
- **Dynamic UI**: The UI updates to reflect the current song's details, including the cover image, name, and artist.
- **Responsive Design**: The application is styled to be responsive and works well on various screen sizes.

## Components

### `App.js`

This is the main component that brings together all other components and manages the state of the application.

### `PlayerSong.js`

This component handles the controls for playing, pausing, and skipping tracks, as well as displaying the current time and duration of the track.

### `Song.js`

This component displays the current song's details, including the cover image, name, and artist.

### `Navb.js`

This component renders the navigation bar with a button to toggle the visibility of the song library.

### `LibrarySong.js`

This component represents an individual song in the library. It handles the selection of a song to be played.

### `Library.js`

This component renders the list of all songs available in the library.

### `data.js`

This file contains the data for the songs used in the application. Each song includes details such as name, artist, cover image, audio source, color, and an id.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GuhaPranav09/music-player-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd music-player-app
   ```
3. Install specific dependencies
```bash
   npm install --save @fortawesome/react-fontawesome
   npm install --save @fortawesome/free-solid-svg-icons
   npm install sass
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Usage

- Use the play/pause button to control the playback of the current track.
- Use the skip buttons to move to the next or previous track.
- Drag the progress bar to seek to a different part of the track.
- Click on a song in the library to select and play it.
- Toggle the library visibility using the "Library" button in the navigation bar.

## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **@fortawesome/react-fontawesome**: Font Awesome icons for React.
- **uuid**: Library to generate unique IDs.

## License

This project is licensed under the MIT License.

---

Enjoy using the Music Player App!

