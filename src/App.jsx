import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './context/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  
  const [todos, setTodos] = useState([])

  const addTodo = (todo)=> {
    setTodos((prev)=> [{id: Date.now(), ...todo}, ...prev])
  } 

  const updateTodo = (id, todo) => {
    setTodos( prev => prev.map( ptodo => ptodo.id === id ? todo : ptodo ) )
  }

  const deleteTodo = ( id ) => {
    setTodos( prev => prev.filter( ptodo => ptodo.id !== id ) )
  }

  const toggleComplete = (id) => {
    setTodos( prev => prev.map(ptodo => ptodo.id === id ? {...ptodo, complete:ptodo.complete } : prev) )
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos);
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className='bg-[#172842] w-full min-h-screen font-extrabold font-mono rounded-lg'>
        <div className='p-5'>
          <h1 className='text-white mt-5 text-4xl '>Manage your todos</h1>
          <div>
            <TodoForm/>
          </div>
        </div>

        <div>
            {todos.map((todo)=>(
              <div key={todo.id}>
                <TodoItem todo={todo}/>
              </div>
            ))}
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
