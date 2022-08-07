import React from 'react'
import "./cardlayout.css";

const CardLayout = ({children}) => {
  return (
    <div className='card-layout-design'>
        {children}
    </div>
  )
}

export default CardLayout