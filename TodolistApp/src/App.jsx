import { useState } from 'react'
import NavBar from './components/NavBar'

function App() {
 const [todo,setTodo]=useState("") // for input
  const [todos,setTodos]=useState([])                      // holds all todos in array


  const handleAdd=()=>{
          setTodos([...todos,{todo,isCompleted:false}])
          setTodo("")
          console.log(todos)
          
        }



  const handleDelete=()=>{

  }

  const handleEdit=()=>{

  }
  const handleChange=(e)=>{
setTodo(e.target.value)
  }
  return (
    <>
      <NavBar />
      <div className="container bg-fuchsia-200 mx-auto my-5 rounded-xl p-5 min-h-[85vh]">
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add todo</h2>
          <input onChange={handleChange} value={todo} className='  bg-amber-200 w-1/2' type="text" />
          <button onClick={handleAdd} className='cursor-pointer border bg-red-400 hover: border-b-emerald-500 hover:bg-emerald-400  rounded-3xl hover:text-white m-3 h-7 w-15'>Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.map((item,index)=>{

          
         return <div key={index} className="todo flex w-1/4 justify-between">
          <input type="checkbox" value={todo.isCompleted} name="" id="" />
            <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
            <div className="buttons ">
              <button onClick={handleEdit} className='cursor-pointer bg-violet-700 hover:bg-violet-900  text-sm hover:font-bold p-2 py-1 text-white rounded-md mx-1'>Edit </button>
              <button onClick={handleDelete} className='cursor-pointer bg-violet-700 hover:bg-violet-900  text-sm hover:font-bold p-2 py-1 text-white rounded-md mx-1' >Delete</button>

            </div>


          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
