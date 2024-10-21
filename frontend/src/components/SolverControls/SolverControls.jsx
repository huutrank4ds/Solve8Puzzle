import React, { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./SolverControls.scss";
import AlgorithmDropdown from "../AlgorithmDropdown/AlgorithmDropdown";
import Button from "../Button/Button";
import { AlgorithmProvider } from "./AlgorithmContext";
import Tooltip from "../Tooltip/Tooltip";



const SolverControls = ({ stateBigBox }) => {
    const [isAlgorithm, setIsAlgorithm] = useState(false);
    const [positionMouse, setPositionMouse] = useState({ x: 0, y: 0 });
    const [showTooltipStep, setShowTooltipStep] = useState(false);
    const [showTooltipSolve, setShowTooltipSolve] = useState(false);
    const [hoverButton, setHoverButton] = useState('');
    const [algorithmSelected, setAlgorithmSelected] = useState('');
    const navigate = useNavigate();

    const handleNavigateToShowstep = () => {
        navigate(`/showstep?algorithm=${algorithmSelected}`);
    };

    const handleNavigateToSolve = () => {
        navigate('/solve');
    };

    const handleAlgorithmSelect = (value) => {
        setIsAlgorithm(value !== '');
        setAlgorithmSelected(value);
    };

    const handleMouseMove = (event) => {
        const hoverBox = event.currentTarget.getBoundingClientRect();
        setPositionMouse({
            x: event.clientX - hoverBox.left - 50,
            y: event.clientY - hoverBox.top + 10
        });
    };

    const handleMouseEnter = (button) => {
        if (button == 'showstep') {
            setShowTooltipStep(true);
        }
        else if (button == 'solve') {
            setShowTooltipSolve(true);
        }
    };

    const handleMouseLeave = (button) => {
        if (button == 'showstep') {
            setShowTooltipStep(false);
        }
        else if (button == 'solve') {
            setShowTooltipSolve(false);
        }
    };

    return (
        <div className='solver-controls'>
            <AlgorithmProvider>
                <AlgorithmDropdown
                    placeholder="Select an algorithm"
                    className="alrogithm-dropdown"
                    onSelect={handleAlgorithmSelect}
                />
            </AlgorithmProvider>
            <div
                class='button-tooltip-container showstep-button-container'
                onMouseMove={handleMouseMove}
                onMouseEnter={() => handleMouseEnter('showstep')}
                onMouseLeave={() => handleMouseLeave('showstep')}
            >
                <Button className='showstep-button' onClick={handleNavigateToShowstep} disabled={!isAlgorithm}>Show step</Button>
                {showTooltipStep && !stateBigBox && (
                    <Tooltip className='tooltip' text='Show step'
                        style={{
                            left: `${positionMouse.x}px`,
                            top: `${positionMouse.y}px`,
                        }}>Please set first and goal state</Tooltip>
                )}
                {showTooltipStep && stateBigBox && !isAlgorithm && (
                    <Tooltip className='showstep-tooltip' text='Show step'
                        style={{
                            left: `${positionMouse.x}px`,
                            top: `${positionMouse.y}px`,
                        }}>Please choose an algorithm</Tooltip>
                )}
            </div>
            <div
                class='button-tooltip-container showstep-button-container'
                onMouseMove={handleMouseMove}
                onMouseEnter={() => handleMouseEnter('solve')}
                onMouseLeave={() => handleMouseLeave('solve')}
            >
                <Button className='solve-button' onClick={handleNavigateToSolve} disabled={!stateBigBox}>Solve</Button>
                {showTooltipSolve && !stateBigBox && (
                    <Tooltip className='solve-tooltip' text='Show step'
                        style={{
                            left: `${positionMouse.x}px`,
                            top: `${positionMouse.y}px`,
                        }}>Please set first and goal state</Tooltip>
                )}
            </div>
        </div>
    )
}

export default SolverControls;