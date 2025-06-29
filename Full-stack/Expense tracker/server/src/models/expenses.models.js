import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    type:{
        type:String,
        default:"expense"
    }
}, {timestamps:true});

export const Expense = mongoose.model("Expense", expenseSchema);