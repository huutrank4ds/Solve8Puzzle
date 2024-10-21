import React from 'react'
import './Button.scss'

const Button = ({className, disabled, onClick, children}) => {
    return (
        <button className={`button ${className ? className : null}`} onClick={onClick} {...(disabled ?  {disabled: true} : {})}>
        {children}
        </button>
    )
}

export default Button;