import React from 'react';
import "./ServiceCard.css";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelector, useDispatch } from 'react-redux';
import AnchorLink from "react-anchor-link-smooth-scroll";

const ServiceCard = ({ category, _id, title,
     price, des, url, updateServiceClick, estimatedTime,
     deleteIconClick,userDisplay}) => {

    const dispatch = useDispatch();
   
    const { user,screen } = useSelector((state) => state.user);

      
    return (


        <div className="service-card" style={{
            width:screen<711?"300px": "85%", padding: "10px"
            , margin: 20, borderRadius: "10px",
            display: "flex", flexDirection:screen<711?"column":"row",
        }}>
            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}} >
                <img style={{ width: "280px", borderRadius: "10px", }}
                    src={url} />
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <p style={{
                        fontWeight: "bold",
                        fontSize: "0.8rem", letterSpacing: "2px",
                        fontFamily: " 'Ubuntu', sans-serif",
                        marginTop: "2px",
                    }}>{category[0].toUpperCase() + category.slice(1)}</p>
                </div>
            </div>

            <div style={{width:"100%",padding:screen<711?"0px":"0px 20px 10px 20px",display:"flex",flexDirection:"column"}}>
                <div style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", marginTop: "5px",
                    marginBottom:"8px",
                }}>
                    <p style={{
                        fontWeight: "bold",
                        fontSize: "2rem", letterSpacing: "2px",
                        fontFamily: " 'Ubuntu', sans-serif",
                    }}>{title}</p>
                </div>

                <p style={{
                    fontWeight: "bold",
                    fontSize: "1.5rem", letterSpacing: "2px",
                    fontFamily: "'Poppins', sans-serif",
                }}>
                    Rs. <span style={{fontSize: "1.5rem"}}>{price}</span></p>

                <p style={{
                    fontWeight: "bold",
                    marginBottom: "3px",
                    color: "#838587",
                    fontSize: "1.2rem", letterSpacing: "2px",
                    fontFamily: "'Poppins', sans-serif",
                    marginTop:"3px",
                }}>{des}</p>

                {estimatedTime !=="" && <p style={{
                    fontWeight: "bold",
                    marginBottom: "3px",
                    color: "black",
                    fontSize: "1.2rem", letterSpacing: "3px",
                    fontFamily: "'Poppins', sans-serif",
                    marginTop:"10px",
                }}>{estimatedTime}
                </p>}

            {  category==="grooming packages" && userDisplay &&   <div style={{marginTop:"10px"}}>
               <button className="booking-button">Book Now</button>
               </div>}
               


                



                {user?.userType === "admin" && <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", marginTop: "auto" }}>

                  {!userDisplay &&<AnchorLink href='#update-input-box'>   <Tooltip title="Update" >
                
                        <IconButton onClick={() => updateServiceClick(_id, url, title, des, price, category,estimatedTime)} >
                            <EditIcon style={{ color: "green", fontSize: "25px" }} />
                        </IconButton>
                    </Tooltip>  </AnchorLink>}

                  {!userDisplay &&  <Tooltip title="Delete">
                        <IconButton onClick={() => deleteIconClick(_id, title)}>
                            <DeleteForeverIcon style={{ color: "red", fontSize: "25px" }} />
                        </IconButton>
                    </Tooltip>}

                </div>}
            </div>



        </div>
    )
}

export default ServiceCard

