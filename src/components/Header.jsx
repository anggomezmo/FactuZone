import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
function Header({to}) {
  return (
   <header className='header-container'>
    <Link to={to}>
    <div className='logo'>
        <img src="/src/images/factuZoneLogo.jpg" alt="FactuZoneLogo"/> 
        <h1>FACTUZONE</h1>
    </div>
    </Link>
   </header>
  )
}

export default Header