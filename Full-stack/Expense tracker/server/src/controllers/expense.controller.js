import mongoose from "mongoose";
import { Expense } from "../models/expenses.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHander } from "../utils/asyncHandler.js";
import { categories } from "../constant.js";

const sortCategoriesBasedExpenses = (data)=>{
    for(let i = 0; i<data.length-1; i++){
        for(let j = 0; j<data.length-i-1; j++){
            if(data[j].expense>data[j+1].expense){
                let temp = data[j];
                data[j] = data[j+1];
                data[j+1] = temp;
            }
        }
    }
}

export const create = asyncHander(async(req, res)=>{
    // Check if user is a vaalid user
    // add expense if user is a valid user
    const userId = req.user._id;
    const {date, amount, category, title, description, type} = req.body;
    const user = await User.findById(userId);

    if([amount, category, type, title, description, date].some(val=>val==="")){
        throw new ApiError(403, "All feilds are required");
    }
    if(!user){
        throw new ApiError(401, "User must be a valid");
    }

    const expense = await Expense.create({
        userId,
        title,
        description,
        type,
        amount,
        date,
        category
    });

    return res.status(200).json(
        new ApiResponse(200, {expense}, "new Expense created successfully")
    );

});

export const getUserExpense = asyncHander(async(req, res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(401, "User must be a valid");
    }
    const expenses = await Expense.aggregate([{
        $match:{
            userId:mongoose.Types.ObjectId.createFromHexString(userId),
        }
    }]);// not grouping category wise as there can be no of categories{group them by using $bucket pipeline}

    return res.status(200).json(
        new ApiResponse(200, {expenses}, "User  expensses sent")
    )
})

export const deleteExpense = asyncHander(async(req, res)=>{
    const id = req.params.expenseId;
    const expense = await Expense.findById(id);
    if(!expense){
        throw new ApiError(405, "Invalid expense id");
    }
    if(expense.userId.toString()!==req.user._id){
        throw new ApiError(405, "You are not the owner");
    }
    await Expense.findByIdAndDelete(id);
    return res.status(200).json(
        new ApiResponse(200, {expenseId:id}, "Deleted successfully")
    );
});

export const totalExpenseAndIncome = asyncHander(async(req, res)=>{
    const {_id} = req.user;
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError("401", "User not found");
    }
    const today = new Date(); 
    const previousMonth = new Date(today);
    previousMonth.setMonth(today.getMonth() - 1);
    // previousMonth = previousMonth.toISOString().split('T')[0];

    const userData = await Expense.find({userId:_id, date:{$gte: previousMonth}});
    
    const returnData = categories.map((category)=>{
        let income = 0;
        let expenseTotal = 0;
        const name = category.name;
        userData.forEach((expense)=>{
            if(expense.type==='income' && name=== expense.category){
                income+=expense.amount;
                // console.log("Income");
                
            }else if(name===expense.category){
                expenseTotal+=expense.amount;
                // console.log("Expenses");
            }
        });
        return {name:category.short, income, expense:expenseTotal, actualName:name};
    });
    return res.status(200).json(
        new ApiResponse(200, {categoriesIncomeAndExpenses:returnData}, "categories with total income and total expenses")
    );
});

export const totalExpenseAndIncomeOfSixMonths = asyncHander(async(req, res)=>{
    // first get the transactions month
    // get the total income and expense and then push the names in short to the new Array
    
    const {_id} = req.user;
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError("401", "User not found");
    }
    const today = new Date(); 
    const allData = await Expense.find({userId:_id});
    const result = [];
    for(let i = 0; i<=6; i++){
        const targetDate = new Date(today);
        targetDate.setMonth(today.getMonth()-i);
        const targetMonth = targetDate.getMonth();
        const targetYear = targetDate.getFullYear();
        
        const monthData = allData.filter((expense)=>expense.date.getMonth() === targetMonth && expense.date.getFullYear()===targetYear);
        
        let totalIncome = 0;
        let totalExpense = 0;
        monthData.forEach((data)=>{
            if(data.type==='income'){
                totalIncome+=data.amount;
            }else{
                totalExpense+=data.amount;
            }
        });

        result.push({
            name:targetDate.toLocaleString('default', {month:"short"}),
            income:totalIncome,
            expense:totalExpense
        });
    }
    return res.status(200).json(
        new ApiResponse(200, {totalIncomeAndExpenses:result.reverse()}, "Sent last 6 months data sucessfully")
    );
});

