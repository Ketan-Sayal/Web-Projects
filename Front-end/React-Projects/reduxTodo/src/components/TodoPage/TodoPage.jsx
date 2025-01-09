import TodoForm from "../TodoForm/TodoForm";
import TodoItems from "../TodoItems/TodoItems";
import { useDispatch, useSelector } from "react-redux";

function TodoPage(){
   


    return(
        <div className="flex items-center mt-3 flex-col space-y-3">
        <TodoForm/>
        <TodoItems/>
        </div>
    )
}

export default TodoPage