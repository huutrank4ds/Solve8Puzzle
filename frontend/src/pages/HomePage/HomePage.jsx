import React, { useState, useEffect } from "react";
import './HomePage.scss';
import SolverControls from "../../components/SolverControls/SolverControls";
import BigBox from "../../components/BigBox/BigBox";
import SmallBox from "../../components/SmallBox/SmallBox";
import ResetBigBox from "../../components/ResetBigBox/ResetBigBox";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/localStorage";

const defaultSmallNumberlist = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

const HomePage = () => {
    const [bigBoxFirstState, setBigBoxFirstState] = useState(() => getFromLocalStorage('bigBoxFirstState', []));
    const [bigBoxGoalState, setBigBoxGoalState] = useState(() => getFromLocalStorage('bigBoxGoalState', []));
    const [isSelectFirstState, setIsSelectFirstState] = useState(false);
    const [isSelectGoalState, setIsSelectGoalState] = useState(false);
    const [smallNumberBoxsFirstState, setSmallNumberBoxsFirstState] = useState(() => getFromLocalStorage('smallNumberBoxsFirstState', defaultSmallNumberlist));
    const [smallNumberBoxsGoalState, setSmallNumberBoxsGoalState] = useState(() => getFromLocalStorage('smallNumberBoxsGoalState', defaultSmallNumberlist));
    const [stateBigBox, setStateBigBox] = useState(false);
    const [solution, setSolution] = useState(null);

    useEffect(() => {
        saveToLocalStorage('bigBoxFirstState', bigBoxFirstState);
    }, [bigBoxFirstState]);

    useEffect(() => {
        saveToLocalStorage('bigBoxGoalState', bigBoxGoalState);
    }, [bigBoxGoalState]);

    useEffect(() => {
        saveToLocalStorage('smallNumberBoxsFirstState', smallNumberBoxsFirstState);
    }, [smallNumberBoxsFirstState]);

    useEffect(() => {
        saveToLocalStorage('smallNumberBoxsGoalState', smallNumberBoxsGoalState);
    }, [smallNumberBoxsGoalState]);

    useEffect(() => {
        const isFirstStateFull = defaultSmallNumberlist.every(num => bigBoxFirstState.includes(num));
        const isGoalStateFull = defaultSmallNumberlist.every(num => bigBoxGoalState.includes(num));
        
        if (isFirstStateFull && isGoalStateFull) {
            setStateBigBox(true);
        } else {
            setStateBigBox(false);
        }
    }, [bigBoxFirstState, bigBoxGoalState]);

    const handlRemoveNumberFromFirstState = (number) => {
        if (isSelectFirstState) {
            setBigBoxFirstState((prevState) => prevState.filter(item => item != number));
            setSmallNumberBoxsFirstState(prevState => {
                    const newState = [...prevState, number].sort((a, b) => a - b);  // Sắp xếp theo thứ tự tăng dần
                    return newState;
            });
        }
    };

    const handlRemoveNumberFromGoalState = (number) => {
        if (isSelectGoalState) {
            setBigBoxGoalState((prevState) => prevState.filter(item => item != number));
            setSmallNumberBoxsGoalState(prevState => {
                const newState = [...prevState, number].sort((a, b) => a - b);  // Sắp xếp theo thứ tự tăng dần
                return newState;
            });
        }
    };

    const handleResetFirstState = () => {
        setBigBoxFirstState([]);
        setSmallNumberBoxsFirstState(defaultSmallNumberlist);
        handleFirstStateClick();
    };

    const handleResetGoalState = () => {
        setBigBoxGoalState([]);
        setSmallNumberBoxsGoalState(defaultSmallNumberlist);
        handleGoalStateClick();
    };

    const handleFirstStateClick = () => {
        setIsSelectFirstState(true);
        setIsSelectGoalState(false);
    };

    const handleGoalStateClick = () => {
        setIsSelectFirstState(false);
        setIsSelectGoalState(true);
    };

    const handleNumberClick = (number) => {
        if (isSelectFirstState) {
            setBigBoxFirstState([...bigBoxFirstState, number]);
            setSmallNumberBoxsFirstState((prevState) => prevState.filter(item => item !== number));
        }
        else if (isSelectGoalState) {
            setBigBoxGoalState([...bigBoxGoalState, number]);
            setSmallNumberBoxsGoalState((prevState) => prevState.filter(item => item !== number));
        }
    };

    return (
        <div className="home-container">
            <div className="solve-controls-box">
                <SolverControls stateBigBox={stateBigBox} />
            </div>
            <div>
                <div className="big-box-container">
                    <div className={`first-state-box big-box ${isSelectFirstState ? 'selected' : ''}`}>
                        <div className="label-reload-big-box">
                            <div className="big-box-name-container">
                                <span className="big-box-name">First State</span>
                            </div>
                            <ResetBigBox className="reload-first-state" onClick={handleResetFirstState} />
                        </div>
                        <BigBox
                            className="first-state-big-box"
                            numbers={bigBoxFirstState}
                            onClick={handleFirstStateClick}
                            onRemoveNumberClick={handlRemoveNumberFromFirstState}
                        />
                    </div>
                    <span className="arrow-first-state-to-goal-state">
                        →
                    </span>
                    <div className={`goal-state-box big-box ${isSelectGoalState ? 'selected' : ''}`}>
                        <div className="label-reload-big-box">
                            <div className="big-box-name-container">
                                <span className="big-box-name">Goal State</span>
                            </div>
                            <ResetBigBox className="reload-goal-state" onClick={handleResetGoalState} />
                        </div>
                        <BigBox 
                            className="goal-state-big-box" 
                            numbers={bigBoxGoalState} 
                            onClick={handleGoalStateClick} 
                            onRemoveNumberClick={handlRemoveNumberFromGoalState}
                        />
                    </div>
                </div>
                <div className="small-box-list-container">
                    {isSelectFirstState && smallNumberBoxsFirstState.map((smallBox, index) => (
                        <SmallBox
                            key={index}
                            className={`small-box-first-state-list ${smallBox === '0' ? 'none' : smallBox}`}
                            number={smallBox}
                            onNumberClick={handleNumberClick}
                        />
                    ))}
                    {isSelectGoalState && smallNumberBoxsGoalState.map((smallBox, index) => (
                        <SmallBox
                            key={index}
                            className={`small-box-goal-state-list ${smallBox === '0' ? 'none' : smallBox}`}
                            number={smallBox}
                            onNumberClick={handleNumberClick}
                        />
                    ))}
                </div>
            </div>
        </div >
    );
};

export default HomePage;