export const topSpendingCategoriesOfLastTwoMonths = asyncHander(async(req, res)=>{
    // Get the categories in decending order of the user
    // give it as a response
    const {_id} = req.user;
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError(401, "User must logged in");
    }

    const today = new Date();
    const prevMonth = new Date(today);
    prevMonth.setMonth(today.getMonth()-1);
    const userThisMonthData = await Expense.find({userId:_id, date:{$gte:prevMonth}});
    const returnThisMonthData = categories.map((category)=>{
        let income = 0;
        let expenseTotal = 0;
        const name = category.name;
        userThisMonthData.forEach((expense)=>{
            if(expense.type==='income' && name=== expense.category){
                income+=expense.amount;
                // console.log("Income");
                
            }else if(name===expense.category){
                expenseTotal+=expense.amount;
                // console.log("Expenses");
            }
        });
        return {name:category.short, income, expense:expenseTotal, actualName:name, icon: category.icon, color:category.color};
    });
    sortCategoriesBasedExpenses(returnThisMonthData);

    const prevToPrevMonth = new Date(today);
    prevToPrevMonth.setMonth(today.getMonth()-2);
    const userLastMonthData = await Expense.find({userId:_id, date:{$gte:prevToPrevMonth, $lt:prevMonth}});
    const returnLastMonthData = categories.map((category)=>{
        let income = 0;
        let expenseTotal = 0;
        const name = category.name;
        userLastMonthData.forEach((expense)=>{
            if(expense.type==='income' && name=== expense.category){
                income+=expense.amount;
                // console.log("Income");
                
            }else if(name===expense.category){
                expenseTotal+=expense.amount;
                // console.log("Expenses");
            }
        });
        return {name:category.short, income, expense:expenseTotal, actualName:name, icon: category.icon, color:category.color};
    });
    sortCategoriesBasedExpenses(returnLastMonthData);

    // get each category difference
    const diffenceCategories = returnThisMonthData.map((expense)=>{
        let difference = 0;
        returnLastMonthData.forEach((lastExpense)=>{
            if(lastExpense.name === expense.name){
                difference = expense.expense-lastExpense.expense;
            }
        });
        return difference;
    })

    return res.status(200).json(
        new ApiResponse(200, {thisMonth:returnThisMonthData.reverse(), lastMonth:returnLastMonthData.reverse(), diffenceCategories:diffenceCategories.reverse()}, "User data of categories is sent")
    );
});

export const monthlyComparison = asyncHander(async (req, res) => {
    // Check user is valid
    // get the data of user till prev month till curr date of prev month
    // get the data of user till last prev month till prev monnth
    // get the avg of  each
    // get avg of  3 months / 6 months and last year
    const {_id} = req.user;
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError(401, "User must be logged in");
    }
    const userData = await Expense.find({userId:user._id});
    const today = new Date();
    const prevMonthDate = new Date(today);
    prevMonthDate.setMonth(today.getMonth()-1);

    const dataOfCurrMonth = userData.filter((data)=>data.date >= prevMonthDate && data.type==="expense");
    const totalExpensOfCurrMonth = dataOfCurrMonth?.reduce((sum, expense)=>sum+=expense.amount, 0)|| 0;
    const currMonth = today.toLocaleString('default', {month:"short"});
    const prevMonth = prevMonthDate.toLocaleString('default', {month:"short"});
    const prevToPrevMonthDate = new Date(today);
    prevToPrevMonthDate.setMonth(today.getMonth()-2);
    const prevToPrevMonth = prevToPrevMonthDate.toLocaleString("default", {month:"short"});
    const dataOfLastMonth = userData.filter((data)=>data.date>=prevToPrevMonthDate && data.date<prevMonthDate && data.type==="expense");
    const totalExpenseOfLastMonth = dataOfLastMonth?.reduce((sum, expense)=>sum+=expense.amount, 0) || 0;
    const lastThirdMonthDate = new Date(today);
    lastThirdMonthDate.setMonth(today.getMonth()-3);
    const totalExpenseOfLastToLastMonth = userData.filter((data)=>data.date<=prevToPrevMonthDate && data.date>lastThirdMonthDate && data.type==="expense")?.reduce((sum, data)=>sum+=data.amount, 0);

    const lastThirdMonthTotalExpense = userData.filter((data)=>data.date>=lastThirdMonthDate && data.type==='expense')?.reduce((sum, data)=>sum+=data.amount, 0) || 0;
    
    
    const avgOfThreeMonths = lastThirdMonthTotalExpense/3;
    const lastThirdMonth = lastThirdMonthDate.toLocaleString('default', {month:"short"});

    const lastSixthMonthDate = new Date(today);
    lastSixthMonthDate.setMonth(today.getMonth()-6);
    
    const lastSixthMonthTotalExpense = userData.filter((data)=>data.date>=lastSixthMonthDate && data.type==="expense")?.reduce((sum, data)=>sum+=data.amount, 0);
    
    
    const lastSixthMonth = lastSixthMonthDate.toLocaleString('default', {month:"short"});
    const avgOfSixMonths = lastSixthMonthTotalExpense/6;

    const lastYearDate = new Date(today);
    lastYearDate.setFullYear(today.getFullYear()-1);

    const lastYearTotalExpense = userData.filter((data)=>data.date>=lastYearDate && data.type==="expense")?.reduce((sum, data)=>sum+=data.amount, 0);
    
    
    const lastYearMonth = lastYearDate.toLocaleString('default', {month:"short"});
    const avgOfYear = lastYearTotalExpense/12;

    const currMonthPercent = totalExpenseOfLastMonth!==0?((totalExpensOfCurrMonth-totalExpenseOfLastMonth)/totalExpenseOfLastMonth)*100 : totalExpensOfCurrMonth;
    const lastMonthPercent = totalExpenseOfLastToLastMonth!==0?tota((totalExpenseOfLastMonth-totalExpenseOfLastToLastMonth)/totalExpenseOfLastToLastMonth)*100: totalExpenseOfLastMonth;
    // console.log(currMonthPercent);
    
    return res.status(200).json(
        new ApiResponse(200, {totalExpensOfCurrMonth, currMonth, prevMonth, prevToPrevMonth, totalExpenseOfLastMonth, avgOfThreeMonths, avgOfSixMonths, avgOfYear, lastThirdMonth, lastSixthMonth, lastYearMonth, currMonthPercent, lastMonthPercent, currYear:today.getFullYear(), lastYear:lastYearDate.getFullYear()}, "All the data is sent")
    );
});

