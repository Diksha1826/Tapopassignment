import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar } from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { firebaseAuth } from "../utils/firebaseconfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import QRCode from "qrcode";

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [src, setSrc] = useState("");

  const generate = (email) => {
    QRCode.toDataURL(`https://localhost:3000/profile?email=${email}`).then(
      (val) => setSrc(val)
    );
  };

  useEffect(() => {
    async function getuser() {
      const currentEmail =
        searchParams.get("email") ||
        JSON.parse(localStorage.getItem("tapopuseremail"));
      if (!currentEmail) return navigate("/login");
      const email = { email: currentEmail };
      const response = await axios.post(
        "http://localhost:5000/api/users/get-current-user",
        email
      );
      setUserData(response.data.user);
      generate(currentEmail);
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
        {userData && <Navbar userData={userData} />}
        <div className="w-full flex flex-col justify-center items-center gap-6 pt-6">
          <p className="text-[20px]">Scan to get user info:</p>
          <img src={src} alt="qrcode" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
