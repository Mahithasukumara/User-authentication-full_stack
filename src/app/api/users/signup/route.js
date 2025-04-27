import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextResponse,NextRequest} from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import  axios from "axios";
connect()
export async function POST(request){
    try{
        console.log(user);
        const reqBody=await request.json();
        const {username,email,password}=reqBody;
        console.log("from route",reqBody);

        
        if(!username || !email || !password){
            return NextResponse.json({
                error:"Please fill all the fields",
            },{status:400})
        }
        const user=await User.findOne({email});
        if (user){
            return NextResponse.json({
                error:"User already exists",
            },{status:400})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
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
    catch(err){
        return NextResponse.json({
            err:"Some error occured: "+err.message,
        },{status:500})
    }
}