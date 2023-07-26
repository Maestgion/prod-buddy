import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/dbConfig";

connect();

export async function GET(request: NextRequest)
{
    try{
        const userId = getDataFromToken(request)
        const user = await User.findOne({_id: userId}).select({password: 0, cnfPassword:0});
        return NextResponse.json({
            message: "user found",
            data: user
        })

    }catch(error: any){
        return NextResponse.json({"error": error.message}, {status:400})
    }   
    
}