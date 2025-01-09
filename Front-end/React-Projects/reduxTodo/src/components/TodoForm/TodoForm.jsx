import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {addTodo} from '../../features/todo/todoSlice'

function TodoForm(){
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const add = (e)=>{
        e.preventDefault();
        if(text!==''){
        dispatch(addTodo(text))
        setText('');
        }
    }
 

 return(
    <div className="flex">
        <form action="#" onSubmit={add}>
            <input 
            type="text" 
            className="border-2 border-orange-500 outline-none px-2 py-1 rounded-lg" 
            placeholder="Type Todos..." 
            value={text}
            onChange={(e)=>setText(e.target.value)}
            />
        <input type="submit" className="bg-blue-950 text-white mx-3 px-2 cursor-pointer py-1 rounded-lg" value="Add" />
        </form>
    </div>
 )   
}

export default TodoForm