import React from 'react';
import "./Service.css";
import { useDispatch, useSelector } from 'react-redux';
import { AutoComplete, Input } from 'antd';
import categorydata from '../Categories/categorydata';
import emptyImage from "../../assets/emptyImage.jpg";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import {
  serviceReset,
  createService,
  getServices,
  updateService,
  deleteService
} from "../../features/serviceSlice";
import { v4 } from "uuid";
import { openModal, userLogout } from '../../features/userSlice';
import ServiceCard from '../../components/ServiceCard/ServiceCard';

const { TextArea } = Input;

const Service = () => {
  const dispatch = useDispatch();
  const { screen, user } = useSelector((state) => state.user);
  const [deleteTitle, setDeleteTitle] = React.useState("");
  const [serviceDeleteId, setServiceDeleteId] = React.useState("");
  const [opend, setOpend] = React.useState(false);
  const { serviceLoading,
    serviceError, serviceSuccess,
    serviceErrorMessage,
    service,
    serviceUpdateSuccess,
    serviceDeleteSuccess, } = useSelector((state) => state.service);

  const [category, setCategory] = React.useState('');
  const [categorySelect, setCategorySelect] = React.useState('');
  const [imageUpload, setImageUpload] = React.useState(null)
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [serviceId, setServiceId] = React.useState("");
  const [serviceForm, setServiceForm] = React.useState({
    title: "",
    des: "",
    price: "",
    url: "",
    estimatedTime:"",
  });

 

  const options = categorydata?.map((item) => {
    const newObject = { value: item?.name }
    return newObject;
  })
  

  const handleChangeCategory = (inputValue) => {
    setCategory(inputValue?.toLowerCase());
  };

  const handleChangeCategorySelect=(inputValue)=>{
    setCategorySelect(inputValue?.toLowerCase());
  }

  const createServiceFormChange = (e) => {
    const { name, value } = e.target;
    setServiceForm((prevServiceForm) => ({
      ...prevServiceForm,
      [name]: value
    }));
  };

   console.log(service);


  const uploadImage = () => {
    if (imageUpload === null) return;
    setUploadLoading(true);
    const imageRef = ref(storage, `images/${imageUpload + v4()}`);
    // uploadBytes(imageRef, imageUpload).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        // Get the download URL after successful upload
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUploadLoading(false);
        //setUrl(downloadURL)
        setServiceForm((prevState) => {
          return {
            ...prevState, url: downloadURL,
          }
        })
        // Use the downloadURL as needed, such as saving it to a database or displaying it to the user
      })
      .catch((error) => {
        console.error(error);
        setUploadLoading(false);
      });

  }


  const serviceSaveClick = () => {
    if (serviceForm.url !== "" && serviceForm.title !== "" && serviceForm.price !== "" && category !== "") {

      dispatch(createService({
        ...serviceForm,
        "token": user?.token,
        "category": category
      }))
    } else {
      toast.custom(<div style={{
        background: 'orange',
        color: '#fff',
        padding: '12px',
        borderRadius: '4px',
      }}>All fields are required !</div>);
    }
  }



  const imageUploadChange = (event) => {
    console.log("inside imageUploadChange function ", event.target.files[0])
    setImageUpload(event?.target?.files[0])
  }


  React.useEffect(() => {
    if (serviceSuccess === true) {
      toast.success('Saved Successfully !')
      dispatch(serviceReset())
      dispatch(getServices());
      setServiceForm({
        title: "",
        des: "",
        price: "",
        url: "",
        estimatedTime:"",
      });
      setImageUpload(null);
      setCategory("");
    }
  }, [serviceLoading])



  React.useEffect(() => {
    if (serviceErrorMessage === "Not authorized") {
      dispatch(openModal())
      dispatch(userLogout())
      dispatch(serviceReset())
    }
  }, [serviceLoading]);

  React.useEffect(() => {
    dispatch(getServices())
  }, [])



  const updateServiceClick = (_id, url, title, des, price, category,estimatedTime) => {
    //  console.log(_id, url, title, category, price, des)
    setServiceForm(() => {
      return {
        url,
        title,
        price,
        des,
        estimatedTime,
      }
    });
    setCategory(category);
    setServiceId(_id);
  };

  const updateServiceButtonClick = () => {
    if (serviceId !== "" && serviceForm.url !== "" && serviceForm.title !== "" && serviceForm.price !== "" && category !== "") {
      dispatch(updateService({ ...serviceForm, "category": category, "token": user?.token, id: serviceId }))
    } else {
      toast.custom(<div style={{
        background: 'orange',
        color: '#fff',
        padding: '12px',
        borderRadius: '4px',
      }}>All fields are required !</div>);
    }

  }


  React.useEffect(() => {
    if (serviceUpdateSuccess === true) {
      toast.success('Updated Successfully !')
      dispatch(serviceReset())
      dispatch(getServices());
      setServiceId("");
      setServiceForm({
        title: "",
        des: "",
        price: "",
        url: "",
        estimatedTime:"",
      });
      setImageUpload(null);
      setCategory("");
    } else if (serviceErrorMessage === "Not authorized") {
      dispatch(userLogout())
      dispatch(openModal())
      dispatch(serviceReset())
    }
  }, [serviceLoading])


  const deleteIconClick = (id, title) => {
    //console.log(id)
    setServiceDeleteId(id);
    setDeleteTitle(title);
    setOpend(true);

  }



  const servicesDisplay = service?.map((item) => {
    if(categorySelect===""){
      return (
        <ServiceCard key={item._id} {...item}
          updateServiceClick={updateServiceClick}
          deleteIconClick={deleteIconClick}
           />
      )
    }else if(categorySelect && categorySelect!==""){
      if(categorySelect===item.category){
        return (
          <ServiceCard key={item._id} {...item}
          updateServiceClick={updateServiceClick}
          deleteIconClick={deleteIconClick}
           />
        )
      }
    }
   
  });


  const handleClosed = () => {
    setOpend(false);
  };

  const deleteServiceButtonClick = () => {
    const token = user?.token;
    const id = serviceDeleteId;
    setOpend(false);
    dispatch(deleteService({ token, id }))
  }

  React.useEffect(() => {
    if (serviceDeleteSuccess === true) {
      toast.success('Deleted Successfully !')
      dispatch(serviceReset());
      dispatch(getServices());
      setDeleteTitle("");
      setServiceDeleteId('');
      setServiceForm({url:"",title:"",des:"",price:"",estimatedTime:"",})
      setCategory("")
    }else if(serviceErrorMessage==="Not authorized"){
      dispatch(userLogout())
      dispatch(openModal())
      dispatch(serviceReset())
    }
  }, [serviceLoading])

