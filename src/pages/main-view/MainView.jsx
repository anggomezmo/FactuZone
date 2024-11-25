import React from 'react'
import './MainView.css'
import Header from '../../components/Header'
import Button from '../../components/Button'
import FooterDiv from '../../components/FooterDiv'
function MainView() {
  return (
    <div className='real-main-container'>
        <Header actualPage='home' isAuth={false}></Header>
        <section className='first-container'>
            <div className='separator-first-container'>
              <div className='first-left-container'>
                <img src="/src/images/cerdito.png" alt="aaaaaaaa" />

              </div>
              <div className='first-right-container'>
                <h1>Una preocupación menos para tu bolsillo.</h1>
                <Button to={'/login'} variant='login2'>Iniciar Sesión</Button>
              </div>
            </div>

            <div className='footer-first-container'>
    	        <div className='footer-first-container-wrapper'>
                
                <FooterDiv upperText='17K' bottomText='Usuarios registrados'/>
                <FooterDiv upperText='150M' bottomText='Facturas registradas'/>
                <FooterDiv upperText='50,000' bottomText='Reportes financieros'/>
                <FooterDiv upperText='9K' bottomText='Clientes felices'/>
              </div>
             
            </div>

        </section>
        

    </div>
  )
}

export default MainView