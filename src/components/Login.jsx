import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { User } from "../actions/index";

export const Login = () => {
  const [login, setLoginData] = useState({
    user: "kminchelle",
    pass: "0lelplR",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    sendData();
  };

  async function sendData() {
    const controller = new AbortController();
    const response = await fetch("https://dummyjson.com/auth/login", {
      signal: controller.signal,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: login.user,
        password: login.pass,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      dispatch(User(data));
      localStorage.setItem("AUTH_TOKEN", data.token);
      navigate("/home", { replace: true });
    }
    return () => {
      controller.abort();
    };
  }

  return (
    <div>
      <section className="flex items-center justify-center dark bg-gray-900 w-screen h-screen">
        <div className="flex flex-col sm:flex-row items-stretch justify-center w-4/5 rounded sm:rounded-none md:w-1/2">
          <img
            src="https://i.ibb.co/fY36j6Z/html-content-titled-hyperlink-title-photo-1479064312651-24524fb55c0e.jpg"
            className="w-1/3 object-contain hidden lg:block md:object-fill"
            alt="login-cover"
          />
          <div className="flex flex-col items-center justify-center gap-6 bg-gray-800 w-full sm:w-4/5 md:w-9/12 lg:1/2 rounded p-6">
            <h3 className="text-white text-3xl">Login</h3>
            <div className="flex flex-col sm:w-[20rem] md:w-[15rem]">
              <label className="text-white font-poppins">Username</label>
              <input
                type="text"
                name="user"
                placeholder="Enter your username"
                onChange={onChangeHandler}
                value={login.user}
                className="h-8 rounded p-1 leading-8 font-poppins sm:w-[20rem] md:w-[15rem]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-white font-poppins">Password</label>
              <input
                type="password"
                name="pass"
                placeholder="Enter your Password"
                onChange={onChangeHandler}
                value={login.pass}
                className="h-8 rounded p-1 leading-8 font-poppins sm:w-[20rem] md:w-[15rem]"
              />
            </div>
            <button
              className="bg-cyan-400 font-bold font-poppins px-6 py-2 rounded my-2"
              onClick={onSubmitHandler}
            >
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
