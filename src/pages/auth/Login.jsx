import React, { useState } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2';

function Login() {
 
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

 
  const navigate = useNavigate();


  const handleLogin = async () => {
    if (!correo || !contraseña) {
      Swal.fire('Error', 'Por favor ingresa tu correo y contraseña', 'error');
      return;
    }

    try {

      const loadingSwal = Swal.fire({
        title: 'Cargando...',
        text: 'Estamos verificando tus credenciales.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });


      await signInWithEmailAndPassword(auth, correo, contraseña);


      loadingSwal.close();

      Swal.fire('Éxito', 'Bienvenido', 'success').then(() => {

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
