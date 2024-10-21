import React from "react";
import './ResetBigBox.scss';
import ResetIcon from '../../assets/icons/reset-icon.png';

const ResetBigBox = ({ onClick }) => {
    return (
        <div className="reset-big-box" onClick={onClick}>
            <img className="image-reset-icon" src={ResetIcon}/>
        </div>
    );
};

export default ResetBigBox;