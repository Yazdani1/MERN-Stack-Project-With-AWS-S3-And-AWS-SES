import React from 'react'
import "./cardlayout.css";

const CardLayout = ({children, title,cardHeight}) => {
  return (
    <div className='card-layout-design' style={{height:cardHeight}}>
        <h5>{title}</h5>
        {children}
    </div>
  )
}

export default CardLayout