import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
    const {screen}=useSelector((state)=>state.user)
    const navigate=useNavigate();
  return (
    <div className="footer">
      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "bold",
          letterSpacing: "3px",
          fontSize: "1.3rem",
          color: "#f72105",
        }}
      >
        Thisara{" "}
        <span
          style={{
            textShadow: " 2px 2px 0.2px black",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "bold",
            letterSpacing: "3px",
            fontSize: "1.2rem",
            color: "#f4fc03",
          }}
        >
          Salon
        </span>
      </p>

      <p
        style={{
          fontFamily: "'Poppins', sans-serif",
        //   fontWeight: "bold",
          letterSpacing: "3px",
          fontSize: "1rem",
          color:"white",
         
        }}
      >
        thisarasalon@gmail.com
      </p>

      <p
        style={{
            color:"white",
          fontFamily: "'Poppins', sans-serif",
        //   fontWeight: "bold",
          letterSpacing: "3px",
          fontSize: "1rem",
        }}
      >
        077-5677889
      </p>

      <div
        style={{
            marginTop:"1rem",
          width:screen<420? "100%" :"400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <a href="https://www.google.lk" target="_blank" style={{ width: "fit-content",cursor:"pointer", }}  >
            
            <FacebookIcon style={{color:"white"}}/>
        </a>

        <a href="https://www.google.lk"  target="_blank" style={{ width: "fit-content",cursor:"pointer",  }}>
            <TwitterIcon style={{color:"white"}}/>
        </a>

        <a href="https://www.google.lk"  target="_blank" style={{ width: "fit-content" ,cursor:"pointer", }}>
            <InstagramIcon style={{color:"white"}}/>
        </a>

        <a href="https://wa.me/+94775085369"  target="_blank" style={{ width: "fit-content",cursor:"pointer",  }}>
            <WhatsAppIcon style={{color:"white"}}/>
        </a>

      </div>
    </div>
  );
};

export default Footer;
