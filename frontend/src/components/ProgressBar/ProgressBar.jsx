import React from "react";
import './ProgressBar.scss';
import { useState } from 'react';

const ProgressBar = ({ totalSteps, indexStep, setIndexStep }) => {
  
    return (
      <div className="progress-bar-container">
        <div className="progress-bar">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`progress-segment ${index === indexStep ? 'active' : ''}`}
              onClick={() => setIndexStep(index)}
            >
              {index === indexStep && (
                <div className="progress-indicator"></div> // Ô tròn xanh
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProgressBar;