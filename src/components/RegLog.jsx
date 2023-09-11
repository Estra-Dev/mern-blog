import { Link} from "react-router-dom"
import { useContext, useEffect } from "react"
import axios from "axios"
import Nav from "../components/Nav"
import { UserContext } from "../UserContext"


const RegLog = () => {

  const {setUserInfo, userInfo} = useContext(UserContext)

  useEffect(() => {
    profile()
  }, [])

  const profile = async () => {
    await axios({
      method: "get",
      url: "http://localhost:3001/profile",
      withCredentials: true
    }).then(response => {
      setUserInfo(response.data.username)
      console.log(response.data.username)
    }).catch(err => {console.log(err)})
  }

  

  const username = userInfo?.username

  return (
    <div>
        {
          username && (
            <div>
              <Nav />
              
            </div>
          )
        }
        {
          !username && (

            <div className=" w-full px-[10%] py-1 flex justify-between items-center mb-5 bg-emerald-400">
              <div className="logo">
                <h1 className=" font-semibold text-lg text-gray-900"> <span className=" font-mono text-3xl font-bold text-red-600">s</span>erious</h1>
              </div>
              <div className="nav-link flex justify-end gap-5 w-[70%] text-[12px] text-white">
                  <Link to="/login">
                    <p>LOGIN</p>
                  </Link>
                  <Link to="/register">
                    <p>REGISTER</p>
                  </Link>
                </div>
            </div>
          )
        }
    </div>
  )
}

export default RegLog