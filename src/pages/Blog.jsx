import { Link } from "react-router-dom"

const Blog = ({title, content, author, date, id, deletePost}) => {

  return (
    <div className=" flex justify-between w-[90%] mx-auto py-2 px-10">
      <div className="img-container w-[45%] h-[300px] bg-slate-500"></div>
      <div className=" w-[53%] px-2 py-2 font-bold">
        <h1 className=" text-4xl mb-7">{title}</h1>
        <h3 className=" font-semibold text-sm mb-5">{author}</h3>
        <p className=" font-light text-[20px] mb-5">{content}</p>
        <pre className=" font-semibold text-sm mb-5">{date}</pre>
        <div className="btns flex justify-around w-[50%]">
          <Link to={`/update/${id}`}>
            <button>Edit</button>
          </Link>
          <button className=" mb-5" onClick={() => deletePost(id)}>Delete</button>
          <Link to={`/view/${id}`}>
            <button>View</button>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default Blog