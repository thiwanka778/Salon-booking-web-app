import React from 'react';
import "./SliderImages.css"
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import toast, { Toaster } from 'react-hot-toast';
import { v4 } from "uuid";
import {
  createSlider, sliderReset, getSlider, deleteSlider,
} from '../../features/sliderSlice';
import { openModal, userLogout } from '../../features/userSlice';

const SliderImages = () => {
  const [imageUpload, setImageUpload] = React.useState(null)
  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const dispatch = useDispatch();
  const { screen, user } = useSelector((state) => state.user);
  const { sliderLoading, sliderError, sliderSuccess, slider, sliderErrorMessage,
    sliderDeleteSuccess } = useSelector((state) => state.slider);



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
        setUrl(downloadURL)
        // Use the downloadURL as needed, such as saving it to a database or displaying it to the user
      })
      .catch((error) => {
        console.error(error);
        setUploadLoading(false);
      });

  }

  const saveClick = () => {
    if (url !== "" && user !== null) {
      const token = user?.token;
      dispatch(createSlider({ token, url }))
    }
  }

  React.useEffect(() => {
    if (sliderLoading === false && sliderSuccess === true) {
      setUrl("");
      setImageUpload(null);
      dispatch(sliderReset());
      dispatch(getSlider());
      toast.success('Saved Successfully !')
    } else if (sliderLoading === false && sliderError === true && sliderErrorMessage === "Not authorized") {
      dispatch(openModal());
      dispatch(userLogout());
      dispatch(sliderReset());
    }

  }, [sliderLoading])

  React.useEffect(() => {
    dispatch(getSlider());
  }, []);

  const sliderImageDeleteClick = (imageId) => {
    const token = user?.token;
    const id = imageId;
    dispatch(deleteSlider({ token, id }))
  }

  React.useEffect(() => {
    if (sliderDeleteSuccess === true) {
      dispatch(sliderReset());
      dispatch(getSlider());
      toast.success('Deleted Successfully !')
    } else if (sliderLoading === false && sliderError === true && sliderErrorMessage === "Not authorized") {
      dispatch(openModal());
      dispatch(userLogout());
      dispatch(sliderReset());
    }
  }, [sliderLoading])


  const sliderImagesDisplay = slider?.map((item) => {
    return (
      <div key={item._id} style={{
        marginBottom: "40px",
        width: screen < 729 ? "90vw" : "700px",
        padding: "10px",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        borderRadius: "8px",
      }}>
        <img style={{
          width: "100%",
          borderRadius: "8px",
          // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px ",
        }}
          src={item.url} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%", marginTop: "10px" }}>
          <button className="delete-btn"
            onClick={() => sliderImageDeleteClick(item._id)}
          > DELETE
            <span className='delete-span'></span>
          </button>

        </div>
      </div>
    )
  })



  // console.log(imageUpload)

  return (
    <>
      <div className='slider-images'>




        <div className="file-upload">

          <label className="custom-file-upload" onClick={()=>setUrl("")}>
            <input type="file"
              onChange={(event) => { setImageUpload(event.target.files[0]) }} />
            choose a image
          </label>

          {imageUpload && <p style={{
            overflow: "auto",
            maxWidth: "80%",
          }}>{imageUpload?.name}</p>}


          {url !== "" && <img style={{
            width: screen <= 1032 ? "90%" : "60%",
            marginTop: "2rem",
            marginBottom: url !== "" ? "2rem" : "0rem",
            borderRadius: "10px",
          }} src={url} />}

          {url === "" && <button onClick={uploadImage} className="upload-to-firebase">
            UPLOAD
          </button>}


          {url !== "" && <button onClick={saveClick} className='save-btn'> SAVE</button>}
        </div>


        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '50px', }}>
          <p style={{
            marginTop: "10px",
            marginBottom: "15px",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "20px",
            fontWeight: "bold",
          }}>{slider?.length === 0 ? "You have not added images yet !" : "Images You have added"}</p>
          {sliderImagesDisplay}
        </div>




      </div>




      <Backdrop
        sx={{ color: '#fff' }}
        open={uploadLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: '#fff' }}
        open={sliderLoading}
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


    </>
  )
}

export default SliderImages