import React from 'react';
import "./Header.css";
import Avatar from '@mui/material/Avatar';
import salonLogo from "../../assets/salon-logo.png";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LoginIcon from '@mui/icons-material/Login';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../features/userSlice';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import salonLogo2 from "../../assets/salonLogo.png";
import EditIcon from '@mui/icons-material/Edit';
import { Input } from 'antd';

const Header = () => {
  const dispatch = useDispatch();
  const [anchorProfile, setAnchorProfile] = React.useState(null);
  const openProfile = Boolean(anchorProfile);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const { user, screen } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const userName = (user && user?.firstName) ? user?.firstName + " " + user?.lastName : "User"

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogin = () => {
    dispatch(userLogout())
    setAnchorEl(null);
  }


  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  // profile 
  // const handleClickProfile = (event) => {
  //   setAnchorEl(null);
  //   setAnchorProfile(event.currentTarget);
    
  // };
  // const handleCloseProfile = () => {
  //   setAnchorProfile(null);

  // };



  return (
    <>
      <div className="nav">
        <img style={{ width: "80px", marginLeft: "10px", marginRight: "20px",transform:"scaleX(-1)"}} src={salonLogo2} alt="salon-logo" />

        <p style={{
          marginRight: "auto", fontFamily:  "'Poppins', sans-serif",
          fontWeight: "bold",
          letterSpacing: "3px", fontSize:screen<594? "1.2rem":"2.2rem",
          color:"#f4fc03",
          textShadow:" 2px 2px 0.2px black",
        }}>
          THISARA SALON
        </p>

        {screen >= 950 && <NavLink to="/"
          className="nav-link-style" style={{
            marginRight: "2rem",
            fontSize:"1.2rem",
            fontFamily: "'Poppins', sans-serif  ",
            letterSpacing: "2px",
          }}>
          Home</NavLink>}

        {screen >= 950 && <p style={{
          marginRight: "2rem",
          fontFamily: "'Poppins', sans-serif ",
          fontSize:"1.2rem",
          letterSpacing: "2px",
        }}  >About Us</p>}

        {screen >= 950 && <p style={{
          marginRight: "2rem",
          fontSize:"1.2rem",
          fontFamily: "'Poppins', sans-serif  ",
          letterSpacing: "2px",
        }}  >Contact Us</p>}

{/* {screen >= 668 && <p onClick={handleClickProfile} style={{
         cursor:"pointer",
          marginRight: "2rem",
          fontFamily: "'Poppins', sans-serif  ",
          letterSpacing: "2px",
        }}  >Profile</p>} */}

        {screen < 950 && <div
          id="basic-button"
          aria-controls={open2 ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open2 ? 'true' : undefined}
          onClick={handleClick2}
          style={{
            marginRight: "20px",
            cursor: "pointer",
          }}>
          <MenuIcon />

        </div>}

        <div style={{ marginRight: "20px", cursor: "pointer" }}   >
          <Avatar alt={userName} 
          style={{background:"orange"}}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
        </div>


      </div>








      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem><PersonIcon />&nbsp; {userName}</MenuItem>
        <Divider />

        {/* {user !== null && <MenuItem
          id="basic-button"
          aria-controls={openProfile ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openProfile ? 'true' : undefined}
          onClick={handleClickProfile}
        >
          < RememberMeIcon />&nbsp; Profile
        </MenuItem>} */}


        {!user && <NavLink className="nav-link-style-menu" to="/sign-up">
          <MenuItem onClick={handleClose}>
            <AppRegistrationIcon />&nbsp; Sign Up</MenuItem>
        </NavLink>}



        {!user && <NavLink to="/login" className='nav-link-style-menu'>
          <MenuItem onClick={handleClose}>
            <LoginIcon />&nbsp; Login</MenuItem>
        </NavLink>}

        {user?.userType === "admin" && <NavLink to="/slider-images" className='nav-link-style-menu'>
          <MenuItem onClick={handleClose}>
            <AddToPhotosIcon />&nbsp; Add Slider Images</MenuItem>
        </NavLink>}

        {user?.userType === "admin" && <NavLink to="/service" className='nav-link-style-menu'>
          <MenuItem onClick={handleClose}>
            <EditIcon />&nbsp; Edit Services</MenuItem>
        </NavLink>}

        {user?.userType === "admin" && <NavLink to="/edit-category" className='nav-link-style-menu'>
          <MenuItem onClick={handleClose}>
            <EditIcon />&nbsp; Edit Categories</MenuItem>
        </NavLink>}




        {user && <MenuItem onClick={handleCloseLogin}>
          <PowerSettingsNewIcon />&nbsp; Log Out</MenuItem>}

      </Menu>









      <Menu
        id="basic-menu"
        anchorEl={anchorEl2}
        open={open2}
        onClose={handleClose2}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >


        <NavLink to="/" className='nav-link-style-menu'>
          <MenuItem onClick={handleClose2}><HomeIcon />&nbsp; Home</MenuItem>
        </NavLink>




        <MenuItem onClick={handleClose2}>< InfoIcon />&nbsp; About Us</MenuItem>
        <MenuItem onClick={handleClose2}><PhoneIcon />&nbsp; Contact Us</MenuItem>
      </Menu>

     



    </>
  )
}

export default Header