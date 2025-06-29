import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import expenseRouter from "./routes/expense.routes.js";
import contactRouter from "./routes/contact.routes.js";
app.use("/users", userRouter);
app.use("/expenses", expenseRouter);
app.use("/contact", contactRouter);

export {app};