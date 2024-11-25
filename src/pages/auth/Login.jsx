import React, { useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase.js'; // Asegúrate de que el archivo firebase.js esté exportando correctamente `auth`
import { signInWithEmailAndPassword } from "firebase/auth"; // Método de autenticación de Firebase
import Swal from 'sweetalert2';

function Login() {
  // Estado para los campos de correo y contraseña
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  // Hook para la navegación (redirección)
  const navigate = useNavigate();

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    if (!correo || !contraseña) {
      Swal.fire('Error', 'Por favor ingresa tu correo y contraseña', 'error');
      return;
    }

    try {
      // Mostrar SweetAlert de carga mientras se intenta el login
      const loadingSwal = Swal.fire({
        title: 'Cargando...',
        text: 'Estamos verificando tus credenciales.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Intentar iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, correo, contraseña);

      // Cerrar SweetAlert de carga
      loadingSwal.close();

      // Mostrar un mensaje de éxito
      Swal.fire('Éxito', 'Bienvenido', 'success').then(() => {
        // Redirigir al dashboard o página principal
        navigate('/dashboard');
      });
    } catch (error) {
      // Cerrar SweetAlert de carga en caso de error
      Swal.fire('Error', 'Contraseña o Usuario incorrecto', 'error');
      console.log(e)
    }
  };

  return (
    <div className='real-main-container'>
      <Header to='/' actualPage='login' />
      <section className='main-container'>
        <div className='login-container'>
          <div className='inputs'>
            <label htmlFor="user">Correo Electrónico</label>
            <input
              type="email"
              id="user"
              autoComplete="off"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado con el valor del correo
            />
          </div>
          <div className='inputs'>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)} // Actualiza el estado con el valor de la contraseña
            />
          </div>
          <div className='button'>
            <Button variant='login' onClick={handleLogin}>
              Iniciar Sesión
            </Button>
          </div>
          <div className='create-account'>
            <p>¿No tienes una cuenta? </p>
            <Link to='/register'>Regístrate</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
