import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase'; // Asegúrate de importar correctamente auth

function Header({ isAuth, actualPage }) {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth); // Cerrar sesión en Firebase
      navigate('/login'); // Redirigir a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  // Redirección automática al Dashboard si isAuth es true y se da clic en "Inicio"
  const handleRedirectHome = () => {
    if (isAuth) {
      navigate('/dashboard');
    }
  };

  return (
    <header className='header-container'>
      <Link to='/' onClick={handleRedirectHome}>
        <div className='logo'>
          <img src="/src/images/factuZoneLogo.jpg" alt="FactuZoneLogo" />
          <h1>FACTUZONE</h1>
        </div>
      </Link>
      <div className='auth-options'>
        {
          isAuth ? (
            <>
              <Link to="/" className={actualPage === 'home' ? 'active-link' : ''}>Inicio</Link>
              <Link to="/dashboard" className={actualPage === 'dashboard' ? 'active-link' : ''}>MiZone</Link>
              {/* Enlace de Cerrar Sesión con la misma apariencia de los otros enlaces */}
              <Link to="/" onClick={handleLogout} className={actualPage === 'logout' ? 'active-link' : ''}>
                Cerrar Sesión
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={actualPage === 'home' ? 'active-link' : ''}>Inicio</Link>
              <Link to="/login" className={actualPage === 'login' ? 'active-link' : ''}>Iniciar Sesión</Link>
              <Link to="/register" className={actualPage === 'register' ? 'active-link' : ''}>Registrarse</Link>
            </>
          )
        }
      </div>
    </header>
  );
}

export default Header;
