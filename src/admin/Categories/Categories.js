import React from "react";
import "./Categories.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Categories = ({
  id,
  categoryTitle,
  categoryUrl,
  categoryDes,
  usersHomePage,
}) => {
  const { screen } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const categoryNavigate = () => {
    if (usersHomePage === true) {
      navigate(`/category/${categoryTitle.toLowerCase()}`);
    }
  };

  return (
    <div
      className="categories"
      onClick={categoryNavigate}
      style={{
        width: screen < 696 ? "80vw" : "90%",
        display: "flex",
        borderRadius: "10px",
        margin: "20px",
        flexDirection: screen < 696 ? "column" : "row",
        cursor: "pointer",
      }}
    >
      <section
        style={{
          width: screen < 696 ? "80vw" : "320px",
          padding: screen < 696 ? "2vw" : "10px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <img
          style={{
            width: screen < 696 ? "76vw" : "300px",
            borderRadius: "10px",
          }}
          src={categoryUrl}
        />
      </section>

      <section style={{ width: screen < 696 ? "80vw" : "70%" }}>
        <div style={{ width: "100%",display:"flex",flexDirection:"column",height:"100%", }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1px",
              marginTop: "3px",
            }}
          >
            <p
              style={{
                color: "white",
                letterSpacing: "2px",
                fontSize: "2rem",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif",
              }}
            >
              {categoryTitle[0].toUpperCase() + categoryTitle.slice(1)}
            </p>
          </div>

          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              color: "white",
              letterSpacing: "2px",
              fontWeight: "bold",
              fontSize: "1rem",
              padding: "10px",
            }}
          >
            {categoryDes}
          </p>
          {!usersHomePage && (
            <div
              style={{
                width: "100%",
                //  background:"red",
                marginTop:"auto", 
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-end",
                marginBottom:"10px",
              }}
            >
              <Tooltip title="Update">
                <IconButton>
                  <EditIcon style={{ color: "white", fontSize: "25px" }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton>
                  <DeleteForeverIcon
                    style={{ color: "white", fontSize: "25px" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>

      </section>
    </div>
  );
};

export default Categories;
