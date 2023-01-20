import React, { useState } from "react";
import "../styles/auth.css";
import Rightbar from "../components/rightbar/Rightbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const notify = (status, message) => {
    if (status === 200) toast.success(message);
    else toast.error(message);
  };

  const handleLogin = async (data) => {
    let result = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    result = await result.json();

    if (result.status === 200) {
      localStorage.setItem("token", result?.data?.token);
      localStorage.setItem("user", JSON.stringify(result?.data));

      navigate("/app");
    } else notify(result.status, result.message);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="auth-box">
            <h1>Login</h1>
            <p>Welcome! Log in to your account</p>
            <div className="form-control">
              <label>Email</label>
              <input {...register("email")} placeholder="Enter Email" />
              {errors.email && <p className="error">{errors.email?.message}</p>}
            </div>
            <div className="form-control">
              <label>Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              {passwordShown ? (
                <AiOutlineEye
                  style={{
                    marginLeft: "-30px",
                    marginBottom: "-2px",
                    cursor: "pointer",
                  }}
                  onClick={togglePassword}
                />
              ) : (
                <AiOutlineEyeInvisible
                  style={{
                    marginLeft: "-30px",
                    marginBottom: "-2px",
                    cursor: "pointer",
                  }}
                  onClick={togglePassword}
                />
              )}
              {errors.password && (
                <p className="error">{errors.password?.message}</p>
              )}
            </div>

            <p className="forgot-text">Forgot Password?</p>
            <div className="form-control">
              <input type="submit" value="Login" />
            </div>
            <p className="signup-text">
              Don't have an account?
              <span>
                <Link to="/signup">Signup</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
      {/* Same as */}
      <ToastContainer />

      <Rightbar />
    </div>
  );
};

export default Login;
