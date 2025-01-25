import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { login, logout } from '../features/authSlice';
import { Input } from './index';
import databaseService from '../appwrite/database';
import { getAllPosts } from '../features/postSlice';


// auth.js error

function Signup(){
    const {register, handleSubmit, formState:{errors}} = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const signup = async({email, password, name})=>{
        // Create a account
        // console.log(email, password);
        setIsSubmitting(true);
        
        try{
            const account = await authService.createAccount({email, password, name});
            if(account){
              // console.log('hello');
              
                let user = await authService.getUser();
                if(user){
                    dispatch(login(user));
                  }else{
                    dispatch(logout());
                    setError("Failed to get user data after signup");
                  }
                }
                navigate('/');
        }catch(err){
            setError(err.message);
        }finally{
          isSubmitting(false);
        }
    }

    return (
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Signup</h1>
            </div>
            <form onSubmit={handleSubmit(signup)} className="divide-y divide-gray-200">
              {error && <div className="text-red-700 text-sm">{error}</div>}
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <Input 
                placeholder="Full Name" 
                label={"Full Name"} 
                type={"text"}
                {...register("name", {
                    required: {
                      value: true,
                      message: "Please Enter your name"
                    },
                })}
                />
                {errors.email && <p className="text-red-700 text-sm">{errors.email.message}</p>}
                <Input 
                placeholder="Email" 
                label={"Email"} 
                type={"text"}
                {...register("email", {
                    required: {
                      value: true,
                      message: "Please enter a email address"
                    },
                    validate:{
                        matPatren:(value)=>/^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(value)||"Email is not valid!"
                    }
                })}
                />
                {errors.email && <p className="text-red-700 text-sm">{errors.email.message}</p>}
                <Input 
                placeholder="Password" 
                label={"Passsword"} 
                type={"password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter a password"
                  },
                  minLength:{
                    value: 8,
                    message: "Password must be at least 8 characters long"
                  },
                  maxLength:{
                    value: 30,
                    message: "Password must be at most 30 characters long"
                  }
                })}
                />
                {errors.password && <p className="text-red-700 text-sm">{errors.password.message}</p>}
                <div className="relative">
                  <button className={`${!isSubmitting?"bg-purple-400": "bg-purple-300"} text-white rounded-md px-2 py-1`} type="submit">{isSubmitting?"Submitting...": "Submit"}</button>
                </div>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
        )
}

export default Signup;
