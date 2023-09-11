import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEdit from "./pages/AddEdit"
import View from "./pages/View"
import About from "./pages/About"
import './App.css'
import Home from './pages/Home'
//import Nav from "./components/Nav"
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegLog from "./components/RegLog";
import { UserContextProvider } from "./UserContext";
//import { useContext } from "react";

function App() {

  //const {userInfo} = useContext(UserContext)

  return (
    <UserContextProvider>
      <Router>
        <ToastContainer />
        <div className=" text-slate-700">
          {/* {<Nav />} */}
          <RegLog />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddEdit />} />
            <Route path="/update/:id" element={<AddEdit />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  )
}

export default App
