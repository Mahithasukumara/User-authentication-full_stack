'use client';
import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import {axios} from "axios";


function LoginPage(){
    const[user,setUser]=React.useState({
       email:"",
       password:"",
       
    })
    const onLogin=async ()=>{
        
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
         <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
                className="w-full rounded-md p-2 mt-5 bg-black text-white hover:bg-gray-800 cursor-pointer  ">Login here</button>
             <Link href="/signup" 
                      className="mt-5 text-blue-400 text-center block underline ">Signup here</Link>
           
            </div>
        </div>
    )
}
export default LoginPage
