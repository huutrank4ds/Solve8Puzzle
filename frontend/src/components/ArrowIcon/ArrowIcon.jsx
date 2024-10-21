import React from "react";  
import './ArrowIcon.scss';

const ArrowIcon = ({className, src, alt}) => {
    return (
        <div className="arrow-icon-container">
        <img
            className={className}
            src={src}
            alt={alt}
        />
        </div>
    );
};

export default ArrowIcon;