import React, { useState } from "react";
import { Input } from "./index";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as loginAuth, logout } from "../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import databaseService from "../appwrite/database";
import { getAllPosts } from "../features/postSlice";

// logs error

export default function Login() {
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const login = async (data) => {
    setErr("");
    setIsSubmit(true);
    try {
      const { email, password } = data;

      // Check if a session exists and logout if needed
      const Currsession = await authService.getCurrentSession();
      if (Currsession) {
        await authService.logout();
      }

      // Create a new session
      const session = await authService.login({ email, password });
      if (session) {
        const user = await authService.getUser();
        if (user && user.email) {
          dispatch(loginAuth(user));
          // Fetch posts after successful login
          const posts = await databaseService.listDocuments();
          dispatch(getAllPosts(posts.documents));
          navigate("/");
        } else {
          dispatch(logout());
          setErr("Failed to retrieve user data. Please try again.");
        }
      } else {
        setErr("Email or password is incorrect.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErr("An error occurred during login. Please try again.");
    }finally{
      setIsSubmit(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <form onSubmit={handleSubmit(login)} className="divide-y divide-gray-200">
              {err && <div className="text-red-700 text-sm">{err}</div>}
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <Input
                  placeholder="Email"
                  label={"Email"}
                  type={"text"}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Please enter an email address"
                    },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address"
                    }
                  })}
                />
                {errors.email && <p className="text-red-700 text-sm">{errors.email.message}</p>}

                <Input
                  placeholder="Password"
                  label={"Password"}
                  type={"password"}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Please enter a password"
                    },
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long"
                    },
                    maxLength: {
                      value: 30,
                      message: "Password must be at most 30 characters long"
                    }
                  })}
                />
                {errors.password && <p className="text-red-700 text-sm">{errors.password.message}</p>}

                <div className="relative">
                  <button className={`${!isSubmit?"bg-purple-400":"bg-purple-300"} text-white rounded-md px-2 py-1`} type="submit">
                   {isSubmit?"Submitting...": "Submit"}
                  </button>
                </div>
                <p className="mt-2 text-center text-base text-black/60">
                  Don't have an account?&nbsp;
                  <Link
                    to="/signup"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
