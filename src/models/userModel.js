import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
        username:{
            type:String,
            required:[true,"Please Enter your username"],
            unique:true,
        },
        email:{
            type:String,
            required:[true,"Please Enter your email"],
            unique:true,
        },
        password:{
            type:String,
            required:[true,"Please Enter your Password"],
          
        },
        isVerified:{
            type:Boolean,
            default:false,
        },
        isAdmin:{
            type:Boolean,
            default:false,
        },
        forgetPasswordToken:String,
        forgetpasswordTokenExpiry:Date,
        verifyToken:String,
        verifyTokenExpiry:Date,

})
const User=mongoose.models.users||mongoose.model("users",userSchema);
export default User;