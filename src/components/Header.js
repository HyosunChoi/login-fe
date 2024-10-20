import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();  // 현재 경로를 가져옴

  // 경로가 "/login" 또는 "/register"일 경우 버튼을 숨김
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;  // 빈 값을 반환해서 버튼을 렌더링하지 않음
  }

  return (
    <div style={{ position: "absolute", top: "10px", right: "20px", zIndex: "1" }}>
      <Link to="/login">
        <button style={{ marginRight: "10px", border: "none", padding: "10px" }}>로그인</button>
      </Link>
      <Link to="/register">
        <button style={{ border: "none", padding: "10px" }}>회원가입</button>
      </Link>
    </div>
  );
}

export default Header;
