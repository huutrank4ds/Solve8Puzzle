import React, { useState, useEffect } from "react";
import './SolvePage.scss';
import PausePlayButton from '../../components/PausePlayButton/PausePlayButton';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import BigBox from "../../components/BigBox/BigBox";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/localStorage";
import { useLocation } from 'react-router-dom';

const SolvePage = () => {
    const [bigBoxState, setBigBoxState] = useState(() => getFromLocalStorage('bigBoxFirstState', []));
    const [timeDelay, setTimeDelay] = useState(1500);
    const [intervalId, setIntervalId] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [steps, setSteps] = useState([]);
    const location = useLocation(); // Lấy location từ react-router-dom
    const solution = location.state?.solution || {};

    useEffect(() => {
        if (solution.length) {
            setSteps(solution);
            executeSteps(solution);
        }
    }
    , [solution]);

    const executeSteps = (steps) => {
        let i = 0;

        const interval = setInterval(() => {
            if (i >= steps.length) {
                clearInterval(interval);
                return;
            }

            setBigBoxState(steps[i]);
            i++;
        }, timeDelay);
    };

    const handleSmallNumberClick = () => {
        return;
    }

    const handleBigBoxClick = () => {
        return;
    }

    return (
        <div className="solve-page">
            <div className="header-solve-page">
                <ProgressBar totalSteps={solution.length} onStepChange={(step) => console.log(step)} />
                <PausePlayButton className="pause-play-button" />
            </div>
            <div className="big-box-solve-container">
                <BigBox
                    className="big-box-solve"
                    numbers={bigBoxState}
                    onClick={handleBigBoxClick}
                    onRemoveNumberClick={handleSmallNumberClick}
                    bigBoxStyle={{ width: '70vh', height: '70vh' }}
                    smallBoxStyle={{ width: '20vh', height: '20vh', fontSize: '10vh' }}
                />
            </div>
        </div>
    );
};

export default SolvePage;