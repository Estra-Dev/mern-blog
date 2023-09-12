import {useState, useEffect} from 'react'
import axios from "axios"
import Blog from './Blog'
import { toast } from 'react-toastify'

const Home = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    try {
      const response = await axios.get("https://mern-blog-app-api-kkqn.onrender.com/posts")
      setPosts(response.data)
    } catch (error) {
      console.log("could not get", error)
    }
  }

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post")) {
      const response = await axios.delete(`http://localhost:3001/post/${id}`)
      if (response.status === 200) {
        toast.success(response.data)
        getPosts()
      }
    }
  }

  return (
    <div>
      {
        posts.map(post => (
          <Blog key={post._id} id={post._id} title={post.title} content={post.content} author={post.author} date={post.date} deletePost={deletePost} />
        ))
      }
    </div>
  )
}

export default Home