console.log(serviceForm);





  return (
    <>
      <main className='service' >

        <div style={{ width: "100%", display: "flex", marginTop: "30px", marginBottom: "30px", flexDirection: screen < 805 ? "column" : "row" }}>

          <section style={{ width: screen < 805 ? "100%" : "40%" }}>

            <div id="update-input-box" style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
              <div >
                <p style={{
                  marginBottom: "3px", fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "bold", letterSpacing: "2px"
                }}>Choose the category</p>

                <AutoComplete
                  style={{
                    width: screen < 430 ? "90vw" : 300,
                    marginBottom: "10px"
                  }}
                  options={options}
                  value={category}
                  onChange={handleChangeCategory}
                  placeholder="Choose the category"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </div>
              <div >
                <p style={{
                  marginBottom: "3px",
                  fontSize: "1.2rem", fontFamily: "'Poppins', sans-serif", fontWeight: "bold", letterSpacing: "2px"
                }}>Title</p>
                <Input
                  name="title"
                  onChange={createServiceFormChange}
                  value={serviceForm.title}
                  style={{
                    width: screen < 430 ? "90vw" : 300,
                    marginBottom: "10px"
                  }}
                  placeholder="Title" />
              </div>

              <div >
                <p
                  style={{
                    marginBottom: "3px",
                    fontSize: "1.2rem", fontFamily: "'Poppins', sans-serif", fontWeight: "bold", letterSpacing: "2px"
                  }}>
                  Description</p>
                <TextArea
                  onChange={createServiceFormChange}
                  value={serviceForm.des}
                  name="des"
                  style={{
                    width: screen < 430 ? "90vw" : 300,
                    marginBottom: "10px"
                  }}
                  rows={4} placeholder="Description" />
              </div>
              <div >
                <p
                  style={{
                    marginBottom: "3px", fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.2rem", fontWeight: "bold", letterSpacing: "2px"
                  }}>
                  Price</p>

                <Input
                  onChange={createServiceFormChange}
                  value={serviceForm.price}
                  name="price"
                  style={{
                    width: screen < 430 ? "90vw" : 300,
                    marginBottom: "10px"
                  }}
                  type="number"
                  placeholder="Price" />
              </div>
              <div >
                <p
                  style={{
                    marginBottom: "3px", fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.2rem", fontWeight: "bold", letterSpacing: "2px"
                  }}>
                  Estimated Time</p>

                <Input
                  onChange={createServiceFormChange}
                  value={serviceForm.estimatedTime}
                  name="estimatedTime"
                  style={{
                    width: screen < 430 ? "90vw" : 300,
                    marginBottom: "10px"
                  }}
                  
                  placeholder="Estimated Time" />
              </div>



              <div style={{ marginTop: "30px", marginBottom: "40px" }}>
                <label className="image-upload-service" onClick={() => setServiceForm((prevState) => {
                  return {
                    ...prevState, url: "",
                  }
                })}>
                  <input type="file" onChange={imageUploadChange}
                  />
                  Choose an image
                </label>
              </div>

              {imageUpload && <p style={{ overflow: "auto", maxWidth: "90%", marginBottom: "20px" }}>
                {imageUpload?.name}</p>}

              {serviceForm.url === "" && <button className="button-upload-service"
                onClick={uploadImage}
                style={{ marginBottom: "20px" }}>
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">UPLOAD</span>
                </span>
              </button>}

              {serviceId === "" && <button className="save-service" onClick={serviceSaveClick}
                style={{ marginTop: "10px", marginBottom: "20px", cursor: "pointer", }}>
                <span className="save-service-span" style={{
                  fontFamily: " 'Ubuntu', sans-serif ",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                }}>
                  SAVE
                </span>
              </button>}

              {serviceId !== "" && <button className="save-service" onClick={updateServiceButtonClick}
                style={{ marginTop: "10px", marginBottom: "20px", cursor: "pointer", }}>
                <span className="save-service-span" style={{
                  fontFamily: " 'Ubuntu', sans-serif ",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                }}>
                  UPDATE
                </span>
              </button>}


            </div>

          </section>





          <section style={{ width: screen < 805 ? "100%" : "60%", }}>
            <div style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: screen < 805 ? "center" : "center"
            }}>
              <img
                style={{

                  width: serviceForm?.url === "" ? "60%" : "90%",
                  borderRadius: "10px",
                  marginTop: "1rem",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }} src={serviceForm?.url === "" ? emptyImage : serviceForm?.url} />
            </div>
          </section>

        </div>

      {service?.length>=1 &&  <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"30px",width:"100%",}}>
         <p style={{fontSize:"1.5rem",letterSpacing:"3px",fontWeight:"bold",fontFamily:" 'Ubuntu', sans-serif"  }}>You have added {service?.length} services</p> 
        </div>}

        <div style={{width:"100%",justifyContent:"center",display:"flex",marginTop:"40px",marginBottom:"20px"}}>
          <div>
          <p style={{
                  marginBottom: "3px", fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: "bold", letterSpacing: "2px"
                }}>Choose the category</p>

                <AutoComplete
                  style={{
                    width: screen < 430 ? "90vw" : 300,
                    marginBottom: "10px"
                  }}
                  options={options}
                  value={categorySelect}
                  onChange={handleChangeCategorySelect}
                  placeholder="Choose the category"
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
          </div>
       
        </div>

        <div style={{display:"flex",flexDirection:"column",alignItems:"center",}}>
          {servicesDisplay}
        </div>

      </main>



















      <Backdrop
        sx={{ color: '#fff' }}
        open={uploadLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>


      <Backdrop
        sx={{ color: 'gold' }}
        open={serviceLoading}
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
            fontSize: "30px",
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
              fontSize: "22px",
              letterSpacing: "2px"
            },
          },



        }}
      />



      <Dialog
        open={opend}
        onClose={handleClosed}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >

        <DialogContent>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
            <p style={{
              fontSize: "2rem",
              fontWeight: "bold", letterSpacing: "2px", marginBottom: "6px",
              fontFamily: " 'Ubuntu', sans-serif", color: "black",
            }}>Delete service ?</p>
            <p style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              letterSpacing: "2px", marginBottom: "2px",
              fontFamily: "'Poppins', sans-serif",
              color: "#6f7075",
            }}>Are you sure you want to delete "<span style={{ fontWeight: "bold", fontSize: "1.3rem", color: "black", }}>{deleteTitle}</span>" ?</p>
            <p style={{
              fontSize: "1.2rem",
              letterSpacing: "2px",
              fontWeight: "bold",
              fontFamily: "'Poppins', sans-serif",
              color: "#6f7075",
            }}>You can't undo this action</p>

          </div>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClosed}
            variant="contained" >
            <p style={{
              fontSize: "1rem", letterSpacing: "2px",
              fontFamily: " 'Ubuntu', sans-serif",
            }}>
              Cancel</p></Button>

          <Button onClick={deleteServiceButtonClick}
            variant="contained"
            color="error"
           
          >

            <div style={{ display: "flex", alignItems: "center" }}>
              <DeleteForeverIcon />
              <p style={{
                marginLeft: "3px",
                fontSize: "1rem",
                letterSpacing: "2px",
                fontFamily: " 'Ubuntu', sans-serif",
              }}>Delete</p>
            </div>
          </Button>
        </DialogActions>
      </Dialog>
    </>


  )
}

export default Service