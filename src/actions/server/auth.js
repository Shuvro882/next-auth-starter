"use server"

import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
export const postUser= async(payload)=>{
    console.log(payload);

    //1- check user exist or not

    const isExist= await dbConnect("users").findOne({email: payload.email});
    if(isExist){
        return{
            success:false,
            message:"user allready existed"
        }
    };

    const hashPassword = await bcrypt.hash(payload.password,10);

    //2-creat new user

    const newUser = {
        ...payload,
        createdAt:new Date().toISOString(),
        role:"user",
        password: hashPassword,
    };
    console.log(newUser);

    //3-send user to database
    const result = await dbConnect("users").insertOne(newUser);
    if(result.acknowledged){
        return {
            success: true,
            message: `user created with ${result.insertedId.toString()}`
        }
    }
}