import { useEffect, useState } from 'react'
import { TodoForm, TodoItem } from './components'
import { TodoProvider } from './context/todoContext'

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=>{
    setTodos(prevTodos=>([{id:Date.now(),todo:todo, checked:false}, ...prevTodos]));
  }

  const deleteTodo = (id)=>{
    setTodos(prevTodos=>prevTodos.filter((todo)=>todo.id!==id));
  }
  
  const updateTodo = (todoMsg, id)=>{
    setTodos(prevTodos=>prevTodos.map((prevtodo)=>prevtodo.id===id?{...prevtodo, todo:todoMsg}:prevtodo));
    console.log(todos);
  }

  const toggleTodo = (id)=>{
    setTodos(prevTodos=>prevTodos.map((todo)=>todo.id===id?{...todo, checked:!todo.checked}:todo));
  }


// console.log(todos);


  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('todos'));
    // console.log(data);
    if(data && data.length>0) setTodos(data);
  }, []);

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos])

  return (
    <TodoProvider value={{addTodo, deleteTodo, updateTodo, toggleTodo}}>
      <div className='flex justify-center space-y-6'>
      <div className='border border-white bg-zinc-600 p-6 mt-2 rounded-lg'>
      <TodoForm/>
      <div className='w-full'>
        {todos.map(myTodo=><TodoItem todo={myTodo} key={myTodo.id}/>)}
      </div>
      </div>
    </div>
    </TodoProvider>
  )
}

export default App
