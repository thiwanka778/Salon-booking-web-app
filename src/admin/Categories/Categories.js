import React from 'react'
import "./Categories.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Categories = ({ id, name, url, des }) => {
const {screen}=useSelector((state)=>state.user);
  const navigate = useNavigate();


  return (

    // <div className='categories' onClick={()=>navigate(`/category/${name.toLowerCase()}`)} style={{

    //   width: "320px", padding: "10px", cursor: "pointer",
    //   display: "flex", flexDirection: "column", marginBottom: "20px",
    //   borderRadius: "10px"
    // }}>

    //   <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", }}>
    //     <p style={{
    //       color: "white",
    //       letterSpacing: "2px",
    //       fontSize: "28px",
    //       fontWeight: "bold", fontFamily: " 'Ubuntu', sans-serif",
    //     }}>{name}</p>
    //   </div>


    //   <img style={{ width: "300px", borderRadius: "10px", marginBottom: "10px", }} src={url} />
      // <p style={{
      //   fontFamily: "'Poppins', sans-serif", color: "white", marginTop: "auto",
      //   letterSpacing: "2px", fontWeight: "bold"
      // }}>
      //   {des}
      // </p>


    // </div>

    <div className="categories" onClick={()=>navigate(`/category/${name.toLowerCase()}`)}
     style={{  width:screen<696?"80vw":"90%",display:"flex",
     borderRadius:"10px",margin:"20px",flexDirection:screen<696?"column":"row",cursor:"pointer", }}>

      <section style={{width:screen<696?"80vw":"320px",padding:screen<696?"2vw":"10px",alignItems:"center",justifyContent:"center",display:"flex",}}>
      <img style={{width:screen<696?"76vw":"300px",borderRadius:"10px",}}
       src={url}/>
      </section>

      <section style={{width:screen<696?"80vw":"70%",}}>
      <div style={{width:"100%"}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1px",marginTop:"3px" }}>
      <p style={{
           color: "white",
          letterSpacing: "2px",
          fontSize: "2rem",
           fontWeight: "bold", fontFamily: " 'Ubuntu', sans-serif",
        }}>{name}</p>
      </div>

      <p style={{
        fontFamily: "'Poppins', sans-serif", color: "white", 
        letterSpacing: "2px", fontWeight: "bold",fontSize:"1.2rem",
        padding:"10px",
      }}>
       {des}
      </p>


      </div>
      </section>


    </div>
  )
}

export default Categories