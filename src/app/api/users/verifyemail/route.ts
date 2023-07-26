import User from "@/models/userModel";
import {connect} from "@/db/dbConfig"
import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest)
{
    try{

        const reqBody = await request.json()
        const {token } = reqBody
        console.log(token)

        const user = await User.findOne({verificationToken: token, verificationTokenExpiry: {$gt: Date.now()}})
        console.log(user);

        
        if (!user) {
            console.log("jlihugug")
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.isVerfied = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })

    }catch(error: any){
        console.log(error.message)
        return NextResponse.json({error: error.message}, {status: 500})
    }
}