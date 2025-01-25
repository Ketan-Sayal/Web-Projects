import { useEffect, useState } from 'react'
import {PulseLoader} from "react-spinners";
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import {getAllPosts} from './features/postSlice';
import databaseService from './appwrite/database';


function App() {
  const override={
    display: "block",
    border: "5px solid",
    margin: "auto 0",
    borderColor: "black",
    backgroundColor: "purple",
    borderRadius: "50%",
    padding: "10px",
  };

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllData = async ()=>{
      try{
        const currSession = await authService.getCurrentSession();
        if(!currSession){
          const guest = await authService.craeateSession();
        }
        else{
          const user = await authService.getUser();
        // console.log(user);
        // console.log(user);
        
        if(user && user.email){
          // console.log("User already logged in");       
          dispatch(login(user));
      }else{
          dispatch(logout());
      }
        }
      }catch(err){
        dispatch(logout());
        console.log(err);
        throw err;
        
      }finally{
        const posts = await databaseService.listDocuments();
          dispatch(getAllPosts(posts.documents));
        setLoading(false);
      }
    }
    getAllData();
}, []);


  return !loading? (
    <>
    <Outlet/>
    </>
  ):(
    <div className='flex justify-center font-bold w-[100vw] h-[100vh] items-center'>
      <PulseLoader size={100} color={"black"} loading={loading} cssOverride={override}/>
    </div>
  );
}

export default App
