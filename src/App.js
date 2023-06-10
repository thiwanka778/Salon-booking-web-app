import React from "react";
import Header from "./components/Header/Header";
import "./index.css";
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import { getScreenWidth, reset, getUser, userLogout, openModal, closeModal } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux"
import Login from "./components/Login/Login";
import RequiredAuth from "./protected/RequiredAuth";
import FP from "./components/FP/FP";
import SliderImages from "./admin/SliderImages/SliderImages";
import AdminAuth from "./protected/AdminAuth";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Service from "./admin/Service/Service";
import CategoryPage from "./components/CategoryPage/CategoryPage";


function App() {

  const dispatch = useDispatch();
  const { screen, user, isLoading, isError, errorMessage, open } = useSelector((state) => state.user)
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);




  React.useEffect(() => {
    dispatch(getScreenWidth(windowWidth))
  }, [windowWidth]);


  React.useEffect(() => {
    if (user && user?.token) {
      const token = user?.token;
      dispatch(getUser({ token }))
    }

  }, []);

  React.useEffect(() => {
    if (isError === true && errorMessage === "Not authorized") {
      dispatch(openModal())
      dispatch(userLogout())

    }
  }, [isLoading, errorMessage])

  const handleClose = () => {
    dispatch(closeModal())
  };

 
  return (
    <>
      <div className="app">
        <Header />

        <div className="app-body" >
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="category/:id" element={<CategoryPage/>}/>

            <Route element={<RequiredAuth />}>
              <Route path="sign-up" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<FP />} />
            </Route>

            <Route element={<AdminAuth />}>
              <Route path="slider-images" element={<SliderImages />} />
              <Route path="service" element={<Service />} />
            </Route>

          

          </Routes>

        </div>

      </div>




      <Dialog
        open={open}


      >
        <DialogTitle id="alert-dialog-title">
          {"Your session has been expired !"}
        </DialogTitle>

        <DialogActions>

          <Button onClick={handleClose} autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
