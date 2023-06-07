import { useLocation,Navigate,Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequiredAuth=()=>{
    const location=useLocation()
const {user}=useSelector((state)=>state.user)

return (
    !user
    ?<Outlet/>
    :<Navigate to="/" state={{from:location}} replace/>
)

}


export default RequiredAuth;