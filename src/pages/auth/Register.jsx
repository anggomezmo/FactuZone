import React from 'react'
import './register.css'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Link } from 'react-router-dom'


import flatpickr from 'flatpickr'
import  'flatpickr/dist/flatpickr.min.css';

import { useEffect } from 'react'


function Register() {
    
    
    
    useEffect(() => {
        flatpickr("#born-date", {
          dateFormat: "Y-m-d",
        });

      }, []);

  return (
        


    <div className='real-main-container'>
      <Header to = '/login' actualPage='register'/>
      <section className='main-container'>
          
          <div className='register-container'>
              <div className='inputs'>
                <label htmlFor="name">Nombre Completo</label>
                <input type="text" id='name' autoComplete='off'/>
              </div>
              <div className='inputs'>
              <label htmlFor="user">Correo Electrónico</label>
              <input type="email" id='user' autoComplete='off'/>
              </div>
              <div className='inputs'>
                <label htmlFor="number">Número Telefónico</label>
                <input type="tel" id='number' autoComplete='off' />
              </div>
              <div className='inputs'>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id='password' autoComplete='off'/>
              </div>

              <div className='inputs'>
                <label htmlFor="born-date">Fecha de Nacimiento</label>
                <input type="text" id='born-date' autoComplete='off'/>
              </div>
              
              <div className='button'>
                <Button to='/login' variant='login'>Registrarse</Button>
              </div> 
              <div className='create-account'>
                <p>¿Tienes una cuenta?</p>
                <Link to={'/login'}>Entrar</Link>
              </div>
          </div>
      </section>
    </div>
  )
}

export default Register