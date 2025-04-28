import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextResponse,NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
// import  axios from "axios";
connect()

export async function POST(request){
    try{
       const reqBody=await request.json();
       const {email,password}=reqBody;
       console.log("from route from login",reqBody);

       if (!email ||!password){
        return NextResponse.json(
           {error:"Enter all fields"},{status:400},
        )
       }
       const user=await User.findOne({email})
       if (!user){
        return NextResponse.json(
            {error:"User does not exist signup first"
        },{status:400},
        )
       }
       const checkPasswordValid= await bcryptjs.compare(password,user.password);
       if(!checkPasswordValid){
        return NextResponse.json({
            error:"password incorrect"
        },{status:400},)
       }
        const tokenData={
        id:user._id,
        username:user.username,
        email:user.email

       }
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})
        const response=NextResponse.json(
            {
                message:"User login successfull",
                success:true,
            }
        )
        response.cookies.set("tokenbrowser",token,
           { httpOnly:true},
        )
        return response;

      

    }
    catch(error){
        return NextResponse.json(
           { error:"some error occured during login:"+error.message},
            {status:500},
        )
    }

}