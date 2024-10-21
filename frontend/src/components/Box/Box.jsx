import React from 'react'
import './Box.scss'

const Box = ({className, children}) => {
    return (
        <div className={`box ${className ? className : null}`}>
        {children}
        </div>
    )
}

export default Box;