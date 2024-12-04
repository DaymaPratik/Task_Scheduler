import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className='flex justify-between px-8 py-2 items-center '>
       <Link to={'/'}>
       <h2 className='text-[30px] font-bold '>Task Scheduler</h2>
       </Link>
        <ul className='flex justify-evenly px-4 gap-4  text-[25px]'>
            <Link to={'/tasklist'}>
            <li className="px-4 py-2 rounded-md bg-blue-400 border-none text-white">Task List</li>
            </Link>
            <Link to={"/taskhistory"}>
            <li className="px-4 py-2 rounded-md bg-blue-400 border-none text-white">Task Logs</li>
            </Link>
        </ul>
    </nav>
  )
}

export default Navbar