import React from 'react'
import image from '../../assets/no-results.png'
import './NoResultDiv.css'

function NoResultDiv() {
  return (
    <div className='no-result'>
        <img src={image} alt="No result found" className='no-result__icon' />
        <h3 className='no-result__title'>Something went wrong</h3>
    </div>
  )
}

export default NoResultDiv