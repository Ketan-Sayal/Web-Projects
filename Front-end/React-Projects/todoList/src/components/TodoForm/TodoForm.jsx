import {useState} from "react";
import { useTodo } from "../../context/todoContext";

function TodoForm(){
    const [todo, setTodo] = useState('');
    const {addTodo} = useTodo();

    return(
        <div>
               <form className="space-x-3" onSubmit={(e)=>{
                e.preventDefault();
                if(todo!==''){
                addTodo(todo);
                setTodo('');
                }
                }}>
               <input
                 type="text"
                  className={`border-2 border-zinc-600 outline-none px-2 py-2 w-48 text-xs md:text-base rounded-lg md:w-96`}
                  onChange={(e)=>setTodo(e.target.value)}
                  value={todo}
                 />
                 <input 
                 type="submit" 
                 value="Add"
                 className="text-white bg-black rounded-md px-3 py-2 cursor-pointer text-xs md:text-base"
                 />
               </form>
        </div>
    )
}

export default TodoForm;