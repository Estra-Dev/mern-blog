import { Link, useLocation } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { UserContext } from "../UserContext"
import axios from "axios"

const Nav = () => {

  const {setUserInfo} = useContext(UserContext)

  const [activeTab, setActiveTab] = useState("HOME")
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("HOME")
    }else if (location.pathname === "/add") {
      setActiveTab("ADD")
    }else if (location.pathname === "/about") {
      setActiveTab("ABOUT")
    }else if (location.pathname === "/register") {
      setActiveTab("REGISTER")
    }
    else if (location.pathname === "/login") {
      setActiveTab("LOGIN")
    }
  }, [location])

  const logout = async () => {
    await axios({
      method: "post",
      url: "http://localhost:3001/logout",
      withCredentials: true
    })
    setUserInfo("")
  }

  return (
    <div className=" w-full px-[10%] py-1 flex justify-between items-center mb-5 bg-emerald-400">
      <div className="logo">
        <h1 className=" font-semibold text-lg text-gray-900"> <span className=" font-mono text-3xl font-bold text-red-600">s</span>erious</h1>
      </div>
      <div className="nav-link flex justify-end gap-5 w-[70%] text-[12px] text-white">
        <Link to="/" onClick={() => setActiveTab("HOME")} className={activeTab === "HOME" ? "active" : ""}>
          <p>HOME</p>
        </Link>
        <Link to="/add" onClick={() => setActiveTab("ADD")} className={activeTab === "ADD" ? "active" : ""}>
          <p>ADD</p>
        </Link>
        <Link to="/about" onClick={() => setActiveTab("ABOUT")} className={activeTab === "ABOUT" ? "active" : ""}>
          <p>ABOUT</p>
        </Link>
        <Link to="/login" onClick={logout}>
          <p>LOGOUT</p>
        </Link>
      </div>
    </div>
  )
}

export default Nav