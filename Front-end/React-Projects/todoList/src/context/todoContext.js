import { createContext, useContext } from "react";

export const TodoContext = createContext({
    addTodo:()=>{},
    toggleTodo:()=>{},
    updateTodo:()=>{},
    deleteTodo:()=>{},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = ()=>{
    return useContext(TodoContext);
}