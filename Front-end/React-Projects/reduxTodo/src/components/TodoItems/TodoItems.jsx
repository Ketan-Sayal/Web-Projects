import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeEditable, removeTodo, setTodos, toggleTodo, updateTodo } from "../../features/todo/todoSlice";


function TodoItems(){
    let todos = useSelector(state=>state.todos);
    const dispatch = useDispatch();
    const update=(updateMsg, id)=>{

        dispatch(updateTodo({id, text:updateMsg}))
    }

    useEffect(()=>{
        const toDoItems = JSON.parse(localStorage.getItem('todos'));
        dispatch(setTodos(toDoItems));
    },[]);

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

 return(
    <>
        <ul>
            {todos.map((todo)=>(<li key={todo.id} className="w-80 px-2 py-3 my-2 bg-blue-800 text-white flex rounded-lg justify-between">
                <div className="flex">
                <input 
                type="checkbox" 
                name="" 
                id=""
                onChange={()=>dispatch(toggleTodo(todo.id))}
                 />
                <input type="text" className={`mx-2 ${!todo.isEditable && todo.checked?"line-through":""} bg-transparent outline-none ${todo.isEditable?"border-2 border-zinc-600":"border-none"}`}
                value={todo.work}
                onChange={(e)=>update(e.target.value, todo.id)}
                readOnly={!todo.isEditable}
                 />
                </div>
                <div className="flex space-x-2">
                    <button
                    onClick={()=>dispatch(changeEditable(todo.id))}
                    >{todo.isEditable?"📝": "✏️"}</button>
                    <button onClick={()=>dispatch(removeTodo(todo.id))}>❌</button>
                </div>
            </li>))}
        </ul>
    </>
 )   
}

export default TodoItems