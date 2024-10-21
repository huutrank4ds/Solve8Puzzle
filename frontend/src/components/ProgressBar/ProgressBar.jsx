import React from "react";
import './ProgressBar.scss';
import { useState } from 'react';

const ProgressBar = ({ totalSteps, onStepChange }) => {
    const [currentStep, setCurrentStep] = useState(0);
  
    // Hàm xử lý khi người dùng nhấp vào thanh
    const handleClick = (event) => {
      const bar = event.target.getBoundingClientRect();
      const clickPosition = event.clientX - bar.left;
      const stepWidth = bar.width / totalSteps;
      const newStep = Math.floor(clickPosition / stepWidth);
      
      setCurrentStep(newStep);
      onStepChange(newStep); // Gọi hàm để thay đổi bước ngoài component cha
    };
  
    return (
      <div className="progress-bar-container">
        <div className="progress-bar" onClick={handleClick}>
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`progress-segment ${index === currentStep ? 'active' : ''}`}
            >
              {index === currentStep && (
                <div className="progress-indicator"></div> // Ô tròn xanh
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;