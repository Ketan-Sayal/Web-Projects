import { createSlice,  nanoid } from "@reduxjs/toolkit";
import { act } from "react";

export const initialState = {
    todos:[],
};

export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state, action)=>{
            const todo = {
                id: nanoid(),
                work:action.payload,
                checked:false,
                isEditable:false,
            }
            state.todos.unshift(todo);
        },
        removeTodo:(state,action)=>{// id
           state.todos = state.todos.filter((todo)=>(todo.id!=action.payload))
        },
        updateTodo:(state, action)=>{// {Id, text}
           state.todos = state.todos.map((todo)=>(todo.id===action.payload.id?{...todo, work:action.payload.text}:todo));
        },
        toggleTodo:(state, action)=>{// id
           state.todos = state.todos.map((todo)=>todo.id===action.payload?{...todo, checked:!todo.checked}:todo);
        },
        changeEditable:(state, action)=>{
            state.todos = state.todos.map((todo)=>(todo.id===action.payload?{...todo, isEditable:!todo.isEditable}:todo))
        },
        setTodos:(state, action)=>{
            state.todos = action.payload;
        }
    }
})
export const {addTodo, removeTodo, updateTodo, toggleTodo, changeEditable, setTodos} = todoSlice.actions;

export default todoSlice.reducer;