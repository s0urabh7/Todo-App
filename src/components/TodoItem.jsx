import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoItem({todo}) {

  const [isEditable, setIsEditable] = useState(false)
  const [todoMsg, setTodoMsg] = useState(todo.todo)
  const {updateTodo, toggleComplete, deleteTodo} = useTodo()

  const editTodo = ()=>{
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsEditable(false)
  }

  const toggleCompleted = ()=>{
    toggleComplete(todo.id)
  }

  return (
    <div className='flex'>
        <div className={`  w-full  rounded-lg flex m-5 px-4 py-1 ${todo.complete ? "bg-[#c6e9a7]" : "bg-purple-300"}`}>
          <input type="checkbox" checked={todo.complete} onChange={toggleComplete} className='cursor-pointer ' />

          <input type="text"  className={`w-full border bg-purple-300 text-[#172842] text-2xl rounded-lg m-2 h-8 outline-none p-2 ${isEditable ? "border-black" : 'border-transparent'} ${todo.complete ? "line-through": ""}`} readOnly={!isEditable} value={todoMsg} onChange={(e)=> setTodoMsg(e.target.value)}/>

          <button className='mt-2 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50' onClick={()=>{
            if(todo.complete) return;
            if(isEditable){
              editTodo();
            }else{
              setIsEditable(prev => !prev )
            }
          }} disabled={todo.complete}> {isEditable ? "📁": '✏️'}  </button>

          <button className='mt-2 inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50 ml-2' onClick={()=>deleteTodo(todo.id)}>🗑️</button>
        </div>
    </div>
  )
}

export default TodoItem