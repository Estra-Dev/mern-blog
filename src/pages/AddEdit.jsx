import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
//import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const initialState = {
  title: "",
  content: "",
  author: ""
}

const AddEdit = () => {
  
  const [input, setInput] = useState(initialState)
  const {title, content, author} = input
  const navigate = useNavigate()
  
  const {id} = useParams()
  console.log(id)

  useEffect(() => {
    getPost(id)
  }, [id])

  const handleChanges = (ev) => {
    const {name, value} = ev.target
    setInput({...input, [name]: value})
    console.log(input)
  }

  const add = async (data) => {
    
    try {
      const response = await axios.post("http://localhost:3001/post", data)
      toast.success(response.data)
    } catch (error) {
      console.log("error", error)
    }
  }

  const getPost = async (id) => {
    const response = await axios.get(`http://localhost:3001/post/${id}`)
    setInput({...response.data[0]})
    console.log(response.data)
  }

  const updatePost = async (id, data) => {
    const response = await axios.patch(`http://localhost:3001/post/${id}`, data)
    if (response.status === 200) {
      toast.success(response.data)
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!title || !content || !author) {
      toast.error("Please fill all fields")
    }else{
      if (!id) {
        add(input)
      }else{
        updatePost(id, input)
      }
      navigate("/")
    }
  }

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [{ size: [] }],
  //     [{ font: [] }],
  //     [{ align: ["right", "center", "justify"] }],
  //     [{ list: "ordered" }, { list: "bullet" }],
  //     ["link", "image"],
  //     [{ color: ["red", "#785412"] }],
  //     [{ background: ["red", "#785412"] }]
  //   ]
  // };

  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "link",
  //   "color",
  //   "image",
  //   "background",
  //   "align",
  //   "size",
  //   "font"
  // ];
  return (
    <div className=" w-[90%] mx-auto flex justify-center items-center h-[80vh]">
      <form className=" w-[30%]" onSubmit={handleSubmit}>
        <div className=" mt-5 flex flex-col">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" className=" p-5 w-full rounded-md mt-2" value={title} onChange={handleChanges}/>
        </div>
        {/* <div>
          <label htmlFor="image">Image</label>
          <input type="file" name="img" onChange={(ev) => setFiles(ev.target.files)} />
        </div> */}
        <div className=" mt-5 flex flex-col">
          <label htmlFor="content">Content</label>
          {/* <ReactQuill theme="snow" name="content" value={content} modules={modules} formats={formats} onChange={(ev) =>setContent(ev)}/> */}
          <textarea name="content" cols="30" rows="10" className=" p-5 rounded-md mt-2" value={content} onChange={handleChanges}></textarea>
        </div>
        <div className=" mt-5 flex flex-col">
          <label htmlFor="author">Author</label>
          <input type="text" name="author" className=" p-5 rounded-md mt-2" value={author} onChange={handleChanges}/>
        </div>
        <div className=" mt-5 p-5 text-center bg-emerald-400 text-white font-bold rounded-md">
          <button>{id ? "UPDATE" : "ADD"}</button>
        </div>
      </form>
    </div>
  )
}

export default AddEdit