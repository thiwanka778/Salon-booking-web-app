import React from 'react';
import "./SignUp.css";
import { Input } from "antd";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../../firebaseConfig";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { userRegister,reset } from '../../features/userSlice';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import verify from "../../assets/verify.jpg";
import { useNavigate } from 'react-router-dom';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SignUp = () => {

const navigate=useNavigate();
  const dispatch = useDispatch();
  const [openr, setOpenr] = React.useState(false);
  const [openrs, setOpenrs] = React.useState(false);
  const [showButton,setShowButton]=React.useState(false);
  const [count,setCount]=React.useState(1);

  const [passwordMatchError, setPasswordMatchError] = React.useState("");
  const [phoneNumberValidation, setPhoneNumberValidation] = React.useState({
    isValid: true,
    message: ""
  });
  const [passwordValidation, setPasswordValidation] = React.useState({
    isValid: true,
    message: ""
  });




  // console.log(passwordMatchError,"passwordMatchError")
  // console.log(phoneNumberValidation,"phoneNumberValidation")
  // console.log(passwordValidation,"passwordValidation")

  const { screen, user, isLoading, isSuccess, isError, errorMessage } = useSelector((state) => state.user)

  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [display, setDisplay] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const provider = new GoogleAuthProvider();
  


  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      toast.success('Verified Successfully!')
      if (result) {
        // console.log(result?.user?.email)
        setEmail(result?.user?.email)
        setDisplay(true)
      }

    }).catch((error) => {
      console.log(error)
    })
  }


  const handleChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value.trim(); // Remove leading and trailing spaces

    // Automatically capitalize the first letter
    if (name === "firstName" || name === "lastName") {
      updatedValue = updatedValue.replace(/^\w/, (c) => c.toUpperCase());
      updatedValue = updatedValue.replace(/[0-9]/g, ""); // Remove numbers
    }



    if (name === "phoneNumber") {
      const isValidPhoneNumber = /^0\d{9}$/.test(value);

      if (isValidPhoneNumber) {
        setPhoneNumberValidation({ isValid: true, message: "" });
      } else {
        setPhoneNumberValidation({
          isValid: false,
          message: "Phone number must start with 0 and have a length of 10 digits."
        });
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));




  };






  React.useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Password do not match !")
    } else {
      setPasswordMatchError("")
    }
  }, [formData.password, formData.confirmPassword])

  React.useEffect(() => {

    if (formData.password.length >= 8) {
      setPasswordValidation({ isValid: true, message: "" });
    } else {
      setPasswordValidation({
        isValid: false,
        message:
          "Password must be at least 8 characters long."
      });
    }

  }, [formData.password]);



  const signupClick = () => {
    setCount((prevState)=>{
      return prevState+1
    })
    setShowButton(false)
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const phoneNumber = formData.phoneNumber;
    const userType = "user";
    const password = formData.password;

    if(formData.firstName!=="" && formData.password!=="" && formData.phoneNumber!=="" && email!=="" &&
    passwordMatchError==="" && passwordValidation.isValid && phoneNumberValidation.isValid){
      dispatch(userRegister({
        firstName,
        lastName,
        email,
        phoneNumber,
        userType,
        password,
      }))
    }else{
setOpenr(true)
    }


  }



  const handleCloser = () => {
    setOpenr(false);
  };
  

React.useEffect(()=>{
if(isLoading===false){
  if(isSuccess===true){
    setOpenrs(true);
    dispatch(reset())
    setEmail("");
   
  }
}

},[isLoading])

const handleClosers = () => {
  setOpenrs(false);
  navigate("/login")
};

React.useEffect(()=>{
 if( errorMessage==="Email already exists !"){
setShowButton(true);
 }
  
  },[isLoading,count])


const changeEmailClick=()=>{
  setDisplay(false);
  dispatch(reset());
 setShowButton(false)
 setEmail("")
}

