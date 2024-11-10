import React from 'react'
import './Header.css'
function Header() {
  return (
   <header className='header-container'>
    <div className='logo'>
        <img src="/src/images/factuZoneLogo.jpg" alt="FactuZoneLogo"/> 
        <h1>FACTUZONE</h1>
    </div>
   </header>
  )
}

export default Header