import React from 'react'
import { Link } from 'react-router-dom'
import './Button.css'
function Button({ variant, to, children, onClick, type = "button"}) {
 
  if (to) {
    return (
      <Link to={to} className={variant}>
           <button >
          <span>{children}</span>
        </button>
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={variant}
      onClick={onClick}
  
    >
      <span>{children}</span>
    </button>
  );
}

export default Button;