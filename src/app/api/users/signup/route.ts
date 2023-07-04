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
            return NextResponse.json(`User with ${email} already exists!`);
        }

        if(password!=cnfPassword)
        {
            return NextResponse.json('passwords do not match')
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
        })

        return response

    }catch(error){
        console.log(error)
        return NextResponse.json("Internal Server Error", {status: 500})
    }
}