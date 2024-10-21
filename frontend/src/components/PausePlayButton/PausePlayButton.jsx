import React from "react";
import './PausePlayButton.scss';
import { useState } from 'react';
import PauseIcon from '../../assets/icons/pause-icon.png';
import PlayIcon from '../../assets/icons/play-icon.png';

const PausePlayButton = () => {
    const [isActive, setIsAcitve] = useState(true);
    const handleOnClick = () => {
        setIsAcitve(!isActive);
    };

    return (
        <button
            className="pause-play-button"
            onClick={handleOnClick}
        >
            <img
                className="image-pause-play-button"
                src={ isActive ? PauseIcon : PlayIcon }
                alt="pause-icon" 
            />
        </button>
    );
};

export default PausePlayButton;