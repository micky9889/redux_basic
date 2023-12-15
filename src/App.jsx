import './App.css'
import Todo from './Todo'
import { Routes,Route } from 'react-router-dom'
import Create from './pages/Create'
import Update from './pages/Update'

function App() {

  return (
    <>
    <Routes>
   <Route path="/" element={<Todo />} />
   <Route path="/create" element={<Create/>} />
   <Route path="/update/:id" element={<Update/>} />

</Routes>
    </>
  )
}

export default App
