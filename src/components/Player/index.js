import React, { useState, useRef, useEffect } from 'react';
import './player.css'



function usePlayerState($videoPlayer){
    const [playerState, setPlayerState] = useState({
        playing: false,
        percentage: 0,
    });

      useEffect(()=>{
        playerState.playing ? $videoPlayer.current.play() : $videoPlayer.current.pause()
    
    
        
    
    },[$videoPlayer, playerState.playing]);

    function toogleVideoPlay(){
        setPlayerState({
            ...playerState,
            playing: !playerState.playing,
        })
    }


    function handlePercentageBar(){
        const currentPercentage = ($videoPlayer.current.currentTime / $videoPlayer.current.duration) * 100;
        setPlayerState({
            ...playerState,
            percentage: currentPercentage
        })
    }

    function handleChangeVideoPercentage(e){
        const currentPercentageValue = e.target.value;
        $videoPlayer.current.currentTime = ($videoPlayer.current.duration / 100) * currentPercentageValue;
        setPlayerState({
            ...playerState,
            percentage: currentPercentageValue
        })
    }


 

    return{
        playerState,
        toogleVideoPlay,
        handlePercentageBar,
        handleChangeVideoPercentage
    } 

}

const videoURL = 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4';

export default function Player(){
    const $videoPlayer = useRef(null);
    const { playerState, 
        toogleVideoPlay, 
        handlePercentageBar ,
        handleChangeVideoPercentage,
    } = usePlayerState($videoPlayer);


    return (
        <div class="video">
            <video
            ref={$videoPlayer}
            src={videoURL}
            poster="https://img.youtube.com/vi/Fn6W_qHNOFw/maxresdefault.jpg"
            onTimeUpdate={handlePercentageBar}
            
            />
            <div class="controller">
                <button onClick={toogleVideoPlay}>
                    {playerState.playing ? "Pause" : "Play"}
                </button>
                <input
                type='range'
                min='0'
                max='100'
                onChange={handleChangeVideoPercentage}
                value={playerState.percentage}
                />
                <select>
                    {[1,2,3].map(speed => (
                        <option
                        key={`speedChange_${speed}`}
                        >
                            {speed}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}