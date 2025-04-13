import React, { useState } from 'react'
import { useTodo } from '../context/TodoContext'

function TodoForm() {

  const [todo, setTodo] = useState('')
  const {addTodo} = useTodo()

  const add = (e)=> {
    e.preventDefault()
    if(!todo) return
    addTodo({todo, completed: false})
    setTodo('')
  }

  return (
    <form onSubmit={add} className='flex'>
        <input type="text" value={todo} onChange={(e)=> setTodo(e.target.value)} placeholder='Write todo...' className='mt-9 text-2xl text-white bg-[#616c7d] w-full border border-black rounded-l-lg px-5 py-3 outline-none duration-150'/>
        <button type='submit' className='rounded-r-lg outline-none bg-green-400 mt-9 shrink-0 px-7 text-white py-3 border border-black'>Add</button>
    </form>
  )
}

export default TodoForm