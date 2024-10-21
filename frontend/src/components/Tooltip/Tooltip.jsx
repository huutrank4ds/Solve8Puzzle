import React from "react";
import "./Tooltip.scss";

const TooltipButton = ({ className, children, style}) => {
    return (
        <div className={`tooltip ${className}`} style={style}>
            <span className="tooltip-text">{children}</span>
        </div>
    );
};

export default TooltipButton;