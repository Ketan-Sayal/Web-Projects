import {z} from "zod";

export const SignUpSchema = z.object({
    username:z.string().min(1, {message:"username is required"}),
    email:z.string().email(),
    password:z.string().min(1, {message:"password is required"})
});

export const LoginSchema = z.object({
    email:z.string().email(),
    password:z.string().min(1, {message:"password is required"})
});

export const CreateBookSchema = z.object({
    description:z.string().min(1, {message:"Description should not be empty"}).max(255, {message:"Description should not be longer than 255 characters"}),
    status:z.string().min(1, {message:"Status should not be empty"}),
    authorName:z.string().min(1, {message:"Aurthor name should not be empty"}).max(255, {message:"Author name should not be longer than 255 characters"}),
    bookName:z.string().min(1, {message:"Book name should not be empty"})
});