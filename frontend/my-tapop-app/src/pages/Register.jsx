import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../assets/logo.svg";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseconfig";

export const Register = () => {
  const [file, setFile] = useState();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    phonenumber: "",
    username: "",
    country: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username" , formValues.username);
      formData.append("password", formValues.password);
      formData.append("email", formValues.email);
      formData.append("phonenumber", formValues.phonenumber);
      formData.append("country", formValues.country);
      formData.append("gender", formValues.gender);

      toast.loading("Loading ..." , {theme: "dark" , position:"top-right"})
      const response = await axios.post(
        "http://localhost:5000/api/users/register-user",
        formData 
      );
      if (response.data.success === false) {
        toast.error(response.data.message, toastOptions);
      }
      if (response.data.success === true) {
        const { email, password } = formValues;
        await createUserWithEmailAndPassword(firebaseAuth, email, password);
        localStorage.setItem(
          "tapopuseremail",
          JSON.stringify(response.data.newUser.email)
        );
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate("/");
    });
  }, []);

    function handleImageChange(e) {
        setFile(e.target.files[0]);
    }

  

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center bg-background">
        <form
          className=" flex flex-col px-20 py-12 gap-4 w-1/3"
          onSubmit={(e)=>handleSubmit(e)}
        >
          <div className="flex items-center gap-4 justify-center">
            <img className="h-20 " src={logo} alt="logo" />
            <h1 className="font-bold text-xl">TAPOP</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
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
          <input
            type="number"
            placeholder="Phone number"
            name="phonenumber"
            onChange={(e) => handleChange(e)}
          />
          <div>
            <h2 className="mb-1 font-semibold" >Gender</h2>
          <div className="flex w-3 h-4 items-center gap-1 mb-1">
          <input className="w-3" type="radio" name="gender" onChange={(e)=>handleChange(e)} /> <label>Male</label>
          </div>
          <div className="flex w-3 h-4 items-center gap-1">
          <input className="w-3" type="radio" name="gender" onChange={(e)=>handleChange(e)} /> <label>Female</label>
          </div>
          </div>
          <div>
            <select name="country" style={{color:"gray"}} className="rounded h-7 w-full" onChange={(e)=>handleChange(e)}>
              <option value="">--choose country--</option>
              <option value="Australia">Australia</option>
              <option value="Brazil">Brazil</option>
              <option value="Canada">Canada</option>
              <option value="China">China</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="India">India</option>
              <option value="Italy">Italy</option>
              <option value="Japan">Japan</option>
              <option value="Russia">Russia</option>
              <option value="Spain">Spain</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>
          <input name="profilepic" type="file" onChange={(e)=>handleImageChange(e)} placeholder="profile picture" />
          <button type="submit">Create User</button>
          <span className="-mt-3">
            Alredy have an account ? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};
