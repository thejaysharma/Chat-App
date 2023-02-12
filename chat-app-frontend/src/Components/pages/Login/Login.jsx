import React, { useState, useEffect } from "react";
import "./login.scss";
import LOGINIMG from "../../../Assest/login.png";
import { Link, useNavigate } from "react-router-dom";
import LOGO from "../../../Assest/logo.webp";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      localStorage.setItem("name", res.name);
      localStorage.setItem("image", res.avatarUrl);
      navigate("/chat");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorMsg(error.response.data.message);
      }
    }
  };

  return (
    <div className="login" id="login">
      <div className="container login_container">
        <div className="box1">
          <img src={LOGINIMG} alt="login" />
        </div>
        <div className="box2">
          <div className="logo">
            <img src={LOGO} alt="logo" />
            <h2>Welcome to ChatApp</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input_box">
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                value={data.email}
              />
              <label htmlFor="email" className="label-name">
                Email Address
              </label>
              <MdOutlineMailOutline className="input_icons" />
            </div>
            <div className="input_box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                value={data.password}
                className="input_pass"
              />
              <label htmlFor="password" className="label-name">
                Password
              </label>
              <BsKey className="input_icons" />
              {!showPassword ? (
                <AiOutlineEyeInvisible
                  className="show_pass"
                  onClick={togglePassword}
                />
              ) : (
                <AiOutlineEye className="show_pass" onClick={togglePassword} />
              )}
            </div>
            {errorMsg && (
              <div className="error_message input_box">{errorMsg}</div>
            )}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <div className="signup">
              <p>
                Don't have an account ?<Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
