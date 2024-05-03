import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebaseconfig";
import { toast, ToastContainer } from "react-toastify";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentuser = JSON.parse(localStorage.getItem("tapopuser"));
    if (currentuser) {
      toast.success(`Welcome ! ${currentuser}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate("/login");
    });
  }, []);

  return (
    <>
      <div className="h-lvh w-lvw bg-background">
        <Navbar />
      </div>
      <ToastContainer />
    </>
  );
};
