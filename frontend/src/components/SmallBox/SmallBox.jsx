import React from "react";
import './SmallBox.scss';

const SmallBox = ({number, onNumberClick}) => {
    return (
        <div
            className= {`small-box-number ${number === '' ? 'none' : number}`}
            onClick={() => onNumberClick(number)}
        >
            {number}
        </div>
    );
};

export default SmallBox;