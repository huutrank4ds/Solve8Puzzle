import React from "react";
import './PausePlayButton.scss';
import { useState } from 'react';
import PauseIcon from '../../assets/icons/pause-icon.png';
import PlayIcon from '../../assets/icons/play-icon.png';

const PausePlayButton = ({isReload, onReload, onClick}) => {
    const [isActive, setIsAcitve] = useState(true);
    const handleOnClick = () => {
        setIsAcitve(!isActive);
        onClick(isActive);
    };

    return (
        <button
            className="pause-play-button"
            onClick={isReload ? onReload : handleOnClick}
        >
            <img
                className="image-pause-play-button"
                src={ (isActive && !isReload) ? PauseIcon : PlayIcon }
                alt="pause-icon" 
            />
        </button>
    );
};

export default PausePlayButton;