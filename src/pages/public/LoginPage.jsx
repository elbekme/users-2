import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import Cookies from "js-cookie";

import request from "../../server";
import { ROLE, TOKEN } from "../../constants";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const { setIsAuthenticated, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const login = async () => {
    try {
      let user = {
        username: "abdulaziz",
        password: "1234567",
      };
      let {
        data: { token, role },
      } = await request.post("auth/login", user);
      if (role === "user") {
        navigate("/my-blogs");
      } else if (role === "admin") {
        navigate("/dashboard");
      }
      Cookies.set(TOKEN, token);
      Cookies.set(ROLE, role);
      setIsAuthenticated(true);
      setRole(role);
    } catch (err) {
      message.error("Error");
    }
  };
  return (
    <div style={{textAlign:'center'}}>
      <h2>LoginPage</h2>
      <Button type="primary"  onClick={login}>Login</Button>
    </div>
  );
};

export default LoginPage;
