import React from "react";
import './BigBox.scss';
import SmallBox from "../SmallBox/SmallBox";

const BigBox = ({numbers, onClick, onRemoveNumberClick, bigBoxStyle, smallBoxStyle}) => {
    return (
        <div 
            className={`big-box-element ${numbers.length == 9 ? 'done' : ''}`}
            onClick={() => onClick(numbers)}
            style={bigBoxStyle ? bigBoxStyle : null}
        >
            {numbers.map((num, index) => (
                <div
                    index={index}
                    className={`big-box-number ${num === '0' ? 'none' : num}`}
                    onClick={() => onRemoveNumberClick(num)}
                    style={smallBoxStyle ? smallBoxStyle : null}
                >
                    {num}
                </div>
            ))}
        </div>
    );
};

export default BigBox;