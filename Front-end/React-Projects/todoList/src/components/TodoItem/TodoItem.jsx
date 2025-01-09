import React, { useEffect, useState } from "react";
import { useTodo } from "../../context/todoContext";

function TodoItem({todo}){
    // todo.checked = true;
    const [isEditable, setIsEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo.trim());
    const {toggleTodo, deleteTodo, updateTodo} = useTodo();

    useEffect(()=>{
        if(isEditable)updateTodo(todoMsg, todo.id);
    }, [todoMsg]);// If your item is local and you aare sending it to global then render the component so that the value reflects Sin global level
    // Bascically they are not in sync
    return(
        <div className={`${todo.checked?"bg-slate-600 text-white line-through":"bg-zinc-500"} my-3 rounded-md flex justify-between px-2 py-2`}>
            <input 
            type="checkbox"
            disabled={isEditable}
            checked={todo.checked}
            onChange={()=>toggleTodo(todo.id)}
            />
            <input 
            type="text"
            className={`${isEditable?"border border-zinc-400": "bg-transparent"}  outline-none`}
            readOnly={!isEditable}
            value={todoMsg}
            onChange={(e)=>setTodoMsg(e.target.value)}
             />
             <div className="space-x-3">
             <button className="bg-white rounded-md px-1 py-1"
             onClick={()=>{
                 if(!isEditable){
                 setIsEditable(true);
                }
                else{
                    setIsEditable(false);
                }
            }}
             disabled={todo.checked}>
                {isEditable?"📝": "✏️"}
             </button>
             <button 
             className="bg-white rounded-md px-1 py-1"
             onClick={()=>deleteTodo(todo.id)}
             >
                    ❌
             </button>
             </div>
        </div>
    )
}

export default TodoItem;