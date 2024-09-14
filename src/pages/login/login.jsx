import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { createNotification } from "../../helpers/notificationsHepler";
import { setCurrentUser } from "../../features/auth/slice/authSlice";
import LoginForm from "../../features/auth/login.form";
import "./login.css";
import { login } from "../../services/apis/authService";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignRole = (user) => {
    if (user.toLowerCase() == "admin") {
      return "admin";
    } else {
      return "user";
    }
  };

  const loginSuccess = (username) => {
    dispatch(
      setCurrentUser({
        name: username,
        role: assignRole(username),
        token: "112324gg12444&&&&##",
      })
    );
    createNotification("success", `Welcome ${username}!`);
    navigate(`/`);
  };

  const handleSubmit = async ({ username, password }) => {
    const loggedUser = await login({ username, password });
    if (loggedUser.username && loggedUser.password) {
      loginSuccess(loggedUser.username);
    } else {
      createNotification("error", "invalid credentials");
    }
  };

  const handleSocialLogin = async (username) => {
    if (username) {
      loginSuccess(username);
    } else {
      createNotification("error", "invalid credentials");
    }
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-center">
      <div className="w-50">
        <LoginForm onSubmit={handleSubmit} />
        <div></div>
      </div>
    </div>
  );
};
Login.propTypes = {};
export default Login;
