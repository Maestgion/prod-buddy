import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : [true, "Please enter your name"]
    },
    email:{
        type: String,
        required: [true, "Please provide the email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please provide the password"]
    },
    cnfPassword:{
        type: String,
        required: [true, "Please confirm your password"]
    },
    verificationToken: String,
    verificationTokenExpiry: String,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String,
})

const User = mongoose.model("user", userSchema);

export default User;