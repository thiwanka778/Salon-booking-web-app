import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const VideoPageAuth=()=>{
    const location=useLocation()
const {user}=useSelector((state)=>state.user)
const {videoArray}=useSelector((state)=>state.video);

return (
    videoArray?.length>=1
    ?<Outlet/>
    :<Navigate to="/" state={{from:location}} replace/>
)

}


export default VideoPageAuth;