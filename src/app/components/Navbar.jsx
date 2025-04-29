'use client';
import {useRouter} from "next/navigation";
import axios from "axios"
import Link from "next/link"
import {toast} from "react-hot-toast";
export default function Navbar(){
    const router=useRouter();
    const handleLogout=async()=>{
        try{
            const res=await axios.get('/api/users/logout');
            console.log(res)
            toast.success("Logout success");
            router.push('/login')

        }
        catch(error){
            console.log("logout failed")
            toast.error(error.message)
        }
    }
    return(
        <nav className="bg-blue-900 flex px-8 py-2 justify-between ">
           <div className="text-2xl text-white font-bold ">Profile  </div>
            <button onClick={handleLogout}
            className="bg-red-400 text-white hover:bg-red-600 px-4 py-2 rounded">
                Logout
            </button>
        </nav>
    );
}