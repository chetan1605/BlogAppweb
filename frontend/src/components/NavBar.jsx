import { Link, useLocation, useNavigate } from "react-router-dom"
import {BsSearch} from 'react-icons/bs'
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"


const NavBar = () => {
  const [prompt,setPrompt] = useState("")
  const [Menu,setMenu] = useState(false)
  const navigate = useNavigate()
  const path = useLocation().pathname

  const showMenu=()=>{
    setMenu(!Menu)
  }
    

  const {user} = useContext(UserContext)
  console.log(user)
  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">BlogApp</Link></h1>
        {path === "/" && <div className="flex items-center justify-center space-x-0">
            <p onClick={()=>navigate(prompt?"?search="+prompt:navigate("/"))} className="cursor-pointer"><BsSearch /></p>
            <input onClick={(e)=>setPrompt(e.target.value)} className="outline-none px-3" placeholder="Seach a Post" type="text"/>

        </div>}
        <div className="hidden md:flex items-center justify-center space-x-4 md:space-x8">
           {user? <h3><Link to="/create">Create</Link></h3> :<h3><Link to="/login">Login</Link></h3>}
            {user? <div onClick={showMenu}>
              <p className="cursor-pointer relative"><FaBars /></p> 
              {Menu && <Menu/>}
              </div>:<h3><Link to="/register">Register</Link></h3>}
       </div>
       <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative"><FaBars /></p>
        {Menu && <Menu/>}
       </div>
    </div>
  )
}

export default NavBar
