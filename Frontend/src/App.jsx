import ExpiredTasks from "./Components/ExpiredTasks"
import Navbar from "./Components/Navbar"
import PendingTasks from "./Components/PendingTasks"
import TaskForm from "./Components/taskForm"
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
     <Navbar/>
 <Routes>
    <Route path='/' element={<TaskForm/>}/>
    <Route path='/tasklist' element={<PendingTasks/>}/>
    <Route path='/taskhistory' element={<ExpiredTasks/>}/>
 </Routes>

</BrowserRouter>
    </>
  )
}

export default App
