"use server";

import { getCollection } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import { CreateBookSchema } from "@/lib/validations";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const createBook = async(state, formData)=>{
    const user = await getUser();
    if(!user){
        redirect("/");
    }
    const userCollection = await getCollection("users");
    const currUser = await userCollection.findOne({_id:ObjectId.createFromHexString(user._id)});
    if(!currUser){
        (await cookies()).delete("token");
        redirect("/");
    }
    const status = formData.get("status");
    const description = formData.get("description");
    const authorName = formData.get("authorName");
    const bookName = formData.get("bookName");
    
    const result = CreateBookSchema.safeParse({status, description, authorName, bookName});
    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors,
            authorName,
            bookName,
            description
        }
    }
    const data = result.data;
    // console.log(data);

    const bookCollection = await getCollection("books");
    await bookCollection.insertOne({...data, userId:currUser._id});
    redirect("/home");
    
}

export const updateBook = async(state, formData)=>{
    const user = await getUser();
    if(!user){
        redirect("/");
    }
    const userCollection = await getCollection("users");
    const currUser = await userCollection.findOne({_id:ObjectId.createFromHexString(user._id)});
    if(!currUser){
        (await cookies()).delete("token");
        redirect("/");
    }
    const status = formData.get("status");
    const description = formData.get("description");
    const authorName = formData.get("authorName");
    const bookName = formData.get("bookName");
    const id = formData.get("id");
    const result = CreateBookSchema.safeParse({status, description, authorName, bookName});
    if(!result.success){
        return {
            errors:result.error.flatten().fieldErrors,
            authorName,
            bookName,
            description
        }
    }
    const data = result.data;
    // console.log(data);

    const bookCollection = await getCollection("books");
    // console.log(id);
    
    const book = await bookCollection.findOne({_id: ObjectId.createFromHexString(id)});
    if(book.userId.toString()!==user._id.toString()){
        redirect("/home");
    }

    await bookCollection.findOneAndUpdate({_id:book._id}, {$set:{...data, status:data.status}});
    redirect("/home");
    
}