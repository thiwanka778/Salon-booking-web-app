import React from 'react'
import "./Login.css";
import { Input } from "antd";
import {
  userLogin, res, reset,whiteNeededPage
} from '../../features/userSlice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {
  useDispatch, useSelector
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { screen, isLoading, isError, isSuccess, errorMessage } = useSelector((state) => state.user)

  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleClick = () => {
    const email = formData.email;
    const password = formData.password;
    dispatch(userLogin({ email, password }))
    // Perform login logic here
  };

  React.useEffect(() => {
    if (isLoading === false) {
      if (isSuccess === true) {
        dispatch(reset());
        navigate("/");
      }
    }
  }, [isLoading])




  React.useEffect(() => {
    dispatch(reset())
  }, [formData]);

  React.useEffect(()=>{
dispatch(whiteNeededPage());
  },[])



  return (
    <>
      <div className='login-page'>

        <div className="login-part">
          <p style={{
            marginTop: "2px",
            marginBottom: "10px",
            color: "red",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 1)",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "2px",
            fontSize: "13px", fontWeight: "bold",
          }}>{errorMessage}</p>

          <div style={{ marginBottom: "10px" }}>
            <p style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "2px",
              fontSize: screen < 208 ? "13px" : "16px",
              textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
            }}
            >Email</p>
            <Input
              onChange={handleChange}
              value={formData.email}
              style={{
                width: screen < 325 ? "90vw" : "300px",
                height: "40px",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif ",
              }}
              placeholder="Email"
              name="email"
            />

          </div>

          <div style={{ width: screen < 325 ? "90vw" : "300px" }}>
            <p style={{
              color: "white",
              textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif", letterSpacing: "2px",
              fontSize: screen < 208 ? "13px" : "16px",
            }}>Password</p>
            <Input.Password
              onChange={handleChange}
              value={formData.password}
              style={{
                width: screen < 325 ? "90vw" : "300px", height: "40px",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif ",
              }}
              placeholder="Password"
              name="password"

            />
            <div>
            <p  className="forgot-password" onClick={()=>navigate("/forgot-password")}>Forgot password</p>
            </div>
          
          </div>




          <button
            className="login-button"
            onClick={handleClick}
          >
            Login
          </button>




        </div>











      </div>


      <Backdrop
        sx={{ color: '#fff' }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default Login