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

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseMove = (e, container) => {
    const innerX = e.clientX - container.offsetLeft;
    const innerY = e.clientY - container.offsetTop + scrollY;

    const light = container.querySelector(".light");
    light.style.left = `${innerX}px`;
    light.style.top = `${innerY}px`;
    light.classList.add("light-active");

    const x = container.offsetWidth / 2;
    const y = container.offsetHeight / 2;
    const intensityX = 30;
    const intensityY = 10;

    let convertX = ((innerX - x) * intensityX) / x;
    let convertY = ((innerY - y) * intensityY) / y;

    container.style.transform = `rotateY(${-convertX}deg) rotateX(${convertY}deg)`;
  };

  const handleMouseOut = (container) => {
    const light = container.querySelector(".light");
    light.classList.remove("light-active");
    container.style.transform = "rotateY(0deg)";
  };

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
      // console.log(response);
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
      {userData && (
        <div className="h-screen w-screen bg-background">
          <Navbar userData={userData} />
          <div className="w-full flex flex-col justify-center items-center gap-6 pt-6">
            <p className="text-[20px]">Scan to get user info:</p>
            <img src={src} alt="qrcode" />

            <div
              className="card-container"
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseOut={(e) => handleMouseOut(e.currentTarget)}
            >
              <div className="card">
                <div>
                  <span className="light"></span>
                  <img src={userData.profilePic} id="image" alt="pic" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};
