import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({
    children,
    authentication=true,
}){
    const authStatus = useSelector(state=>state.auth.status);
    const navigate = useNavigate();
    useEffect(()=>{
        if(authentication && authentication!==authStatus){
            navigate('/login');
        }else if(!authentication && authStatus!==authentication){
            navigate('/');
        }
    },[])

    return(
        <>
        {children}
        </>
    )
}