import {connect} from "@/db/dbConfig"
import bcryptjs from "bcryptjs"
import User from "@/models/userModel"
import { NextRequest, NextResponse} from "next/server";

connect();

export async function POST(request: NextRequest)
{
    try{

        const reqBody = await request.json();

        const {name, email, password, cnfPassword} = reqBody;

        // empty check
        if(!name || !email || !password || !cnfPassword)
        {
            return NextResponse.json("Please fill all the details!!");
        }

        // user check
        
        const userExists = await User.findOne({email})

        if(userExists)
        {
            return NextResponse.json(`User with ${email} already exists!`, {status: 409});
        }

        if(password!=cnfPassword)
        {
            return NextResponse.json('passwords do not match', {status: 401})
        }
        
        // hashing
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword= await bcryptjs.hash(password, salt)
        const hashedCnfPassword= await bcryptjs.hash(cnfPassword, salt)

        // creating a user

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            cnfPassword: hashedCnfPassword
        })

        // logging 

        const loggedUser = await newUser.save()

        console.log(loggedUser)

        const response = NextResponse.json({
            message:"Registration successful!",
            success: true,
            loggedUser
        }, {status: 200})

        return response

    }catch(error:any){
        console.log(error.message)
        return NextResponse.json("Internal Server Error", {status: 500})
    }
}