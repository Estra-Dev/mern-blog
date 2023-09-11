import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../UserContext"

const initialState = {
  username: "",
  password: ""
}


const Login = () => {

  const [login, setLogin] = useState(initialState)
  const {username, password} = login
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  const handleChange = (ev) => {
    const {name, value} = ev.target
    setLogin({...login, [name] : value})
    console.log(login)
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    await axios.post("http://localhost:3001/login", login, {
      headers: {"Content-Type": "application/json"},
      withCredentials: true
    }).then(response => {
      if (response.status === 200) {
        // response.json()
        setUserInfo(response.data)
        setRedirect(true)
      }
    }).catch(e => {
      alert("Wrong credentials", e)
    })
  }

  if (redirect) {
    return <Navigate to={"/"}/>
  }

  return (
    <div className=" w-[30%] mx-auto h-[80vh] flex justify-center items-center">
      <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
        <h1 className=" text-center text-4xl">Login</h1>
        <div className=" flex flex-col mt-5">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="somebody123" name="username" value={username} className=" p-5 w-full rounded-md mt-2" onChange={handleChange} />
        </div>
        <div className=" flex flex-col mt-5">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*******" name="password" value={password} className=" p-5 w-full rounded-md mt-2" onChange={handleChange} />
        </div>
        <button className=" mt-5 p-5 text-center bg-emerald-400 text-white font-bold rounded-md">Login</button>
        <div className=" font-semibold w-full flex justify-between mt-8 px-8">
          <p>Dont have an Account?</p>
          <Link to="/register">
            <p className=" underline hover:no-underline">Register</p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login