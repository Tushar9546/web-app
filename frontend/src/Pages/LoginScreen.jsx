import React, { useState } from "react";
import {
  Box,
  Button,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import "../Styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toastAlert } from "../Components/utils/action";
import { useDispatch, useSelector } from "react-redux";
import { AuthSignupReducer } from "../Redux/AuthRedux/reducer";
import {
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  LOGIN_SUCCESS,
} from "../Redux/AuthRedux/actionTypes";
const URL_MAIN = process.env.REACT_APP_MAIN_URL;

const loginForMData = {
  email: "",
  password: "",
};

function LoginScreen() {
  let dispatch = useDispatch();
  const Rstate = useSelector((state) => state.AuthSignupReducer);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(loginForMData);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { email, password } = loginData;
    if (email && password) {
      axios
        .post("http://localhost:8080/user/login", {
          data: loginData,
        })
        .then((res) => {
          let status = res.status;
          if (status == 200) {
            toastAlert(toast, "Login Successful", "success");
            localStorage.setItem("token", res.data.token);
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data,
            });
            navigate("/AccountScreen");
          } else if (status === 500) {

            toastAlert(toast, res.data.msg, "error");
          }
        })
        .catch((err) => {
          console.log(err, "aaaaaaaaaaaaaa")
        });
    }
  };

  const hanleRender = () => {
    navigate("/SignUpScreen");
  };
  return (
    <div className="input_wrapper">
      <div className="heading">
        <p>Login</p>{" "}
      </div>
      <Input
        className="input_box"
        variant="flushed"
        onChange={(e) => handleChange(e)}
        name="email"
        type={"email"}
        placeholder="Enter Email Address"
      />
      <Input
        className="input_box"
        variant="flushed"
        onChange={(e) => handleChange(e)}
        name="password"
        type={"password"}
        placeholder="Enter Password"
      />
      <button onClick={handleSubmit} className="submit_btn">
        {" "}
        Login{" "}
      </button>
      <div className="para_page">
        <div className="para">
          {" "}
          <p>New User ?</p>{" "}
        </div>
        <div className="para_link">
          <p onClick={hanleRender}>Click to Sign Up</p>{" "}
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
