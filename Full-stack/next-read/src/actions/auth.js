"use server"
import { LoginSchema, SignUpSchema } from "@/lib/validations";
import { getCollection } from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export const login = async (state, formData) => {
    // check if userData is correct
    const email = formData.get("email");
    const password = formData.get("password");
    const result = LoginSchema.safeParse({email, password});
    if(!result.success){
         return {
            errors:result.error.flatten().fieldErrors
        }
    }
    const userData = result.data;
    let userCollection;
    try {
       userCollection = await getCollection("users");
    } catch (error) {
        console.log(err);
        
    }
    const user = await userCollection?.findOne({email:userData.email});
    if(!user){
         return {
            errors:{email:"User doesn't exists"}
        }
    }
    const isPasswordCorrect = await bcrypt.compare(userData.password, user.password);
    // console.log(isPasswordCorrect);
    
    if(!isPasswordCorrect){
        return{ errors:{password:"incorrect password"}}
    }
    await createSession(user._id.toString());
    redirect("/home");
    // console.log(formData);
    
}

export const signup = async (state, formData) => {
    // Check if user alread exists
    // if it does return error user already exists in email
    // create user otherwise
    // create user session
    // redirect to "/home"
     const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const result = SignUpSchema.safeParse({username, email, password});
    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors
        }
    }

    const userData = result.data;
    const userCollection = await getCollection("users");
    const user = await userCollection.findOne({email:userData.email});
    if(user){
        return {
            errors:{username:"User already exists"}
        }
    }


    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await userCollection.insertOne({username:userData.username, email:userData.email, password:hashedPassword});
    if(!newUser){
        return {
            errors:{username:"Something went wrong"}
        }
    }
    const newlyCreatedUser = await userCollection.findOne({email:userData.email});
    await createSession(newlyCreatedUser._id.toString());
    
    redirect("/home");
    
}