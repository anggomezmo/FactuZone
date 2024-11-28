import React from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import Swal from 'sweetalert2';

function Header({ isAuth, actualPage }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Mostrar SweetAlert de espera
      Swal.fire({
        title: "Cerrando sesión...",
        text: "Por favor, espera un momento.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
  

      await signOut(auth);
  

      Swal.fire({
        icon: "success",
        title: "¡Sesión cerrada!",
        text: "Has cerrado sesión correctamente.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
   
        navigate('/login');
        isAuth = false 
      });
    } catch (error) {
     
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cerrar la sesión. Inténtalo de nuevo más tarde.",
      });
      console.error("Error al cerrar sesión: ", error);
    }
  };


  const handleRedirectHome = () => {
    if (isAuth) {
      navigate('/dashboard');
    }
  };

  return (
    <div className='prueba'>
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
           
              <Link onClick={handleLogout} className={actualPage === 'logout' ? 'active-link' : ''}>
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
    </div>
  );
}

export default Header;
