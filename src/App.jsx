import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Container from 'postcss/lib/container'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md"


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setSetshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
  }, [])

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinished = (e) => {
    setSetshowfinished(!showfinished)
  }




  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    saveToLS()

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)

  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }




  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[75vh] w-1/2">
        <h1 className='font-bold text-center text-xl'>iTask Manage your todos  at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-3">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-4 py-1 font-serif font-bold ' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-700 disabled:bg-violet-900 hover:bg-violet-950 p-3 py-1 font-bold text-white rounded-md mx-6 text-xl'>Add</button>
        </div>
        <input onChange={togglefinished} type="checkbox" checked={showfinished} /> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos font-black text-lg">
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 justify-between my-3">
              <div className='flex gap-4'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-2'><FaEdit Edit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1'><MdDeleteOutline Delete/></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
