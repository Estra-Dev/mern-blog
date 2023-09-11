import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"

const View = () => {

  const [post, setPost] = useState({})
  const {id} = useParams()

  useEffect(() => {
    getPost(id)
  }, [id])

  const getPost = async (id) => {
    const response = await axios.get(`http://localhost:3001/post/${id}`)
    setPost({...response.data[0]})
    console.log(response.data)
  }

  return (
    <div className=" flex flex-col items-center w-[90%] mx-auto py-2 px-10">
      <div className="img-container w-[90%] h-[500px] bg-slate-500"></div>
      <div className=" w-[90%] px-2 py-2 font-bold text-center">
        <h1 className=" text-4xl mb-7">{post.title}</h1>
        <h3 className=" font-semibold text-sm mb-5">{post.author}</h3>
        <p className=" font-light text-[20px] mb-5">{post.content}</p>
        <pre className=" font-semibold text-sm mb-5">{post.date}</pre>
        <div className="btns w-[50%] block text-center mx-auto">
          <Link to="/">
            <button className=" bg-emerald-400 rounded-md px-4 py-3 text-white">Back</button>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default View