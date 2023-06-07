import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminAuth=()=>{
    const location=useLocation()
const {user}=useSelector((state)=>state.user)

return (
    (user && user?.userType==="admin")
    ?<Outlet/>
    :<Navigate to="/" state={{from:location}} replace/>
)

}


export default AdminAuth;