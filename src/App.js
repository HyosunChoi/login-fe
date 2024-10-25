import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import {useState, useEffect} from "react"
import api from "./utils/api";



function App() {
  const [user,setUser] = useState(null)
 const getUser = async (event) => {
    try {
      const token = sessionStorage.getItem("token");  
      const response = await api.get("/user/me");   
    } catch (error) {
      console.log("error", error);
      setUser(null);      
    }
  };

  return (
      <Routes>
        <Route path="/" element={<PrivateRoute user={user} setUser={setUser} ><TodoPage/></PrivateRoute>} />       
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

  );
}

export default App;