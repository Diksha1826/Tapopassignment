import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebaseconfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export const Home = () => {
  const [userData , setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   async function getuser(){
    const currentEmail = JSON.parse(localStorage.getItem("tapopuseremail"));
    const email = {email: currentEmail };
    const response = await axios.post("http://localhost:5000/api/users/get-current-user" , email);
    setUserData(response.data.user);
    if (response.data.success) {
      toast.success(`welcome ! ${response.data.user.username}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
    } 
    getuser();
  }, []);


  return (
    <>
      <div className="h-lvh w-lvw bg-background">
        {userData && <Navbar userData={userData} /> } 
      </div>
      <ToastContainer />
    </>
  );
};
