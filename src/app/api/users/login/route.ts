import {connect} from "@/db/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "@/models/userModel"

connect();

export async function POST(request: NextRequest)
{
   try{
    const reqBody = await request.json();
    const {email, password} = reqBody;

    // empty check
    if(!email || !password)
    {
        return NextResponse.json("Please fill all the details!!");
    }

    // finding user
    const userExists = await User.findOne({email});

    if(!userExists)
    {
        return NextResponse.json("Account not found, please signup!");

    }
    console.log(userExists);

    // valid check
    const isValidPassword = await bcryptjs.compare(userExists.password, password);

    if(!isValidPassword)
    {
        return NextResponse.json("Password didn't matched!", {status: 400});
    }
    console.log(userExists);

    // token generation
    const payload = {
        id: userExists._id,
        email: userExists.email
    }
    const token =  jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: "1d" });

    const response =  NextResponse.json({
        message:"Login successful.",
        success: true
    })

    response.cookies.set("token", token, {httpOnly: true});

    return response;

   }catch(error){
    console.log(error);
    return NextResponse.json("Internal server error", {status: 500});
   }

}

