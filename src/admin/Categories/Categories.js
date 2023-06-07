import React from 'react'
import "./Categories.css";
import { useNavigate } from 'react-router-dom';

const Categories = ({ id, name, url, des }) => {

const navigate=useNavigate();


  return (

    <div className='categories' onClick={()=>navigate(`/category/${name.toLowerCase()}`)} style={{
     
      width: "320px", padding: "10px", cursor: "pointer",
      display: "flex", flexDirection: "column", marginBottom: "20px",
      borderRadius: "10px"
    }}>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", }}>
        <p style={{
          color: "white",
          letterSpacing: "2px",
          fontSize: "28px",
          fontWeight: "bold", fontFamily: " 'Ubuntu', sans-serif",
        }}>{name}</p>
      </div>


      <img style={{ width: "300px", borderRadius: "10px", marginBottom: "10px", }} src={url} />
      <p style={{
        fontFamily: "'Poppins', sans-serif", color: "white", marginTop: "auto",
        letterSpacing: "2px", fontWeight: "bold"
      }}>
        {des}
      </p>


    </div>
  )
}

export default Categories