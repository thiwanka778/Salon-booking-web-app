import React from "react";
import "./CategoryPage.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ServiceCard from "../ServiceCard/ServiceCard";
import { getServices, serviceReset } from "../../features/serviceSlice";
import { Modal } from "antd";
import axios from "axios";
import { Input } from "antd";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "antd";
import { BASE_URL } from "../../apiService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { getCategory } from "../../features/categorySlice";
import { whiteNotNeededPage } from "../../features/userSlice";
const { TextArea } = Input;

const CategoryPage = () => {
  const category = useParams()?.id;

  const dispatch = useDispatch();
  const { screen } = useSelector((state) => state.user);
  const { categoryArray } = useSelector((state) => state.category);
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

  let categoryName = "";
  if (category) {
    const categoryObject = categoryArray?.find(
      (item) => item?._id === category
    );
    categoryName = categoryObject?.categoryTitle?.toLowerCase().trim();
  }

  // console.log(categoryName, "\n\n\n\n\n\nBULLA");

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
      const capitalizedValue = value.replace(/\b\w/g, (match) =>
        match.toUpperCase()
      );
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

  React.useEffect(() => {
    dispatch(getCategory());
  }, []);

  React.useEffect(() => {
 
    dispatch(whiteNotNeededPage());
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
   // console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
   // console.log(e);
    setVisible(false);
  };

  React.useEffect(() => {
    setLoading(true);
      dispatch(getServices());
      setLoading(false);
     // Cleanup the timer when the component unmounts
  }, []);

  const groomingBookingClick = (id, title, price, estimatedTime, url) => {
    setData({ _id: id, title, price, estimatedTime, url });
    //console.log(id, title, price, estimatedTime);
    setVisible(true);
  };

  //   console.log(service, "SERVices ===>");
  const serviceDisplay = service?.map((obj) => {
    if (category === obj?.categoryId) {
      return (
        <ServiceCard
          key={obj?._id}
          {...obj}
          userDisplay={true}
          groomingBookingClick={groomingBookingClick}
          categoryName={categoryName}
        />
      );
    }
  });

  

  async function sendWhatsAppMessage() {
    const apiUrl = "https://graph.facebook.com/v17.0/102153772927786/messages";
    const bearerToken = process.env.REACT_APP_WHATSAPP_MESSAGE_TOKEN;
    if (form.name !== "" && form.phoneNumber !== "" && form.text !== "") {
      const sendingMessage = `\nI am ${form.name}.\nI need this ${data.title} service.\nThis is my phone number : ${form.phoneNumber}.\nHere is the details : ${form.text}\n`;
      setVisible(false);
      setEmailLoading(true);
      const messageBody = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "94707725663",
        type: "text",
        text: {
          body: sendingMessage,
        },
      };

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${bearerToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageBody),
        });

        if (response.ok) {
          setVisible(false);
          setEmailLoading(false);
         // console.log("Message sent successfully");
          toast.success("Message sent successfully !");
          setForm({ name: "", phoneNumber: "", text: "" });
          // Handle success scenario
        } else {
          setVisible(false);
          setEmailLoading(false);
           console.error("Failed to send message");
          toast.error("Failed to send message");
          setForm({ name: "", phoneNumber: "", text: "" });
          // Handle error scenario
        }
      } catch (error) {
        setVisible(false);
        setEmailLoading(false);
        setForm({ name: "", phoneNumber: "", text: "" });
         console.error("An error occurred", error);
        toast.error("An error occurred");
        // Handle error scenario
      }
    } else {
      toast.error("All fields are required !");
    }
  }

  return (
    <>
      {service===null ? (
        <div
          style={{
            width: "100%",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loading-wave">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", paddingTop: "110px" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop:"20px",
              marginBottom: "5px",
              padding: screen < 671 ? "0 5px 0 30px" : "0px",
            }}
          >
           {service?.length>=1 && <p
              style={{
                fontSize: screen < 451 ? "2rem" : "3rem",
                color: "#736f78",
                fontFamily: "'Ubuntu', sans-serif",
                
                fontWeight: "bold",
                letterSpacing: "3px",
              }}
            >
              {categoryName
                ? categoryName[0].toUpperCase() + categoryName.slice(1)
                : ""}{" "}
              {service!==null ? "Category":""}
            </p>}
          </div>

          <div className="category-page">{serviceDisplay}</div>
        </div>
      )}

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

      <Backdrop sx={{ color: "gold" }} open={emailLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: " 'Ubuntu', sans-serif ",
            fontSize: "1rem",
            letterSpacing: "2px",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
            style: {
              fontFamily: " 'Ubuntu', sans-serif ",
              fontSize: "1rem",
              letterSpacing: "2px",
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
        <DialogTitle id="alert-dialog-title">{data?.title}</DialogTitle>
        <DialogContent>
          <div>
            <img
              style={{
                width: "60%",
                borderRadius: "10px",
                marginBottom: "1rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              }}
              src={data?.url}
            />

            <p
              style={{
                fontWeight: "bold",
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.2rem",
              }}
            >
              Rs. {data?.price}
            </p>
            <p
              style={{
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: "bold",
                color: "#5c5c5e",
                fontSize: "1rem",
              }}
            >
              {data?.estimatedTime}
            </p>

            <p
              style={{
                fontWeight: "bold",
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                marginTop: "20px",
                marginBottom: "2px",
              }}
            >
              Name
            </p>
            <Input
              name="name"
              onChange={handleInputChange}
              value={form.name}
              style={{ width: screen <= 391 ? "95%" : "300px" }}
              placeholder="Name"
            />

            <p
              style={{
                fontWeight: "bold",
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                marginTop: "10px",
                marginBottom: "2px",
              }}
            >
              Phone Number
            </p>
            <Input
              name="phoneNumber"
              onChange={handleInputChange}
              value={form.phoneNumber}
              style={{ width: screen <= 391 ? "95%" : "300px" }}
              placeholder="Phone Number"
            />

            <p
              style={{
                fontWeight: "bold",
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                marginTop: "10px",
                marginBottom: "2px",
              }}
            >
              Please kindly specify the desired date and time for the required
              service (සේවාව සඳහා අවශ්‍ය දිනය සහ වේලාව සඳහන් කරන්න)
            </p>

            <TextArea
              name="text"
              onChange={handleInputChange}
              value={form.text}
              style={{
                width: screen <= 391 ? "95%" : "300px",
                marginBottom: "10px",
                marginTop: "5px",
              }}
              rows={4}
            />
            <p
              style={{
                fontWeight: "bold",
                letterSpacing: "2px",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1rem",
                marginTop: "10px",
                marginBottom: "2px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "blue",
                }}
              >
                {" "}
                No charges{" "}
              </span>
              associated with scheduling an appointment. Thank you for
              considering our services.
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={sendWhatsAppMessage} variant="contained" autoFocus>
            submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryPage;
