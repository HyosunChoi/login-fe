import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // 필수값 체크
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해 주세요.");
      return; // 필수값이 없으면 요청을 보내지 않음
    }

    try {
      const response = await api.post("/user/login", {email, password});
      if(response.status === 200) {
        setUser(response.data.user)
        sessionStorage.setItem("token", response.data.token);
        api.defaults.headers["Authorization"] = "Bearer " + response.data.token;
        setError("");
        navigate("/todo");
      }
      throw new Error(response.message);
    } catch (error) {
      setError(error.message)
    }
  }
  return (
    <div className="display-center">
      {error && <div className = "red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value) } autoComplete="email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value) } autoComplete="current-password"  />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
