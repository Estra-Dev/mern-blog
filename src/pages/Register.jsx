import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"

const initialState = {
  username: "",
  password: ""
}
const Register = () => {

  const [register, setRegister] = useState(initialState)
  const {username, password} = register

  const handleChange = (ev) => {
    const {name, value} = ev.target
    setRegister({...register, [name] : value})
    console.log(register)
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    await axios.post("http://localhost:3001/register", register, {
      headers: {"Content-Type": "application/json"}
    }).then(response => {
      if (response.status === 200) {
        toast.success("Registration Successful")
        console.log(response.data)
      }
    }).catch(e => {
      toast.error("Registration Failed")
      console.log(e)
    })
  }

  return (
    <div className=" w-[30%] mx-auto h-[80vh] flex justify-center items-center">      
      <form className=" w-full flex flex-col" onSubmit={handleSubmit}>
      <h1 className=" text-center text-4xl">Register</h1>
        <div className=" flex flex-col mt-5">
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="somebody123" name="username" value={username} className=" p-5 w-full rounded-md mt-2" onChange={handleChange} />
        </div>
        <div className=" flex flex-col mt-5">
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="*******" name="password" value={password} className=" p-5 w-full rounded-md mt-2" onChange={handleChange} />
        </div>
        <button className=" mt-5 p-5 text-center bg-emerald-400 text-white font-bold rounded-md">Register</button>
        <div className=" font-semibold w-full flex justify-between mt-8 px-8">
          <p>Already Registered?</p>
          <Link to="/login">
            <p className=" underline hover:no-underline">Login</p>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register