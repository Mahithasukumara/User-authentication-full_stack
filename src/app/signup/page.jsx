
'use client';
import React,{useEffect} from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast,Toaster} from "react-hot-toast";

function SignUpPage(){
    const router=useRouter();
    const[user,setUser]=React.useState({
           email:"",
           password:"",
           username:"", 
        })
    const [buttonEnabled,setButtonEnabled]=React.useState(false);
    const [loading,setLoading]=React.useState(false);
        const onSignUp=async ()=>{
            try{
                setLoading(true);
                console.log(user)
                const response=await axios.post("/api/users/signup",user);
                console.log("entered data to database:",response.data);
                toast.success("User created successfully. Please login to continue.");
                router.push("/login");
            }catch(error){
                console.log(error);
                if (error.response && error.response.data && error.response.data.error) {
                    // console.log("exists")
                    toast.error(error.response.data.error);
                } else {
                    toast.error("Something went wrong. Please try again.");
                }
                

     
            }finally{
                setLoading(false);
            }
        }
    useEffect(()=>{
        if (user.username.length>0 && user.email.length>0 && user.password.length>0){
            setButtonEnabled(true);
        }
        else{
            setButtonEnabled(false);
        }

    },[user])
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <Toaster position="top-center" reverseOrder={false} />

         <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    {loading?"Processing page":"Signup here"}</h1>
                <label htmlFor="username" className="block text-gray-700 mb-2">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
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

                <button onClick={onSignUp} 
                className="w-full rounded-md p-2 mt-5 bg-black text-white hover:bg-gray-800 cursor-pointer  ">
                    {buttonEnabled?"Signup":"Enter all fields"}</button>
             <Link href="/login" 
                      className="mt-5 text-blue-400 text-center block underline ">Login here</Link>
           
            </div>
        </div>
    )
}
export default SignUpPage
