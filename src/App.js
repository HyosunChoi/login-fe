import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";  // Header 컴포넌트 불러오기


function App() {
  return (
    <div style={{ position: "relative", height: "100vh", paddingTop: "60px" }}> {/* 상단 여백 추가 */}
      {/* 헤더 컴포넌트를 상단에 추가 */}
      <Header />

      {/* 라우팅 설정 */}
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;