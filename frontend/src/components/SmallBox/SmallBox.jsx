import React from "react";
import './SmallBox.scss';

const SmallBox = ({number, onNumberClick}) => {
    return (
        <div
            className= {`small-box-number ${number === '0' ? 'none' : number}`}
            onClick={() => onNumberClick(number)}
        >
            {number}
        </div>
    );
};

export default SmallBox;