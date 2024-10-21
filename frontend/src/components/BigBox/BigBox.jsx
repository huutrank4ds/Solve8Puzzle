import React from "react";
import './BigBox.scss';

const BigBox = ({numbers, onClick}) => {
    return (
        <div 
            className={`big-box-element ${numbers.length == 9 ? 'done' : ''}`}
            onClick={() => onClick(numbers)}
        >
            {numbers.map((num, index) => (
                <div
                    index={index}
                    className={`big-box-number ${num === '' ? 'none' : num}`}
                >
                    {num}
                </div>
            ))}
        </div>
    );
};

export default BigBox;