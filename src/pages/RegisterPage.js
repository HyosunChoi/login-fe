import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../utils/api";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secPassword, setSecPassword] = useState("");
  const [error, setError] = useState(""); // 에러 메시지 상태
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // 페이지 새로고침 방지

    try {
      // 필수값 검증
      if (!name || !email || !password || !secPassword) {
        setError("모든 항목을 입력해 주세요.");        
      }
    
      if (password !== secPassword) {
        setError("패스워드가 일치하지 않습니다. 다시 입력해 주세요.");
        return;
      }
    
      const response = await api.post("/user", { name, email, password });
    
      // 요청이 성공하면 로그인 페이지로 이동
      if (response.status === 200) {
        navigate("/login");
      } else {
        // 상태 코드가 400인 경우에 대한 처리
        if (response.status === 400) {
          throw new Error("이미 가입된 유저입니다."); // 직접 에러 메시지 지정
        } else {
          setError(response.data.error); // 일반적인 에러 처리
        }
      }
    } catch (error) {
      console.error("에러 객체 전체:", error);
      // 응답이 있는지 먼저 확인
      if (error && error.err) {
        // error.err이 존재하는지 확인하고 처리
        setError(error.err);
      } else {
        // 응답 객체가 없을 때 처리
        setError(error.message ||"서버에 연결할 수 없습니다.");
      }
        }

  };
  return (
    <div className="display-center">
    {error && typeof error === 'string' && (
      <div style={{ color: "red", marginBottom: "20px" }}>
        {error}
      </div>
      )}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} autoComplete="name" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event) => setSecPassword(event.target.value)} autoComplete="new-password" />
        </Form.Group>
  
        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};
export default RegisterPage;
