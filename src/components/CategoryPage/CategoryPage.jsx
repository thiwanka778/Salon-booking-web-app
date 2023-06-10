import React from 'react';
import "./CategoryPage.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ServiceCard from '../ServiceCard/ServiceCard';
import { getServices, serviceReset } from '../../features/serviceSlice';
import { Modal} from 'antd';
import axios from 'axios';
import { Input } from 'antd';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';
import { Image } from 'antd';
import { BASE_URL } from '../../apiService';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const { TextArea } = Input;





const CategoryPage = () => {

    const category = useParams()?.id;
    const dispatch = useDispatch();
    const { screen } = useSelector((state) => state.user)
    const { service, serviceLoading } = useSelector((state) => state.service);
    const [loading, setLoading] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [emailLoading, setEmailLoading] = React.useState(false);
    const [data, setData] = React.useState({
        _id: "",
        title: "",
        price: "",
        estimatedTime: "",
        url: "",
    });

    const [form, setForm] = React.useState({
        name: "",
        phoneNumber: "",
        text: "",
    });

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setForm((prevState) => ({
    //       ...prevState,
    //       [name]: value,
    //     }));
    //   };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "name") {
            const capitalizedValue = value.replace(/\b\w/g, (match) => match.toUpperCase());
            setForm((prevState) => ({
                ...prevState,
                [name]: capitalizedValue,
            }));
        } else {
            setForm((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };







    const showModal = () => {
        setVisible(true);
    };

    const handleOk = (e) => {
        console.log(e);
        setVisible(false);
    };

    const handleCancel = (e) => {
        console.log(e);
        setVisible(false);
    };

    React.useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            dispatch(getServices());
            setLoading(false)
        }, 2000);


        return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }, []);


    const groomingBookingClick = (id, title, price, estimatedTime, url) => {
        setData({ _id: id, title, price, estimatedTime, url })
        console.log(id, title, price, estimatedTime);
        setVisible(true);

    }





    // console.log(service)
    const serviceDisplay = service?.map((item) => {
        if (item.category.trim().replace(/\s+/g, ' ') === category.toLowerCase().trim().replace(/\s+/g, ' ')) {
            return (
                <ServiceCard key={item._id} {...item} userDisplay={true}
                    groomingBookingClick={groomingBookingClick} />
            )
        }
    });

    // console.log(form);

    const sendEmail = () => {
        if (form.name !== "" && form.phoneNumber !== "" && form.text !== "") {
            setVisible(false);
            setEmailLoading(true);
            const sendingMessage = `I am ${form.name}. I need this ${data.title} service. This is my phone number : ${form.phoneNumber}.
            Here is the details : ${form.text}`
            axios.post(`${BASE_URL}/email/sender`, { "emailText": sendingMessage })
                .then(() => {
                    console.log('Email sent successfully');
                    setEmailLoading(false);
                    toast.success('Message sent successfully !')
                    setVisible(false);
                    setForm({ name: "", phoneNumber: "", text: "" })
                    // Optionally, you can show a success message or perform any other actions
                })
                .catch((error) => {
                    console.log('Error sending email:', error);
                    setEmailLoading(false);
                    setVisible(false);
                    // Optionally, you can show an error message or handle the error
                });
        } else {
            toast.error('Input fields are required !')
        }


    };

    return (
        <>
            {loading === true ?

                <div style={{
                    width: "100%",
                    minHeight: "80vh",
                    display: "flex", alignItems: "center",
                    justifyContent: "center",


                }}>
                    <div className="loading-wave">
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                        <div className="loading-bar"></div>
                    </div>
                </div>
                :

                <div className='category-page'>
                    {serviceDisplay}
                </div>
            }



            {/* <div>

                <Modal

                    title={data?.title}
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button onClick={handleCancel}>Cancel</Button>,
                        <Button onClick={sendEmail} type="primary">Submit</Button>,
                    ]}
                >

                </Modal>
            </div> */}




            <Backdrop
                sx={{ color: 'gold' }}
                open={emailLoading}
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
                        style: {
                            fontFamily: " 'Ubuntu', sans-serif ",
                            fontSize: "1rem",
                            letterSpacing: "2px"
                        },
                    },



                }}
            />


            <Dialog
                open={visible}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {data?.title}
                </DialogTitle>
                <DialogContent>
                    <div>

                        <img style={{
                            width: "60%", borderRadius: "10px", marginBottom: "1rem",
                            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                        }} src={data?.url} />
                        {/* <Image
width={200}
    style={{
        borderRadius: "10px", marginBottom: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
    }}

    src={data?.url}
/> */}

                        <p style={{
                            fontWeight: "bold", letterSpacing: "2px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "1.2rem"
                        }}>Rs. {data?.price}</p>
                        <p style={{
                            letterSpacing: "2px",
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: "bold", color: "#5c5c5e", fontSize: "1rem",
                        }}>{data?.estimatedTime}</p>

                        <p style={{
                            fontWeight: "bold", letterSpacing: "2px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "1rem", marginTop: "20px", marginBottom: "2px",
                        }} >Name</p>
                        <Input name="name"
                            onChange={handleInputChange}
                            value={form.name}
                            style={{ width: screen <= 391 ? "95%" : "300px", }} placeholder="Name" />


                        <p style={{
                            fontWeight: "bold", letterSpacing: "2px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "1rem", marginTop: "10px", marginBottom: "2px",
                        }} >Phone Number</p>
                        <Input
                            name="phoneNumber"
                            onChange={handleInputChange}
                            value={form.phoneNumber}
                            style={{ width: screen <= 391 ? "95%" : "300px" }} placeholder="Phone Number" />


                        <p style={{
                            fontWeight: "bold", letterSpacing: "2px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "1rem", marginTop: "10px", marginBottom: "2px",
                        }} >Please kindly specify the desired date and time for the required service
                            (සේවාව සඳහා අවශ්‍ය දිනය සහ වේලාව සඳහන් කරන්න)
                        </p>

                        <TextArea
                            name="text"
                            onChange={handleInputChange}
                            value={form.text}
                            style={{ width: screen <= 391 ? "95%" : "300px", marginBottom: "10px", marginTop: "5px" }} rows={4} />
                        <p style={{
                            fontWeight: "bold", letterSpacing: "2px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "1rem", marginTop: "10px", marginBottom: "2px",
                        }}
                        >
                            <span style={{
                                fontFamily: "'Poppins', sans-serif", fontWeight: "bold",
                                fontSize: "1rem", color: "blue"
                            }} > No charges </span>
                            associated with scheduling an appointment. Thank
                            you for considering our services.</p>


                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} variant="contained" color="error">Cancel</Button>
                    <Button onClick={sendEmail} variant="contained" autoFocus>
                        submit
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default CategoryPage