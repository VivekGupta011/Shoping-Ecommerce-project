import React from 'react';
import "./Footer.scss";

const Footer = () => {
  return (
    <>
    <div className="Custom-Footer custom-bottom" style={{textAlign:'center',padding:"1.5rem"}}>
        <p className="custom-paragraph">Developed by <a style={{textDecoration:"none",color:"blue"}} href="https://github.com/vivekgupta011" target="_blank"> <strong style={{fontWeight:700,textDecoration:"none"}}><i>Vivek Gupta</i></strong> </a>  & <a style={{textDecoration:"none",color:'blue'}} href="https://github.com/vivekgupta011" target="_blank"> <strong style={{fontWeight:700,textDecoration:"none"}}><i>Rohit Singh</i></strong> </a></p>

    </div>
    </>
  )
}

export default Footer