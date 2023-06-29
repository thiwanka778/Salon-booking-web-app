import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaTiktok } from 'react-icons/fa';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
       077-7077752
      </p>

      <div
        style={{
            marginTop:"1rem",
          width:screen<500? "100%" :"400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <a href="https://web.facebook.com/pradeep.salgadu.1?mibextid=ZbWKwL&_rdc=2&_rdr" target="_blank" style={{ width: "fit-content",cursor:"pointer", }}  >
            
            <FacebookIcon style={{color:"white"}}/>
        </a>

        <a href="https://www.youtube.com/@thisarasalon9055"  target="_blank" style={{ width: "fit-content",cursor:"pointer",  }}>
            <YouTubeIcon style={{color:"white"}}/>
        </a>

        <a href="https://www.instagram.com/pradeepsalgadu/?igshid=ZGUzMzM3NWJiOQ%3D%3D"  target="_blank" style={{ width: "fit-content" ,cursor:"pointer", }}>
            <InstagramIcon style={{color:"white"}}/>
        </a>

        <a href="https://chat.whatsapp.com/JqILuoFcv5b1lc9vf1dsGR"  target="_blank" style={{ width: "fit-content",cursor:"pointer",  }}>
            <WhatsAppIcon style={{color:"white"}}/>
        </a>

        <a href="https://www.tiktok.com/@thisarasalon"  target="_blank" style={{ width: "fit-content",cursor:"pointer",  }}>
        <FaTiktok color="#ffffff" size={21} />
        </a>

        <a href="https://www.google.com/maps/place/Thisara+Salon/@6.5618636,79.9819874,21z/data=!4m14!1m7!3m6!1s0x3ae231b0f626131f:0xe0335b0648ce981f!2sThisara+Salon!8m2!3d6.5619522!4d79.9819879!16s%2Fg%2F11f6g3t8x9!3m5!1s0x3ae231b0f626131f:0xe0335b0648ce981f!8m2!3d6.5619522!4d79.9819879!16s%2Fg%2F11f6g3t8x9?entry=ttu"  target="_blank" style={{ width: "fit-content",cursor:"pointer",  }}>
        <LocationOnIcon style={{color:"white",fontSize:"22"}} />
        </a>

      </div>
    </div>
  );
};

export default Footer;
