import React from 'react';
import "./Video.css";
import { getStorage, ref, uploadString, getDownloadURL,uploadBytes ,put,uploadTask,deleteObject} from 'firebase/storage';
import { nanoid } from 'nanoid';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ReactPlayer from 'react-player'; 
import { storage } from '../../firebaseConfig';
import { createVideo, deleteVideo, getVideo, videoReset } from '../../features/videoSlice';
import {useSelector,useDispatch} from "react-redux";
import { openModal, userLogout } from '../../features/userSlice';
import {Input} from "antd";
import toast, { Toaster } from "react-hot-toast";



const Video = () => {

  const dispatch=useDispatch();
  const {screen,user}=useSelector((state)=>state.user);

  const {videoLoading,videoErrorMessage,
    videoCreatingSuccess,videoDeleteSuccess,videoArray}=useSelector((state)=>state.video);

const [fileName,setFileName]=React.useState("")
  const [selectedFile,setSelectedFile]=React.useState(null);
  const [videoUrl,setVideoUrl]=React.useState("");
  const [loading,setLoading]=React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [title, setTitle] = React.useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setTitle(value);
  };

  React.useEffect(()=>{
       dispatch(getVideo())
  },[]);


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if(file){
      setFileName(file?.name)
    }else if(!file){
      setFileName("");
    }
   
  };

  // console.log(selectedFile,fileName,videoUrl);
  

  const handleUploadVideo = async () => {
    if (!selectedFile) {
      return;
    }

    if (selectedFile) {
      setLoading(true);
      try {
        
        const uniqueFileName = `${nanoid()}-${selectedFile?.name}`;
        const storageRef = ref(storage, `videos/${uniqueFileName}`);
        await uploadBytes(storageRef, selectedFile);
        const downloadURL = await getDownloadURL(storageRef);
        // console.log('Download URL:', downloadURL);
        setVideoUrl(downloadURL);
        setLoading(false)
      } catch (error) {
        console.error('Error uploading video:', error);
        setLoading(false)
      }
    } else {
      // console.log('No file selected.');
      setLoading(false)
    }
  };

  const videoSaveClick=()=>{
    if(videoUrl!=="" && user?.token!==""){
      const object={
        "url":videoUrl,
        "token":user?.token,
        "title":title,
      };
      dispatch(createVideo(object))
    }
  };


React.useEffect(()=>{
if(videoLoading===false){
  if(videoErrorMessage==="" && videoCreatingSuccess===true){
    dispatch(getVideo());
     setVideoUrl("");
     setFileName("");
     setTitle("");
     setSelectedFile(null);
    dispatch(videoReset());
    toast.success("Successfully Saved !")
  }else if(videoErrorMessage==="Not authorized"){
   dispatch(openModal());
    dispatch(userLogout());
     dispatch(videoReset());
    
  }
}
  },[videoLoading])

  
const deleteClick=async(data)=>{
  // console.log(data)
  const {url}=data;
  if(url && url!==""){
    try {
      setLoading(true);
      // Get the file name from the URL
      const fileName = decodeURIComponent(url.split('%2F')[1].split('?')[0]);
  // console.log("file Name ",fileName);
      // Create a reference to the file in Firebase Storage
      const storageRef = ref(storage, `videos/${fileName}`);
  
      // Delete the file
      await deleteObject(storageRef);
      const object={
        id:data?._id,
        token:user?.token,
      }
      dispatch(deleteVideo(object))
      
      setLoading(false);
  
      // console.log('File deleted successfully.');
    } catch (error) {
      // console.error('Error deleting file:', error);
      setLoading(false);
    }
  }
 
}

React.useEffect(()=>{
if(videoLoading===false){
  if(videoErrorMessage=="" && videoDeleteSuccess===true){
    dispatch(getVideo());
    toast.success("Deleted Successfully !");
    dispatch(videoReset());
  }
}
},[videoLoading])



// console.log(fileName)
  return (
    <>
    <div className='video'>

      <div style={{width:"100%",display:"flex",alignItems:"center",
      justifyContent:"center",padding:"0 1.5rem 0 1.5rem",
      marginTop:"2rem"}}>
<Input placeholder="Title" style={{width:"400px"}}   value={title}
        onChange={handleInputChange} />
      </div>


        <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2.5rem"}}>
        <label onChange={handleFileSelect} className="custom-file-upload">
    <input type="file"/>
    Choose video
</label>

        </div>

{fileName!=="" && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2rem",padding:"0 1.5rem 0 1.5rem"}}>
<p style={{overflowX:"auto"}}>{fileName}</p>
</div>}

{videoUrl==="" && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2rem"}}>
<button onClick={handleUploadVideo} className='upload-button'>UPLOAD</button>
</div>}

{/* <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2rem",padding:"0 2rem 0 2rem" }}>
          <progress value={uploadProgress} max="100" style={{marginRight:"1rem",height:"2rem",width:"100%"}}/>
          <p style={{fontSize:"1.5rem"}}>{uploadProgress.toFixed(2)}%</p>
        </div> */}


{videoUrl!=="" && <div  style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2rem",padding:"0 1.5rem 2rem 1.5rem"}}>
  <div style={{width:screen<850?"100%":"800px",}}>
  <ReactPlayer url={videoUrl} controls width="100%" height="auto" />
  <div style={{width:"100%",display:"flex",alignItems:"center", 
  justifyContent:"flex-end",}}>
    <div style={{overflowX:"auto",maxWidth:"800px"}}>
    <p >{title}</p>
    </div>
 
  </div>

  </div>

</div>}

{videoUrl!=="" && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2rem",}}>
  <button className="save-button" onClick={videoSaveClick}>SAVE</button>
</div>}

{videoArray?.length>=1 && <div  style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"4rem",padding:"0 1.5rem 2rem 1.5rem"}}>
<p style={{fontSize:"1.5rem",letterSpacing:"0.1rem",fontFamily:"'Poppins', sans-serif ",}}>Videos you have added</p>
</div>}


{videoArray?.length>=1 && <div style={{width:"100%",display:"flex",flexDirection:"column",
alignItems:"center",marginTop:"2rem",padding:"0 1.5rem 2rem 1.5rem"}} >
{
  videoArray?.map((item)=>{
    return (
      <div style={{width:screen<850?"100%":"800px",marginBottom:"2.5rem",padding:"1rem",
      boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px  ",borderRadius:"8px"  }} key={item?._id}>
      <ReactPlayer url={item?.url} controls width="100%" height="auto" />
     {item?.title!=="" && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"0.5rem"}}>
      <p >{item?.title}</p>
      </div>}
      <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"0.5rem"}}>
      <button className="delete-btn" onClick={()=>deleteClick(item)}>DELETE</button>
      </div>
      
      </div>
    )
  })
}
</div>}


    </div>




    <Backdrop sx={{ color: "gold" }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>


      <Backdrop sx={{ color: "blue" }} open={videoLoading}>
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


    </>
  )
}

export default Video