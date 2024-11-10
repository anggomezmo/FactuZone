import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'
function Button({variant,to, children}) {
  return (
    <Link to={to} className={variant}>
        <button>
           <span>{children}</span>
        </button>
    </Link>
  )
}

export default Button