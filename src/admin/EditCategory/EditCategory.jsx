import React, { useState, useEffect } from "react";
import "./EditCategory.css";
import emptyImage from "../../assets/emptyImage.jpg";
import { Input } from "antd";
import { storage } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { openModal,userLogout } from "../../features/userSlice";
import Categories from "../Categories/Categories";
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
  createCategory,
  getCategory,
  categoryReset,
} from "../../features/categorySlice";
import { v4 } from "uuid";

const { TextArea } = Input;

const EditCategory = () => {
  const dispatch = useDispatch();
  const { screen, user } = useSelector((state) => state.user);
  const [imageUpload, setImageUpload] = React.useState(null);
  const {
    categoryLoading,
    categoryError,
    categorySuccess,
    categoryErrorMessage,
    categoryArray,
    categorySaveSuccess,
  } = useSelector((state) => state.category);

  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [categoryData, setCategoryData] = useState({
    categoryTitle: "",
    categoryDes: "",
    categoryUrl: "",
  });

  React.useEffect(() => {
    dispatch(getCategory());
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const imageUploadChange = (event) => {
    // console.log("inside imageUploadChange function ", event.target.files[0]);
    setImageUpload(event?.target?.files[0]);
  };

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
        // console.log("File available at", downloadURL);
        setUploadLoading(false);
        //setUrl(downloadURL)
        setCategoryData((prevState) => {
          return {
            ...prevState,
            categoryUrl: downloadURL,
          };
        });
        // Use the downloadURL as needed, such as saving it to a database or displaying it to the user
      })
      .catch((error) => {
        console.error(error);
        setUploadLoading(false);
      });
  };

  console.log(categoryData);

  const onSaveClick = () => {
    if (
      categoryData.categoryTitle !== "" &&
      categoryData.categoryDes !== "" &&
      categoryData.categoryUrl !== ""
    ) {
      dispatch(
        createCategory({
          token: user?.token,
          categoryTitle: categoryData.categoryTitle.toLowerCase().trim(),
          categoryDes: categoryData.categoryDes.trim(),
          categoryUrl: categoryData.categoryUrl,
        })
      );
    } else {
      toast.error('All fields are required !')
    }
  };

  React.useEffect(()=>{
if(categoryLoading===false){
  if(categorySaveSuccess===true){
    dispatch(getCategory());
    dispatch(categoryReset());
    setCategoryData({categoryTitle:"",categoryDes:"",categoryUrl:""});
    setImageUpload(null)
    toast.success('Added Successfully !')
  }else if(categoryErrorMessage==="Not authorized"){
       dispatch(userLogout());
       dispatch(openModal())
  }
}
  },[categoryLoading]);

const categoryDisplay=categoryArray?.map((item)=>{
        return(
          <Categories key={item._id} {...item} usersHomePage={false} />
        )
})

  return (
    <>
      <div className="edit-category">
        {/* 779 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "30px",
            flexDirection: screen < 779 ? "column" : "row",
          }}
        >
          <section
            style={{
              width: screen < 779 ? "100%" : "400px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              //  justifyContent: "center",
            }}
          >
            <div>
              <p
                style={{
                  marginBottom: "3px",
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                Category Title
              </p>
              <Input
                value={categoryData.categoryTitle}
                onChange={handleInputChange}
                name="categoryTitle"
                style={{
                  marginBottom: "10px",
                  width: screen < 361 ? "85vw" : "300px",
                }}
                placeholder="Category Title"
              />

              <p
                style={{
                  marginBottom: "3px",
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "bold",
                  letterSpacing: "2px",
                }}
              >
                Category Description
              </p>
              <TextArea
                value={categoryData.categoryDes}
                onChange={handleInputChange}
                rows={4}
                name="categoryDes"
                style={{
                  marginBottom: "10px",
                  width: screen < 361 ? "85vw" : "300px",
                }}
                placeholder="Category Description"
              />
            </div>

            <label
              className="image-upload-service"
              style={{ marginTop: "20px" }}
              onClick={() => {
                setCategoryData((prevState) => {
                  return { ...prevState, categoryUrl: "" };
                });
              }}
            >
              <input type="file" onChange={imageUploadChange} />
              Choose an image
            </label>

            {imageUpload && (
              <p
                style={{
                  overflow: "auto",
                  maxWidth: "90%",
                  marginBottom: "20px",
                  marginTop: "40px",
                }}
              >
                {imageUpload?.name}
              </p>
            )}

            {categoryData?.categoryUrl === "" && (
              <button
                onClick={uploadImage}
                className="button-upload-service"
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                <span className="button_lg">
                  <span className="button_sl"></span>
                  <span className="button_text">UPLOAD</span>
                </span>
              </button>
            )}

            <button
              onClick={onSaveClick}
              className="save-service"
              style={{
                marginTop: "5px",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              <span
                className="save-service-span"
                style={{
                  fontFamily: " 'Ubuntu', sans-serif ",
                  letterSpacing: "2px",
                  fontWeight: "bold",
                }}
              >
                SAVE
              </span>
            </button>
          </section>

          <section
            style={{
              width: screen < 779 ? "100%" : "60%",
              // background:"orange",
              // minHeight:"100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                width: screen < 487 ? "88vw" : "450px",
                borderRadius: "10px",
              }}
              src={
                categoryData?.categoryUrl !== ""
                  ? categoryData?.categoryUrl
                  : emptyImage
              }
            />
          </section>
        </div>

        <div style={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center"}}>
        {categoryDisplay}
        </div>
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
                        style: {
                            fontFamily: " 'Ubuntu', sans-serif ",
                            fontSize: "1rem",
                            letterSpacing: "2px"
                        },
                    },



                }}
            />
   <Backdrop sx={{ color: 'gold' }} open={categoryLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>


      <Backdrop sx={{ color: "#fff" }} open={uploadLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default EditCategory;
