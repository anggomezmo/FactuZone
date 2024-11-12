import React from 'react'
import './FooterDiv.css'

function FooterDiv({upperText,bottomText}) {
  return (
    <div className='footer-piece'>
        <div className='upper-container'>
            <div className='number-container'>
                <h1>{upperText}</h1>
            </div>

            <div className='plus-container'>
                <h2>+</h2>
            </div>
        </div>
        <div className='bottom-container'>
           <h2>{bottomText}</h2>   
        </div>
    </div>
  )
}

export default FooterDiv