'use client';
import React,{useState,useEffect} from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast";


function LoginPage(){
    const router=useRouter()
    const[user,setUser]=React.useState({
       email:"",
       password:"",
       
    })
    const [buttonEnabled,setButtonEnabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const onLogin=async ()=>{
        try{
            setLoading(true)
            const response= await axios.post("/api/users/login",user)
            console.log("Login success",response.data);
            toast.success("Login success");
            router.push("/profile");
            
            
        }
        catch(error){
            console.log("Login failed",error);
          
             const errorMessage = error?.response?.data?.error || "Something went wrong!";
             console.log(errorMessage);
             toast.error(error.message);

        }
        finally{
            setLoading(false);
        }

        
    }
    useEffect(()=>{
        if (user.email.length>0 && user.password.length>0){
           setButtonEnabled(true);
        }
    },[user])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />

         <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">{loading?"Processing Page":"Login"}</h1>
                <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <label htmlFor="password" className="block text-gray-700 mb-2">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button onClick={onLogin} 
                className="w-full rounded-md p-2 mt-5 bg-black text-white hover:bg-gray-800 cursor-pointer  ">
                    {buttonEnabled?"Login here":"Enter all fields"}</button>
             <Link href="/signup" 
                      className="mt-5 text-blue-400 text-center block underline ">Signup here</Link>
           
            </div>
        </div>
    )
}
export default LoginPage
