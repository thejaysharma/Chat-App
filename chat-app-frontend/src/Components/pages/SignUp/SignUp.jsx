import React, { useState, useEffect } from "react";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import SIGNUPIMG from "../../../Assest/signup.png";
import BOTIMG from "../../../Assest/uploadimg.png";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsKey, BsPersonCircle } from "react-icons/bs";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatarUrl: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      navigate("/chat");
    }
  }, [navigate]);

  //image upload
  const [image, setImage] = useState(null);
  const [uploadingIMG, setUploadingIMG] = useState(false);
  const [imagepreview, setImagePreview] = useState(null);

  function validateIMG(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max size of image is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "chat_app_image_preset");
    try {
      setUploadingIMG(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/dunbzfszv/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingIMG(false);
      return urlData.url;
    } catch (error) {
      setUploadingIMG(false);
      console.log(error);
    }
  }
  const handleChange = ({ currentTarget: input }) => {
    setData({
      ...data,
      [input.name]: input.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (!image) {
      return alert("Please Upload your profile picture");
    }
    const urlIMG = await uploadImage(image);
    setData({
      ...data,
      avatarUrl: urlIMG,
    });

    try {
      const url = "https://chat-app-backend-orpin.vercel.app/api/user";
      await axios.post(url, data)
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrorMsg(error.response.data);
      }
    }
  };
  console.log(errorMsg);
  return (
    <div className="signup" id="signup">
      <div className="container signup_container">
        <div className="box1">
          <img src={SIGNUPIMG} alt="signup" />
        </div>

        <div className="box2">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="signup_pic_container">
              <img src={imagepreview || BOTIMG} alt="bot" />
              <label htmlFor="image_upload" className="image_upload_label">
                <IoAddCircleSharp className="upload_icon" />
              </label>
              <input
                type="file"
                id="image_upload"
                hidden
                accept="image/*"
                onChange={validateIMG}
              />
            </div>
            <div className="input_box">
              <input
                type="text"
                name="fullName"
                required
                onChange={handleChange}
                value={data.fullName}
              />
              <label htmlFor="text" className="label-name">
                Full Name
              </label>
              <BsPersonCircle className="input_icons" />
            </div>
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
              Create Account
            </button>
            <div className="login">
              <p>
                Already have an account ?<Link to="/login"> Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
