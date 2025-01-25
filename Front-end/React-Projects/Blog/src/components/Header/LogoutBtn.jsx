import React, { useEffect } from "react";
import authService from '../../appwrite/auth'
import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        authService.logout()
        .then(()=>{
            dispatch(logout());
            navigate('/');
        })
        .catch(error => {
            console.error('Failed to log out:', error.message);
        });
    }
    return(
        <button 
         className='px-2 py-1 md:text-base text-xs font-bold rounded-lg hover:bg-white hover:text-black duration-200 transition-all'
         onClick={handleLogout}
         >Logout</button>
    )
}

export default LogoutBtn;