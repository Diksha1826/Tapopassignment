import React from "react";
import logo from "../assets/logo.svg";
import { FaPowerOff } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebaseconfig";

export const Navbar = ({userData}) => {
  return (
    <div
      style={{ background: "black" }}
      className="flex justify-between bg-gray-400 h-20 items-center p-6 "
    >
      <div>
        <img className="h-12" src={logo} alt="logo" />
      </div>
      <div className="flex justify-between w-1/4 items-center">
        <span>About us</span>
        <span>Contact us</span>
        <span>Settings</span>
      </div>
      <div className="flex justify-evenly w-1/12 items-center">
        <img className="h-9 w-9 rounded-full hover:h-16  hover:w-16 hover:absolute hover:transition duration-700 ease-in-out" src={userData.profilePic} alt="profilepic" />
        
        <FaPowerOff
          onClick={() => {
            localStorage.removeItem("tapopuseremail");
            signOut(firebaseAuth);
          }}
        />
      </div>
    </div>
  );
};
