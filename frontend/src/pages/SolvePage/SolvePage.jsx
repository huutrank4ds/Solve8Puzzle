import React from "react";
import { useSearchParams } from "react-router-dom"; 
import './SolvePage.scss';
import PausePlayButton from '../../components/PausePlayButton/PausePlayButton';
import ProgressBar from "../../components/ProgressBar/ProgressBar";

const SolvePage = () => {
    const [searchParams] = useSearchParams();
    const algorithm = searchParams.get('algorithm');

    return (
        <div>
            <div className="header-solve-page">
                <ProgressBar totalSteps={10} onStepChange={(step) => console.log(step)} />
                <PausePlayButton className="pause-play-button"/>
            </div>

        </div>
    );
};

export default SolvePage;