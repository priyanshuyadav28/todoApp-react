import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import TodoITem from './components/TodoITem'
import TodoForm from './components/TodoForm'


function App() {
  const [todos, setTodos] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [themeName, setThemeName] = useState("Dark Mode")

  const addTodo = (todo) => {
    // add todo to the todos []
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updatedTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((currentTodo) => currentTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  const handleThemeMode = () => {
    if (!darkMode) setThemeName("Light Mode")
    if (darkMode) setThemeName("Dark Mode")
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updatedTodo, toggleComplete }}>
      <div className={`${darkMode ? 'bg-black' : 'bg-[#172842]'} min-h-screen py-8`}>
        <div className='absolute top-0 right-0 m-4 text-white'>
          <button
            className='text-lg'
            onClick={handleThemeMode}
          >
            {themeName} 
          </button>
        </div>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div
                  className='w-full'
                  key={todo.id}
                >
                  <TodoITem todo={todo} darkMode={darkMode} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
