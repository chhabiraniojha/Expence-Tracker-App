import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ user, children }) => {

    const navigate = useNavigate();
      
      useEffect(()=>{
        if(!user){
        navigate('/signin')
        }
      },[]);
      if(user){
        return (children)
      }
        
  
    

}
export default ProtectedRoute;