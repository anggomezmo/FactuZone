import React from 'react'
import Button from '../../components/Button'
import Header from '../../components/Header'
import './Login.css'
import { Link } from 'react-router-dom'
function Login() {
  return (
    <div className='real-main-container'>
      <Header to='/' actualPage='login' />
      <section className='main-container'>
          
          <div className='login-container'>
              <div className='inputs'>
                <label htmlFor="user">Correo Electrónico</label>
                <input type="email" id='user' />
              </div>
              <div className='inputs'>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id='password'/>
              </div>
              <div className='button'>
                <Button to='/dashboard' variant='login'>Iniciar Sesión</Button>
              </div>
              <div className='create-account'>
                <p>¿No tienes una cuenta? </p>
                <Link to='/register'>Regístrate</Link>
              </div>
          </div>
      </section>
    </div>
  )
}

export default Login