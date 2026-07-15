import { useState,useEffect } from 'react'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("") // for input
  const [todos, setTodos] = useState([])                      // holds all todos in array
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
    console.log(todos)
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
  return (
    <>
      <NavBar />
      <div className="container bg-fuchsia-200 mx-auto my-5 rounded-xl p-5 min-h-[85vh]">
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add todo</h2>
          <input onChange={handleChange} value={todo} className='  bg-amber-200 w-1/2' type="text" />
          <button onClick={handleAdd} className='cursor-pointer border bg-red-400 hover: border-b-emerald-500 hover:bg-emerald-400  rounded-3xl hover:text-white m-3 h-7 w-15'>Save</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5 '> No Todos to Display </div> }
          {todos.map((item) => {
            /*here serach "uuid npm" where this pakage is used for asigning unique ids to eah todo so that fo that todo by their id w an perfor our taks
            terminal run: npm run uuid
            add at top: import { v4 as uuidv4 } from 'uuid';
            */

            return <div key={item.id} className="todo flex w-1/4 justify-between">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
              <div className="buttons flex">
                <button onClick={(e)=> handleEdit(e,item.id)} className='cursor-pointer bg-violet-700 hover:bg-violet-900  text-sm hover:font-bold p-2 py-1 text-white rounded-md mx-1'>Edit </button>
                <button onClick={(e) => { handleDelete(e,item.id) }} className='cursor-pointer bg-violet-700 hover:bg-violet-900  text-sm hover:font-bold p-2 py-1 text-white rounded-md mx-1' >Delete</button>

              </div>


            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
