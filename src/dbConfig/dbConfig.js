import mongoose from 'mongoose';
export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        const connection=await mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected");
        })
        connection.on('error',(err)=>{
            console.log("Mongodb connection error:  ",err);
        })


    }
    catch(error){
        console.log("some error occured from dbConfig")
        console.log(error)

    }
}