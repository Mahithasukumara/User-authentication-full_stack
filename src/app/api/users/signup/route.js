import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextResponse,NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import  axios from "axios";
connect()
export async function POST(request){
    try{
       
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        console.log("from route",reqBody);

        
        if(!username || !email || !password){
            console.log("fill the fields")
            return NextResponse.json({
                error:"Please fill all the fields",
            },{status:400})
        }
        const user=await User.findOne({email});
        if (user){
            console.log("already exists")
            return NextResponse.json({
                error:"User already exists",
            },
        
            {status:400})
        }
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        const newUser=new User({
            username,email,password:hashedPassword,
        })
        const savedUser=await newUser.save();
        console.log(savedUser);
        return NextResponse.json({
            message:"User successfully Created",
            success: true,
            usersaved_data:savedUser,
        },{status:201})

    }
    catch(error){
        return NextResponse.json({
            error:"Some error occured: "+error.message,
        },{status:500})
    }
}