export const report = asyncHander(async(req, res)=>{
    // check user is logged in or not
    // Get the user expenses of this month
    // get the total expense of this month
    // get the diffrence between last 2 months
    // get the biggest savings, biggest increase, buget used
    //get the expenses of last week and sort it  in order by category wwise
    const {_id} = req.user;
    const user = await User.findById(_id);
    if(!user){
        throw new ApiError(401, "User is not a valid user");
    }
    const today = new Date();
    const thisMonthDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonthDate = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const userDataOfThisMonth = await Expense.find({userId:user._id, date:{$gte:thisMonthDate}});
    
    const totalExpenseOfThisMonth = userDataOfThisMonth.filter((data)=>data.type==='expense')?.reduce((sum, data)=>sum+=data.amount, 0);
    const totalIncomeOfThisMonth = userDataOfThisMonth.filter((data)=>data.type==='income')?.reduce((sum, data)=>sum+=data.amount, 0);

    const userDataOfLastMonth = await Expense.find({userId:user._id, date:{$lt:thisMonthDate, $gte:lastMonthDate}});
    
    const totalExpenseOfLastMonth = userDataOfLastMonth.filter((data)=>data.type==='expense')?.reduce((sum, data)=>sum+=data.amount, 0);
    const totalIncomeOfLastMonth = userDataOfLastMonth.filter((data)=>data.type==='income')?.reduce((sum, data)=>sum+=data.amount, 0);

    const thisMonthSaving = totalIncomeOfThisMonth - totalExpenseOfThisMonth;
    const lastMonthSaving = totalIncomeOfLastMonth - totalExpenseOfLastMonth;

    const biggestSavings = Math.max(thisMonthSaving, lastMonthSaving);

    const diffrenceInExpense = totalExpenseOfThisMonth-totalExpenseOfLastMonth;

    const biggestIncrease = totalExpenseOfThisMonth - totalExpenseOfLastMonth;

    const bugetUsed = totalIncomeOfThisMonth===0?100: (totalExpenseOfThisMonth/totalIncomeOfThisMonth)*100;
    const bugetNotUsed = (100-bugetUsed)/100;
    const remainingBuget = totalIncomeOfThisMonth*bugetNotUsed;

    const thisWeekDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()-6);
    const userDataOfThisWeek = await Expense.find({userId:_id, date:{$gte:thisWeekDate}});
    const userExpenseDataOfThisWeek = userDataOfThisWeek?.filter((data)=>data.type==="expense");
    

    return res.status(200).json(
        new ApiResponse(200, {totalExpenseOfThisMonth, diffrenceInExpense, currMonth:thisMonthDate.toLocaleString("default", {month:"short"}), currYear:thisMonthDate.getFullYear(), biggestSavings, biggestIncrease, bugetUsed, remainingBuget, userExpenseDataOfThisWeek}, "User reports sent")
    );
});