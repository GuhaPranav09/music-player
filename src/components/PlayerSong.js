// // FileName: PlayerSong.js 
  
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
// import { 
//     faPlay, 
//     faAngleLeft, 
//     faAngleRight, 
//     faPause, 
// } from "@fortawesome/free-solid-svg-icons"; 
  
// const Player = ({ 
//     currentSong, 
//     isPlaying, 
//     setIsPlaying, 
//     audioRef, 
//     setSongInfo, 
//     songInfo, 
//     songs, 
//     setCurrentSong, 
//     id, 
//     setSongs, 
// }) => { 
//     //useEffect 
//     const activeLibraryHandler = (nextPrev) => { 
//         const newSongs = songs.map((song) => { 
//             if (song.id === nextPrev.id) { 
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
//         console.log("Hey from useEffect form player JS"); 
//     }; 
//     //Event Handlers 
//     const dragHandler = (e) => { 
//         audioRef.current.currentTime = e.target.value; 
//         setSongInfo({ ...songInfo, currentTime: e.target.value }); 
//     }; 
//     const playSongHandler = () => { 
//         if (isPlaying) { 
//             audioRef.current.pause(); 
//             setIsPlaying(!isPlaying); 
//         } else { 
//             audioRef.current.play(); 
//             setIsPlaying(!isPlaying); 
//         } 
//     }; 
  
//     const getTime = (time) => 
//         Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2); 
//     const skipTrackHandler = async (direction) => { 
//         let currentIndex = songs.findIndex( 
//             (song) => song.id === currentSong.id 
//         ); 
//         if (direction === "skip-forward") { 
//             await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
//             activeLibraryHandler(songs[(currentIndex + 1) % songs.length]); 
//         } 
//         if (direction === "skip-back") { 
//             if ((currentIndex - 1) % songs.length === -1) { 
//                 await setCurrentSong(songs[songs.length - 1]); 
//                 // playAudio(isPlaying, audioRef); 
//                 activeLibraryHandler(songs[songs.length - 1]); 
  
//                 return; 
//             } 
//             await setCurrentSong(songs[(currentIndex - 1) % songs.length]); 
//             activeLibraryHandler(songs[(currentIndex - 1) % songs.length]); 
//         } 
//         if (isPlaying) audioRef.current.play(); 
//     }; 
//     //adding the styles 
//     const trackAnim = { 
//         transform: `translateX(${songInfo.animationPercentage}%)`, 
//     }; 
//     return ( 
//         <div className="player"> 
//             <div className="time-control"> 
//                 <p>{getTime(songInfo.currentTime)}</p> 
//                 <div 
//                     style={{ 
//                         background:  
// `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`, 
//                     }} 
//                     className="track"
//                 > 
//                     <input 
//                         min={0} 
//                         max={songInfo.duration || 0} 
//                         value={songInfo.currentTime} 
//                         onChange={dragHandler} 
//                         type="range"
//                     /> 
//                     <div style={trackAnim} className="animate-track"></div> 
//                 </div> 
//                 <p> 
//                     {songInfo.duration ? getTime(songInfo.duration) : "00:00"} 
//                 </p> 
//             </div> 
//             <div className="play-control"> 
//                 <FontAwesomeIcon 
//                     onClick={() => skipTrackHandler("skip-back")} 
//                     size="2x"
//                     className="skip-back"
//                     icon={faAngleLeft} 
//                 /> 
//                 {!isPlaying ? ( 
//                     <FontAwesomeIcon 
//                         onClick={playSongHandler} 
//                         size="2x"
//                         className="play"
//                         icon={faPlay} 
//                     /> 
//                 ) : ( 
//                     <FontAwesomeIcon 
//                         onClick={playSongHandler} 
//                         size="2x"
//                         className="pause"
//                         icon={faPause} 
//                     /> 
//                 )} 
  
//                 <FontAwesomeIcon 
//                     onClick={() => skipTrackHandler("skip-forward")} 
//                     size="2x"
//                     className="skip-forward"
//                     icon={faAngleRight} 
//                 /> 
//             </div> 
//         </div> 
//     ); 
// }; 
  
// export default Player; 
// FileName: PlayerSong.js

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

class Player extends Component {
    constructor(props) {
        super(props);
        this.playSongHandler = this.playSongHandler.bind(this);
        this.skipTrackHandler = this.skipTrackHandler.bind(this);
        this.dragHandler = this.dragHandler.bind(this);
    }

    playSongHandler() {
        const { isPlaying, audioRef, setIsPlaying } = this.props;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }

    dragHandler(e) {
        const { audioRef, setSongInfo, songInfo } = this.props;
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

    async skipTrackHandler(direction) {
        const { currentSong, songs, setCurrentSong, isPlaying, audioRef, setSongs } = this.props;
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        
        if (direction === "skip-forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        } else if (direction === "skip-back") {
            if (currentIndex === 0) {
                await setCurrentSong(songs[songs.length - 1]);
            } else {
                await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            }
        }
        
        // Update active song in library
        const newSongs = songs.map((song) => ({
            ...song,
            active: song.id === currentSong.id
        }));
        setSongs(newSongs);

        if (isPlaying) audioRef.current.play();
    }

    getTime(time) {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }

    render() {
        const { currentSong, songInfo } = this.props;
        const trackAnim = {
            transform: `translateX(${songInfo.animationPercentage}%)`,
        };

        return (
            <div className="player">
                <div className="time-control">
                    <p>{this.getTime(songInfo.currentTime)}</p>
                    <div
                        style={{
                            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                        }}
                        className="track"
                    >
                        <input
                            min={0}
                            max={songInfo.duration || 0}
                            value={songInfo.currentTime}
                            onChange={this.dragHandler}
                            type="range"
                        />
                        <div style={trackAnim} className="animate-track"></div>
                    </div>
                    <p>{songInfo.duration ? this.getTime(songInfo.duration) : "00:00"}</p>
                </div>
                <div className="play-control">
                    <FontAwesomeIcon
                        onClick={() => this.skipTrackHandler("skip-back")}
                        size="2x"
                        className="skip-back"
                        icon={faAngleLeft}
                    />
                    {!this.props.isPlaying ? (
                        <FontAwesomeIcon
                            onClick={this.playSongHandler}
                            size="2x"
                            className="play"
                            icon={faPlay}
                        />
                    ) : (
                        <FontAwesomeIcon
                            onClick={this.playSongHandler}
                            size="2x"
                            className="pause"
                            icon={faPause}
                        />
                    )}
                    <FontAwesomeIcon
                        onClick={() => this.skipTrackHandler("skip-forward")}
                        size="2x"
                        className="skip-forward"
                        icon={faAngleRight}
                    />
                </div>
            </div>
        );
    }
}

export default Player;
