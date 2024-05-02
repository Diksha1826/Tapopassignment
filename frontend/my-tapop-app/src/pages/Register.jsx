import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast , ToastContainer } from 'react-toastify'; 
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import logo from '../assets/logo.svg'
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from '../utils/firebaseconfig';


export const Register = () => {

    const [formValues , setFormValues] = useState({
        email: "" ,
        password: "",
        phonenumber: "",
        username: "",
    })
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        try {
            e.preventDefault();
            const {email , password ,  phonenumber ,  username } = formValues;
            console.log(email , password ,  phonenumber ,  username );
            await createUserWithEmailAndPassword(firebaseAuth , email , password);
           const response =   await  axios.post("/api/users/register-user" , formValues ); 
           if(response.status === false){
            toast.error(response.msg , toastOptions);
            }    
            if(response.status === true){
                navigate("/");
            }    
        } catch (error) {
                toast.error(error.message , toastOptions);
        }
    }

    onAuthStateChanged(firebaseAuth , (currentUser)=>{
        if(currentUser) navigate("/")
    })

    const  handleChange = (e)=>{
            setFormValues({
            ...formValues ,
            [e.target.name]: e.target.value ,
           })
        }

    const toastOptions = {
        position: 'bottom-right' ,
        autoClose: 8000 ,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };


  return (
    <>
    <div className='flex flex-col gap-4 h-lvh w-lvw justify-center items-center bg-background'>
        <form className=' flex flex-col px-20 py-12 gap-8 w-1/3' onSubmit={(e)=> handleSubmit(e)} >
             <div className="flex items-center gap-4 justify-center">
                <img className='h-20 ' src={logo} alt="logo" />
                <h1 className='font-bold text-xl' >TAPOP</h1>
             </div>
             <input  type="text" 
             placeholder='Username' 
             name='username' 
             onChange={(e) => handleChange(e)} />
             <input type="email" 
             placeholder='Email' 
             name='email' 
             onChange={(e) => handleChange(e)} />
             <input type="password" 
             placeholder='Password' 
             name='password' 
             onChange={(e) => handleChange(e)} />
             <input type="number" 
             placeholder='Phone number' 
             name='phonenumber' 
             onChange={(e) => handleChange(e)} />
             <button  type='submit'>Create User</button>
             <span className='-mt-5'>
                Alredy have an account ? <Link to={"/login"}>Login</Link>
            </span>
        </form>
    </div>
    <ToastContainer />
    </>
  )
}
