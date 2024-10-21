import React, { useState } from "react";
import './HomePage.scss';
import SolverControls from "../../components/SolverControls/SolverControls";
import BigBox from "../../components/BigBox/BigBox";
import SmallBox from "../../components/SmallBox/SmallBox";

const HomePage = () => {
    const [bigBoxFirstState, setBigBoxFirstState] = useState([]);
    const [bigBoxGoalState, setBigBoxGoalState] = useState([]);
    const [isSelectFirstState, setIsSelectFirstState] = useState(false);
    const [isSelectGoalState, setIsSelectGoalState] = useState(false);
    const [smallNumberBoxsFirstState, setSmallNumberBoxsFirstState] = useState([1, 2, 3, 4, 5, 6, 7, 8, '']);
    const [smallNumberBoxsGoalState, setSmallNumberBoxsGoalState] = useState([1, 2, 3, 4, 5, 6, 7, 8, '']);
    const [selectedBigBox, setSelectedBigBox] = useState(null);


    const handleFirstStateClick= (bigBox) => {
        setIsSelectFirstState(true);
        setIsSelectGoalState(false);
    };

    const handleGoalStateClick= (bigBox) => {
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

    const isNumberUsedFirstState = (number) => {
        return bigBoxFirstState.includes(number);
    };

    const isNumberUsedGoalState = (number) => {
        return bigBoxGoalState.includes(number);
    };

    return (
        <div className="home-container">
            <div className="solve-controls-box">
                <SolverControls />
            </div>
            <div>
                <div className="big-box-container">
                    <div className={`first-state-box big-box ${isSelectFirstState ? 'selected' : ''}`}>
                        <span className="big-box-name">First State</span>
                        <div className="reset-icon reset-first-state"></div>
                        <BigBox className="first-state-big-box" numbers={bigBoxFirstState} onClick={handleFirstStateClick} />
                    </div>
                    <span className="arrow-first-state-to-goal-state">
                        →
                    </span>
                    <div className={`goal-state-box big-box ${isSelectGoalState ? 'selected' : ''}`}>
                        <span className="big-box-name">Goal State</span>
                        <BigBox className="goal-state-big-box" numbers={bigBoxGoalState} onClick={handleGoalStateClick} />
                    </div>
                </div>
                <div className="small-box-list-container">
                    {isSelectFirstState && smallNumberBoxsFirstState.map((smallBox, index) => (
                        <SmallBox
                            className={`small-box-first-state-list ${smallBox === '' ? 'none': smallBox}`}
                            number={smallBox}
                            isUsed={isNumberUsedFirstState(smallBox)}
                            onNumberClick={handleNumberClick}
                        />
                    ))}
                    {isSelectGoalState && smallNumberBoxsGoalState.map((smallBox, index) => (
                        <SmallBox
                            className={`small-box-goal-state-list ${smallBox === '' ? 'none': smallBox}`}
                            number={smallBox}
                            isUsed={isNumberUsedFirstState(smallBox)}
                            onNumberClick={handleNumberClick}
                        />
                    ))}
                </div>
            </div>
        </div >
    );
};

export default HomePage;