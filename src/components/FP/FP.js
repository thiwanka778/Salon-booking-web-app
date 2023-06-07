import React from 'react';
import "./FP.css";
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { userEmailCheck, reset,updateUserPassword } from '../../features/userSlice';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleAuthProvider, signInWithPopup, updatePassword } from 'firebase/auth';
import { auth } from "../../firebaseConfig";
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


const FP = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const [openrs, setOpenrs] = React.useState(false);
    const [openr, setOpenr] = React.useState(false);
    const { screen, isLoading, errorMessage, isSuccess, isError,successMessage } = useSelector((state) => state.user);
    const [verifyButtonDisplay, setVerifyButtonDisplay] = React.useState(false);
    const [forgotPasswordDisplay, setForgotPasswordDisplay] = React.useState(false);
    const [passwordValidation, setPasswordValidation] = React.useState({message:"",valid:true});
    const [passwordValidationc, setPasswordValidationc] = React.useState({message:"",valid:true});
    const [email, setEmail] = React.useState("");
    const provider = new GoogleAuthProvider();
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const handleCloser = () => {
        setOpenr(false);
      };
     

    //console.log(formData)

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Trim spaces from the value
        const trimmedValue = value.trim();

        // Check if the field is password or email
        if (name === 'password' || name === 'email' || name === "confirmPassword") {
            // Remove any spaces from the trimmed value
            const sanitizedValue = trimmedValue.replace(/\s/g, '');

            setFormData((prevState) => {
                return { ...prevState, [name]: sanitizedValue };
            });
        } else {
            setFormData((prevState) => {
                return { ...prevState, [name]: trimmedValue };
            });
        }
    };

    const emailCheckButtonClick = () => {
        const email = formData.email
        dispatch(userEmailCheck({ email }))
    }

    React.useEffect(() => {
        dispatch(reset())
    }, [formData.email]);




    React.useEffect(() => {
        if (isLoading === false && isSuccess === true) {
            setVerifyButtonDisplay(true);
            toast.success('Your email has been found in the database!');
            dispatch(reset())
        }
    }, [isLoading])






    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {

            if (result) {
                // console.log(result?.user?.email)

                if (formData.email === result?.user?.email) {
                    toast.success('Verified Successfully!')
                    setEmail(result?.user?.email)
                    setForgotPasswordDisplay(true)
                } else {
                    toast.error("Wrong email has been verified!")
                }

            }

        }).catch((error) => {
            console.log(error)
        })
    }


    React.useEffect(() => {
        if (formData.password !== "") {
            if (formData.password.length < 8) {
                setPasswordValidation({message:"Password must contain at least 8 characters.",valid:false})
            } else {
                setPasswordValidation({message:"",valid:true})
            }
        }
    }, [formData.password]);


    React.useEffect(() => {
        if (formData.confirmPassword !== "") {
            if (formData.password === formData.confirmPassword) {
                setPasswordValidationc({message:"",valid:true})
            } else {
                setPasswordValidationc({message:"Passwords do not match.",valid:false})
            }
        }
    }, [formData.password, formData.confirmPassword]);


const updatePasswordClick=()=>{
    const email=formData.email;
    const password=formData.password;
    if(formData.password!=="" && formData.confirmPassword!=="" && passwordValidation.valid && passwordValidationc.valid){
        dispatch(updateUserPassword({email,password}))
    }else{
        setOpenr(true);   
    }

}


React.useEffect(()=>{
if(isLoading===false && successMessage==="Password updated successfully!"){
    
    setPasswordValidation({message:"",valid:true})
    setPasswordValidationc({message:"",valid:true})
setOpenr(false)
setOpenrs(true);
dispatch(reset());

}
},[isLoading]);

const handleClosers = () => {
    setOpenrs(false);
    navigate("/login")
    
  };



    return (
        <>




            <div className='fp'>


                {verifyButtonDisplay === false &&
                    <div style={{
                        marginBottom: "10px",
                        display: "flex", flexDirection: "column",
                    }}>


                        <div style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <p
                                style={{
                                    marginBottom: "10px",
                                    color: "red",
                                    textShadow: "2px 2px 8px rgba(0, 0, 0, 1)",
                                    fontFamily: "'Poppins', sans-serif",
                                    letterSpacing: "2px",
                                    fontSize: "15px", fontWeight: "bold",
                                }}
                            >{errorMessage}</p>
                        </div>



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
                            style={{
                                width: screen < 325 ? "90vw" : "300px",
                                height: "40px",
                                letterSpacing: "2px",
                                fontWeight: "bold",
                                fontFamily: " 'Ubuntu', sans-serif ",
                            }}
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />




                    </div>}

                {verifyButtonDisplay === false && <button className="button" onClick={emailCheckButtonClick}>CHECK MY EMAIL</button>}

                {verifyButtonDisplay === true && forgotPasswordDisplay === false && <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    marginTop: "40px",
                    textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "20px",
                    // width:"100%",
                    letterSpacing: "3px",
                    fontSize: "18px",
                    maxWidth: "98%",
                    overflow: "auto",
                }}>{formData.email}</p>}


                {verifyButtonDisplay === true && forgotPasswordDisplay === false && <button
                    onClick={signInWithGoogle}
                    className="fp-verify-button">VERIFY YOUR GMAIL</button>}

               {forgotPasswordDisplay &&  <p style={{
                    fontFamily: "'Poppins', sans-serif",
                    marginTop: "40px",
                    textShadow: " 2px 5px 4px rgba(0, 0, 0, 1)",
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: "20px",
                    // width:"100%",
                    letterSpacing: "3px",
                    fontSize: "18px",
                    maxWidth: "98%",
                    overflow: "auto",
                }}>{formData.email}</p>}


               {forgotPasswordDisplay &&  <div style={{ width: screen < 325 ? "90vw" : "300px", marginBottom: "10px", }}>
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

                </div>}




              {forgotPasswordDisplay &&   <div style={{ width: screen < 325 ? "90vw" : "300px", marginBottom: "10px", }}>
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
                        fontSize: "13px", fontWeight: "bold",
                    }}>{passwordValidationc.message}</p>}

                </div>}

               {forgotPasswordDisplay &&  <button onClick={updatePasswordClick}  className="update-password-btn">UPDATE PASSWORD</button>}





            </div>





            <Backdrop
                sx={{ color: '#fff' }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


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
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        fontFamily: " 'Ubuntu', sans-serif ",
                        fontSize: "30px",
                        letterSpacing: "2px"
                    },

                    // Default options for specific types
                    success: {
                        duration: 5000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                    error: {
                        duration: 5000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },


                }}
            />


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
         fontWeight:"bold"}}>Updated Successfully !</p>
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

export default FP;