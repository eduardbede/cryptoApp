import React from 'react'
import { Link } from 'react-router-dom'
import './ErrorPage.css'

export default function ErrorPage() {
  return (
    <div className='errorDiv'>
        <div className='errorDiv'></div>
            <h2 className='h2ErrorDiv'>
                <p>ERROR 404</p>
                 <div>Page Not Found</div> 
                <Link to='/'>GO TO Home</Link>
            </h2>
    </div>
  )
}
