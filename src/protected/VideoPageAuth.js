import React from "react";

import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { getVideo } from "../features/videoSlice";


const VideoPageAuth=()=>{
    const dispatch=useDispatch();
    const location=useLocation()
const {user}=useSelector((state)=>state.user)
const {videoArray}=useSelector((state)=>state.video);


React.useEffect(()=>{
dispatch(getVideo);
},[])

return (
    videoArray?.length>=1
    ?<Outlet/>
    :<Navigate to="/" state={{from:location}} replace/>
)

}


export default VideoPageAuth;