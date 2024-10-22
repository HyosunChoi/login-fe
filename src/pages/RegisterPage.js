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

    // 필수값 검증
    if (!name || !email || !password || !secPassword) {
      setError("모든 필수값을 입력해 주세요.");
      return; // 필수값이 없으면 요청을 보내지 않음
    }

    try {
      if (password !== secPassword) {
        setError("패스워드가 일치하지 않습니다. 다시 입력해 주세요");
        return;
      }

      const response = await api.post("/user", { name, email, password });
      if (response.status === 200) {
        // 회원가입 성공 시 로그인 페이지로 이동
        navigate("/login");
      } else {
        throw new Error(response.data.error); // 일반 오류 처리
      }
    } catch (error) {
      // 에러 객체 콘솔에 출력하여 상태 확인
      console.log("에러 객체 전체:", error);

      // 백엔드에서 전달한 에러 메시지를 처리하여 화면에 출력
      if (error.response && error.response.data && error.response.data.err) {
        setError(error.response.data.err);  // "이미 가입된 유저입니다" 메시지 처리
        console.log("에러 메시지:", error.response.data.err);
      } else {
        setError(error.message);  // 일반 오류 처리
      }
    }
  };

  return (
    <div className="display-center">
      {/* 에러가 있을 경우에만 에러 메시지 출력 */}
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}
      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={(event) => setName(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event) => setSecPassword(event.target.value)} />
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
