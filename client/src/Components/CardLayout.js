import React from 'react'
import "./cardlayout.css";

const CardLayout = ({children, title}) => {
  return (
    <div className='card-layout-design'>
        <h5>{title}</h5>
        {children}
    </div>
  )
}

export default CardLayout