import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
function Header({to, isAuth, actualPage}) {
  isAuth = false;
  return (
   <header className='header-container'>
    <Link to={to}>
    <div className='logo'>
        <img src="/src/images/factuZoneLogo.jpg" alt="FactuZoneLogo"/> 
        <h1>FACTUZONE</h1>
    </div>
    </Link>
    <div className='auth-options'>

    {
      isAuth ? (
        
        <>
            <Link to="/home" className={actualPage == 'home' ? 'active-link' : ''}>Inicio</Link>
            <Link to="/dashboard" className={actualPage == 'dashboard' ? 'active-link' : ''}>MiZone</Link>
            <Link to="/" className={actualPage == 'logout' ? 'active-link' : ''}>Cerrar Sesión</Link>
          </>
        ) : (
          
          <>
            <Link to="/home" className={actualPage == 'home' ? 'active-link' : ''} >Inicio</Link>
            <Link to="/login"className={actualPage == 'login' ? 'active-link' : ''}>Iniciar Sesión</Link>
            <Link to="/register" className={actualPage == 'register' ? 'active-link' : ''}>Registrarse</Link>
          </>
        )}
      </div>
   </header>
  )
}

export default Header