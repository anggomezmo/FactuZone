import React from 'react'
import './MainView.css'
import Header from '../../components/Header'
import Button from '../../components/Button'
function MainView() {
  return (
    <div className='real-main-container'>
        <Header actualPage='home'></Header>
        <section className='first-container'>
            <div className='separator-first-container'>
              <div className='first-left-container'>
                <img src="/src/images/cerdito.png" alt="aaaaaaaa" />

              </div>
              <div className='first-right-container'>
                <h1>Hacemos de tu bolsillo, una preocupación menos.</h1>
                <Button to={'/login'} variant='login2'>Iniciar Sesión</Button>
              </div>
            </div>

            <div className='footer-first-container'>
              <div>
                1
              </div>
              <div>
                2
              </div>
              <div>
                3
              </div>
              <div>
                4
              </div>
            </div>

        </section>
        <section className='second-container'>
            chao
        </section>

    </div>
  )
}

export default MainView