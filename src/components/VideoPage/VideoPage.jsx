import React from 'react';
import "./VideoPage.css";
import { useSelector,useDispatch } from 'react-redux';
import { getVideo } from '../../features/videoSlice';
import ReactPlayer from 'react-player';

const VideoPage = () => {
    const dispatch=useDispatch();
    const {videoArray}=useSelector((state)=>state.video);
    const {screen}=useSelector((state)=>state.user);
    const [data,setData]=React.useState([]);

    React.useEffect(()=>{
dispatch(getVideo())
    },[]);

    React.useEffect(()=>{
        let newArray=[]
     for(let i=videoArray?.length-1;i>=0;i--){
            newArray.push(videoArray[i]);
     }
     setData([...newArray])
    },[videoArray])
  return (
    <div className="video-page">

{videoArray?.length>=1 && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"1.5rem"}}>
<p style={{letterSpacing:"0.1rem",fontSize:"2rem",
fontFamily:" 'Ubuntu', sans-serif", }}>Our Work</p>
</div>}


       {videoArray?.length>=1 && <div style={{width:"100%",display:"flex",flexDirection:"column",
alignItems:"center",marginTop:"2rem",padding:"0 1.5rem 2rem 1.5rem",marginBottom:"2rem"}} >
{
  data?.map((item)=>{
    return (
      <div style={{width:screen<850?"100%":"800px",marginBottom:"2.5rem",padding:"1rem",
      boxShadow:" rgba(0, 0, 0, 0.35) 0px 5px 15px  ",borderRadius:"8px"  }} key={item?._id}>
      <ReactPlayer url={item?.url} controls width="100%" height="auto" />
     {item?.title!=="" && <div style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"0.5rem"}}>
      <p >{item?.title}</p>
      </div>}
     
      
      </div>
    )
  })
}
</div>}
        </div>
  )
}

export default VideoPage