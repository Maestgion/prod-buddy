import mongoose from "mongoose";

export function connect(){
    try{

        mongoose.connect(process.env.DATABASE!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log(`Mongoose connected to ${process.env.DATABASE}`);
        })

        connection.on('error', (error)=>{
            console.log("Mongoose error connecting" + error);
            process.exit();
        })


    }catch(error){
        console.error(error);
        console.log("something went wrong!");

    }
}