import React, { useState } from "react";
import "../styles/auth.css";
import Rightbar from "../components/rightbar/Rightbar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const notify = (status, message) => {
    if (status === 200) toast.success(message);
    else toast.error(message);
  };

  const handleRegister = async (data) => {
    let result = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    result = await result.json();

    if (result.status === 200) {
      localStorage.setItem("token", result?.data?.token);

      notify(result.status, result.message);
      reset();
    } else notify(result.status, result.message);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="auth-box">
          <form onSubmit={handleSubmit(handleRegister)}>
            <h1>Signup</h1>
            <p>Welcome! Create new account</p>

            <div className="form-control">
              <p>First Name</p>
              <input
                {...register("firstName")}
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <p className="error">{errors.firstName?.message}</p>
              )}
            </div>

            <div className="form-control">
              <p>Last Name</p>
              <input {...register("lastName")} placeholder="Enter Last Name" />
              {errors.lastName && (
                <p className="error">{errors.lastName?.message}</p>
              )}
            </div>

            <div className="form-control">
              <p>Phone no</p>
              <input placeholder="Enter Phone Number" {...register("phone")} />
              {errors.phone && <p className="error">{errors.phone?.message}</p>}
            </div>

            <div className="form-control">
              <p>Email</p>
              <input placeholder="Enter Email" {...register("email")} />
              {errors.email && <p className="error">{errors.email?.message}</p>}
            </div>

            <div className="form-control">
              <p>Password</p>
              <input placeholder="Password" {...register("password")} />
              {errors.password && (
                <p className="error">{errors.password?.message}</p>
              )}
            </div>

            <p className="forgot-text">Forgot Password?</p>

            <div className="form-control">
              <input type="submit" value="Signup" />
            </div>

            <p className="signup-text">
              Already have account?
              <span>
                <Link to="/">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Rightbar />
    </div>
  );
};

export default Signup;