React.useEffect(()=>{
  if(errorMessage==="Phone number already exists !"){
    dispatch(reset())
  }

},[formData.phoneNumber,count])

  return (
    <>

      <div className='sign-up'>



        {!display && <div className="button-div">
          <button onClick={signInWithGoogle}
            className="verify-button">Verify Your Gmail</button>
        </div>}




        {display && <div className="register-form">

       

          <p style={{
            fontFamily: "'Poppins', sans-serif",
            marginTop: "40px",
            textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
            fontWeight: "bold",
            color: "white",
            marginBottom: "20px",
            letterSpacing: "3px",
            fontSize: "18px",
             maxWidth:"98%",
             overflow: "auto",
          }}>{email}</p>

{showButton && <button onClick={changeEmailClick} className="change-email-button">
      Change Email
    </button>}

             <p style={{marginTop: "2px",
             marginBottom:"10px",
              color: "red",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 1)",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "2px",
              fontSize: "13px", fontWeight: "bold",}}>{errorMessage}</p>

          <div>
            <p style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "2px",
              fontSize: screen < 208 ? "13px" : "16px",
              textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
            }}
            >First Name</p>
            <Input
              style={{
                width: screen < 325 ? "90vw" : "300px",
                height: "40px",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif ",
              }}
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

          </div>


          <br />

          <div>
            <p style={{
              color: "white",
              textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif", letterSpacing: "2px",
              fontSize: screen < 208 ? "13px" : "16px",
            }}>Last Name</p>
            <Input
              style={{
                width: screen < 325 ? "90vw" : "300px", height: "40px",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif ",
              }}
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <br />

          <div style={{ width: screen < 325 ? "90vw" : "300px" }}>
            <p style={{
              color: "white",
              textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif", letterSpacing: "2px",
              fontSize: screen < 208 ? "13px" : "16px",
            }}>Password</p>
            <Input.Password
              style={{
                width: screen < 325 ? "90vw" : "300px", height: "40px",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif ",
              }}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            {formData.password !== "" && <p style={{
              marginTop: "2px",
              color: "red",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 1)",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "2px",
              fontSize: "13px", fontWeight: "bold",
            }}>{passwordValidation.message}</p>}

          </div>



          <br />


          <div style={{ width: screen < 325 ? "90vw" : "300px" }}>
            <p style={{
              color: "white",
              textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif", letterSpacing: "2px",
              fontSize: screen < 208 ? "13px" : "16px",
            }}>Confirm Password</p>
            <Input.Password
              style={{
                width: screen < 325 ? "90vw" : "300px", height: "40px",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif ",
              }}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formData.confirmPassword !== "" && <p style={{
              marginTop: "2px",
              color: "red",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 1)",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "2px",
              fontSize: "13px", fontWeight: "bold"
            }}>{passwordMatchError}</p>}

          </div>

          <br />

          <div style={{ width: screen < 325 ? "90vw" : "300px" }}>
            <p style={{
              color: "white",
              fontWeight: "bold",
              textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
              fontFamily: "'Poppins', sans-serif", letterSpacing: "2px",
              fontSize: screen < 208 ? "13px" : "16px",
            }}>Phone Number</p>
            <Input
              style={{
                width: screen < 325 ? "90vw" : "300px", height: "40px",
                letterSpacing: "2px",
                fontWeight: "bold",
                fontFamily: " 'Ubuntu', sans-serif ",
              }}
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {formData.phoneNumber !== "" && <p style={{
              marginTop: "2px",
              color: "red",
              textShadow: "2px 2px 8px rgba(0, 0, 0, 1)",
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "2px",
              fontSize: "13px", fontWeight: "bold"
            }}>{phoneNumberValidation.message}</p>}
          </div>



          <div style={{ marginTop: "20px" }}>
            <button onClick={signupClick} className="register-button"
            >Register</button>
          </div>




        </div>}




      </div>



      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{

        }}

        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            fontFamily: " 'Ubuntu', sans-serif ",
            fontSize: "1rem",
            letterSpacing: "2px"
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },


        }}
      />



      <Backdrop
        sx={{ color: '#fff' }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>





      <Snackbar open={openr} autoHideDuration={3000} onClose={handleCloser}>
        <Alert onClose={handleCloser} severity="warning" sx={{ width: '100%' }}>
          Please provide valid details !
        </Alert>
      </Snackbar>




      <Dialog
        open={openrs}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
       <div style={{display:"flex",alignItems:"center"}}>
         <img  style={{width:"60px",
         marginRight:"10px",
        }} src={verify}/>
         <p style={{ fontFamily:" 'Ubuntu', sans-serif " ,
         fontSize:"20px",
         letterSpacing:"2px",
         fontWeight:"bold"}}>Registered Successfully !</p>
       </div>
        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleClosers}  variant="contained" >
            okay
          </Button>
        </DialogActions>
      </Dialog>


    </>
  )
}

export default SignUp