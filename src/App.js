// // FileName: App.js 
// import { useRef, useState } from "react"; 
// import Player from "./components/PlayerSong"; 
// import Song from "./components/Song"; 
// import "./styles/app.scss"; 
  
// // Importing DATA 
// import data from "./data"; 
// import Library from "./components/Library"; 
// import Nav from "./components/Navb"; 
// function App() { 
//   const [songs, setSongs] = useState(data()); 
//   const [currentSong, setCurrentSong] = useState(songs[0]); 
//   const [isPlaying, setIsPlaying] = useState(false); 
//   const [libraryStatus, setLibraryStatus] = useState(false); 
//   const audioRef = useRef(null); 
//   const [songInfo, setSongInfo] = useState({ 
//     currentTime: 0, 
//     duration: 0, 
//     animationPercentage: 0, 
//   }); 
//   const timeUpdateHandler = (e) => { 
//     const current = e.target.currentTime; 
//     const duration = e.target.duration; 
//     //calculating percentage 
//     const roundedCurrent = Math.round(current); 
//     const roundedDuration = Math.round(duration); 
//     const animation = Math.round((roundedCurrent / roundedDuration) * 100); 
//     console.log(); 
//     setSongInfo({ 
//       currentTime: current, 
//       duration, 
//       animationPercentage: animation, 
//     }); 
//   }; 
//   const songEndHandler = async () => { 
//     let currentIndex = songs.findIndex((song) => song.id === currentSong.id); 
  
//     await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
  
//     if (isPlaying) audioRef.current.play(); 
//   }; 
//   return ( 
//     <div> 
//       <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} /> 
//       <Song currentSong={currentSong} /> 
//       <Player 
//         id={songs.id} 
//         songs={songs} 
//         songInfo={songInfo} 
//         setSongInfo={setSongInfo} 
//         audioRef={audioRef} 
//         isPlaying={isPlaying} 
//         setIsPlaying={setIsPlaying} 
//         currentSong={currentSong} 
//         setCurrentSong={setCurrentSong} 
//         setSongs={setSongs} 
//       /> 
//       <Library 
//         libraryStatus={libraryStatus} 
//         setLibraryStatus={setLibraryStatus} 
//         setSongs={setSongs} 
//         isPlaying={isPlaying} 
//         audioRef={audioRef} 
//         songs={songs} 
//         setCurrentSong={setCurrentSong} 
//       /> 
//       <audio 
//         onLoadedMetadata={timeUpdateHandler} 
//         onTimeUpdate={timeUpdateHandler} 
//         src={currentSong.audio} 
//         ref={audioRef} 
//         onEnded={songEndHandler} 
//       ></audio> 
//     </div> 
//   ); 
// } 
  
// export default App; 

// App.js
import React, { Component, createRef } from "react";
import Player from "./components/PlayerSong";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Navb";
import data from "./data";
import "./styles/app.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: data(),
      currentSong: data()[0],
      isPlaying: false,
      libraryStatus: false,
      songInfo: {
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
      },
    };
    this.audioRef = createRef();
  }

  timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    this.setState({
      songInfo: {
        currentTime: current,
        duration: duration,
        animationPercentage: animation,
      },
    });
  };

  songEndHandler = async () => {
    const { songs, currentSong, isPlaying } = this.state;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await this.setState({
      currentSong: songs[(currentIndex + 1) % songs.length],
    });

    if (isPlaying) this.audioRef.current.play();
  };

  setLibraryStatus = (status) => {
    this.setState({ libraryStatus: status });
  };

  setCurrentSong = (song) => {
    this.setState({ currentSong: song });
  };

  setSongs = (songs) => {
    this.setState({ songs });
  };

  setIsPlaying = (isPlaying) => {
    this.setState({ isPlaying });
  };

  render() {
    const { songs, currentSong, isPlaying, libraryStatus, songInfo } = this.state;

    return (
      <div>
        <Nav
          libraryStatus={libraryStatus}
          setLibraryStatus={this.setLibraryStatus}
        />
        <Song currentSong={currentSong} />
        <Player
          id={songs.id}
          songs={songs}
          songInfo={songInfo}
          setSongInfo={(info) => this.setState({ songInfo: info })}
          audioRef={this.audioRef}
          isPlaying={isPlaying}
          setIsPlaying={this.setIsPlaying}
          currentSong={currentSong}
          setCurrentSong={this.setCurrentSong}
          setSongs={this.setSongs}
        />
        <Library
          libraryStatus={libraryStatus}
          setLibraryStatus={this.setLibraryStatus}
          setSongs={this.setSongs}
          isPlaying={isPlaying}
          audioRef={this.audioRef}
          songs={songs}
          setCurrentSong={this.setCurrentSong}
        />
        <audio
          onLoadedMetadata={this.timeUpdateHandler}
          onTimeUpdate={this.timeUpdateHandler}
          src={currentSong.audio}
          ref={this.audioRef}
          onEnded={this.songEndHandler}
        ></audio>
      </div>
    );
  }
}

export default App;
