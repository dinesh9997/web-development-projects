import { useState,useEffect } from 'react'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("") // for input
  const [todos, setTodos] = useState([])                      // holds all todos in array
  const [ShowFinished,setShowFinished]=useState(true)
 useEffect(()=>{
  let todoString= localStorage.getItem("todos")
  if(todoString){
    let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)


  }
 },[])

  const saveToLS=()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
   
    saveToLS()

  }
  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()

  }


  const handleDelete = (e, id) => {
  
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleEdit = (e,id) => {
   let t= todos.filter(i=>i.id===id)
setTodo(t[0].todo)
    saveToLS()

  }




  const handleChange = (e) => {
    setTodo(e.target.value)

  }

const toggleFinished=(e) => {
  setShowFinished(!ShowFinished)
}


  return (
    <>
      <NavBar />
      <div className="mx-3 md:container   bg-fuchsia-200 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] w-full md:w-[40%] ">

 
        <h1 className='font-bold text-center text-2xl '>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5  flex flex-col gap-1 ">
        <h2 className='text-lg font-bold'>Add todo</h2>
          <div className='flex '>
          <input onChange={handleChange} value={todo} placeholder='Enter Task' className='  bg-amber-200 w-full rounded-full px-2 py-0.5' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='cursor-pointer border bg-red-400  hover: border-b-emerald-500 hover:bg-emerald-400 mx-2 rounded-full hover:text-white p-4 py-2 text-sm font-bold'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type='checkbox' className='my-4'  checked={ShowFinished}/> Show Finished
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5 '> No Todos to Display </div> }
          {todos.map((item) => {
            /*here serach "uuid npm" where this pakage is used for asigning unique ids to eah todo so that fo that todo by their id w an perfor our taks
            terminal run: npm run uuid
            add at top: import { v4 as uuidv4 } from 'uuid';
            */

            return ( ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-[90%] my-3 justify-between ">
             <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
              </div>
              
              <div className="buttons flex h-full">
                <button onClick={(e)=> handleEdit(e,item.id)} className='cursor-pointer bg-violet-700 hover:bg-violet-900  text-sm hover:font-bold p-2 py-1 text-white rounded-md mx-1'> <FaEdit/> </button>
                <button onClick={(e) => { handleDelete(e,item.id) }} className='cursor-pointer bg-violet-700 hover:bg-violet-900  text-sm hover:font-bold p-2 py-1 text-white rounded-md mx-1' > <MdDelete/></button>
              </div>


            </div>
          })}
        </div>
      </div>
    </>
  )
}
/*
installing react ions so run this command:
npm install react-icons --save

then add import staements of each icon in top and after it add that tag name



*/

export default App
