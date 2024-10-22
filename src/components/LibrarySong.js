// // FileName: LibrarySong.js 
  
// import React from "react"; 
// const LibrarySong = ({ 
//     song, 
//     songs, 
//     setCurrentSong, 
//     audioRef, 
//     isPlaying, 
//     setSongs, 
//     id, 
// }) => { 
//     const songSelectHandler = async () => { 
//         await setCurrentSong(song); 
//         //active 
//         const newSongs = songs.map((song) => { 
//             if (song.id === id) { 
//                 return { 
//                     ...song, 
//                     active: true, 
//                 }; 
//             } else { 
//                 return { 
//                     ...song, 
//                     active: false, 
//                 }; 
//             } 
//         }); 
//         setSongs(newSongs); 
//         //check if song is playing 
//         if (isPlaying) audioRef.current.play(); 
//     }; 
//     return ( 
//         <div 
//             onClick={songSelectHandler} 
//             className={`library-song ${song.active ? "selected" : ""}`} 
//         > 
//             <img src={song.cover} alt={song.name} /> 
//             <div className="song-description"> 
//                 <h3>{song.name}</h3> 
//                 <h4>{song.artist}</h4> 
//             </div> 
//         </div> 
//     ); 
// }; 
  
// export default LibrarySong; 
import React, { Component } from "react";

class LibrarySong extends Component {
    constructor(props) {
        super(props);
        this.songSelectHandler = this.songSelectHandler.bind(this);
    }

    async songSelectHandler() {
        const { song, setCurrentSong, songs, id, setSongs, audioRef, isPlaying } = this.props;

        await setCurrentSong(song);

        const newSongs = songs.map((s) => {
            if (s.id === id) {
                return { ...s, active: true };
            } else {
                return { ...s, active: false };
            }
        });
        setSongs(newSongs);

        if (isPlaying) audioRef.current.play();
    }

    render() {
        const { song } = this.props;

        return (
            <div onClick={this.songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
                <img src={song.cover} alt={song.name} />
                <div className="song-description">
                    <h3>{song.name}</h3>
                    <h4>{song.artist}</h4>
                </div>
            </div>
        );
    }
}

export default LibrarySong;
