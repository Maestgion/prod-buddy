import mongoose from "mongoose";

export function connect(){

    try{

       
        mongoose.connect(process.env.DB_URI!);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log(`Mongoose connected`);
            // console.log()
        })

        connection.on('error', (error)=>{
            console.log("Mongoose error connecting" + error);
            process.exit();
        })


    }catch(error:any){
        console.log("something went wrong!");
        console.log(error.message);
    }
}