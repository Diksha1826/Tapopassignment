import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../utils/firebaseconfig";
import axios from "axios";

export const Home = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getuser() {
      const currentEmail = JSON.parse(localStorage.getItem("tapopuseremail"));
      if (!currentEmail) return navigate("/login");
      const email = { email: currentEmail };
      const response = await axios.post(
        "http://localhost:5000/api/users/get-current-user",
        email
      );
      setUserData(response.data.user);

      onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
      });
    }
    getuser();
  }, []);

  return (
    <>
      <div className="h-lvh w-lvw bg-background">
        {userData && <Navbar userData={userData} />}
      </div>
    </>
  );
};
