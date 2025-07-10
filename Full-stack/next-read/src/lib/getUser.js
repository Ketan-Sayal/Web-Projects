import { cookies } from "next/headers"
import { decrypt } from "./session";

export const getUser = async () => {
    try{
        const token = (await cookies()).get("token")?.value;
    if(token){
        const data = await decrypt(token);
        return data;
    }
    return null;
    }catch(error){
        console.log(error);
        return null;
    }
}