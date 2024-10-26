import React, { useState, useEffect, useRef } from "react";
import './SolvePage.scss';
import PausePlayButton from '../../components/PausePlayButton/PausePlayButton';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import BigBox from "../../components/BigBox/BigBox";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/localStorage";
import { useLocation } from 'react-router-dom';

const SolvePage = () => {
    const [bigBoxState, setBigBoxState] = useState(() => getFromLocalStorage('bigBoxFirstState', []));
    const [timeDelay, setTimeDelay] = useState(1200);
    const [isRun, setIsRun] = useState(true);
    const [step, setStep] = useState(0);
    const location = useLocation(); // Lấy location từ react-router-dom
    const solution = location.state?.solution || {};
    const timeoutRef = useRef(null);
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        let i = step;
        const executeStep = () => {
            if (i >= solution.length) {
                setIsReload(true);
                return; // Dừng khi hoàn thành hoặc khi `isRun` là false
            }
            setBigBoxState(solution[i]);
            setStep(i);
            i++;
            // Đặt timeout cho bước tiếp theo
            timeoutRef.current = setTimeout(executeStep, timeDelay);
        }
        // Bắt đầu thực hiện các bước nếu `isRun` là true
        if (isRun) {
            executeStep();
        }
        // Dọn dẹp timeout khi `isRun` thay đổi hoặc component unmount
        return () => clearTimeout(timeoutRef.current);
    }, [isRun, timeDelay, step, isReload]);

    const handleReload = () => {
        setIsReload(false);
        setStep(0);
        setBigBoxState(getFromLocalStorage('bigBoxFirstState', []));
    }

    const handlePausePlay = () => {
        setIsRun(!isRun);
    }

    const handleSmallNumberClick = () => {
        return;
    }

    const handleBigBoxClick = () => {
        return;
    }

    return (
        <div className="solve-page">
            <div className="header-solve-page">
                <ProgressBar className="progress-bar" totalSteps={solution.length} indexStep={step} setIndexStep={setStep} />
                <div className="number-step">{solution.length}</div>
                <PausePlayButton className="pause-play-button" isReload={isReload} onReload={handleReload} onClick={handlePausePlay}/>
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