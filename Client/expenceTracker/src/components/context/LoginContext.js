import { createContext,useContext } from "react";


export const LoginContext=createContext({
    // todos:[
    //     {
    //         id:1,
    //         todo:"todo msg",
    //         completed:false
    //     }
    // ],
    Login:()=>{},
    
    Logout:()=>{},
    
});


export const LoginProvider=LoginContext.Provider;

export  const useLogin=()=>{
    return useContext(LoginContext);
}