import dotenv from "dotenv";

dotenv.config({path:'../env'});

import { DB } from "./db/index.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 3000;
DB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}:`);
        console.log(`http://localhost:${PORT}`);
    }).on("error", (err)=>{
        console.log("Internnal server error:\n",err);
    });
}).catch((err)=>{
    console.log("Mongodb error:\n", err);
    
});