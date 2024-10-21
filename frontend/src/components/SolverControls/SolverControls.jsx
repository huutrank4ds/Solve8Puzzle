import React, { useState } from "react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./SolverControls.scss";
import AlgorithmDropdown from "../AlgorithmDropdown/AlgorithmDropdown";
import Button from "../Button/Button";
import { AlgorithmProvider } from "./AlgorithmContext";
import Tooltip from "../Tooltip/Tooltip";



const SolverControls = () => {
    const [isAlgorithm, setIsAlgorithm] = useState(false);
    const [positionMouse, setPositionMouse] = useState({ x: 0, y: 0 });
    const [showTooltipStep, setShowTooltipStep] = useState(false);
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

    const handleMouseEnterStep = () => {
        setShowTooltipStep(true);
    };

    const handleMouseLeaveStep = () => {
        setShowTooltipStep(false)
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
                onMouseEnter={handleMouseEnterStep}
                onMouseLeave={handleMouseLeaveStep}
            >
                <Button className='showstep-button' onClick={handleNavigateToShowstep} disabled={!isAlgorithm}>Show step</Button>
                {showTooltipStep && !isAlgorithm && (
                    <Tooltip className='showstep-tooltip' text='Show step'
                        style={{
                            left: `${positionMouse.x}px`,
                            top: `${positionMouse.y}px`,
                        }}>Please choose an algorithm</Tooltip>
                )}
            </div>
            <Button className='solve-button' onClick={handleNavigateToSolve}>Solve</Button>
        </div>
    )
}

export default SolverControls;