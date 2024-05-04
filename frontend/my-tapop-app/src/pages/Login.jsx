import React, { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../assets/logo.svg";
import {signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth ,  provider  } from "../utils/firebaseconfig";



export const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formValues;
      toast.loading("Loading ..." , {theme: "dark" , position:"top-right"})
      const response = await axios.post(
        "http://localhost:5000/api/users/login-user",
        formValues
      );
      if (response.data.success === false) {
        toast.error(response.data.message, toastOptions);
      }
      if (response.data.success === true) {
        await signInWithEmailAndPassword(firebaseAuth, email, password);
        localStorage.setItem(
          "tapopuseremail",
          JSON.stringify(response.data.user.email)
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };



  const handleGoogle = async(e)=>{
    e.preventDefault();
   const data =  await signInWithPopup(firebaseAuth , provider)
  //  console.log(data);
    localStorage.setItem("tapopuseremail" , JSON.stringify(data.user.email))

    toast.loading("Loading ..." , {theme: "dark" , position:"top-right"})

    const responseofgoogle = await axios.post(
      "http://localhost:5000/api/users/register-user-google",
      ({email: data.user.email , username: data.user.displayName})
    );

    const response = await axios.post(
      "http://localhost:5000/api/users/get-current-user",
      ({email: data.user.email})
    );
    if (response.data.success === false) {
      toast.error(response.data.message, toastOptions);
    }
    if (response.data.success === true) {
      navigate("/");
    }
  }



  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <>
      <div className="flex flex-col gap-4 h-lvh w-lvw justify-center items-center bg-background">
        <form
          className=" flex flex-col px-20 py-12 gap-8 w-1/3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex items-center gap-4 justify-center">
            <img className="h-20" src={logo} alt="logo" />
            <h1 className="text-xl font-bold ">Tapop</h1>
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login User</button>
          <span className="-mt-5">
            Don't have an account ? <Link to={"/register"}>Register</Link>
          </span>
          <button onClick={(e)=>handleGoogle(e)}>Signin With Google</button>

        </form>
      </div>
      <ToastContainer />
    </>
  );
};
