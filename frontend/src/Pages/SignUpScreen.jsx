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

let formData = {
  name: "",
  email: "",
  password: "",
};

const SignUpScreen = () => {
  let dispatch = useDispatch();
  const Rstate = useSelector((state) => state.AuthSignupReducer);
  const navigate = useNavigate();
  const [data, setData] = useState(formData);
  const toast = useToast();
  const { onClose } = useDisclosure()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const { name, email, password } = data;
    if (email && name && password) {
      axios
        .post("http://localhost:8080/user/signup", { body: data })
        .then((res) => {
          if (res.data.status === 404) {
            toastAlert(toast, res.msg, "error");
            return dispatch({
              type: SIGNUP_FAILURE,
              payload: res.data,
            });
          } else if (res.status === 200) {
            toastAlert(toast, res.msg, "success");
            setTimeout(() => {
              return navigate("/LoginScreen");
            }, 2000);
            console.log(
              dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data,
              })
            );
            return dispatch({
              type: SIGNUP_SUCCESS,
              payload: res.data,
            });
          }
        })
        .catch((err) => {
          toastAlert(toast, "Somthing went wrong", "error");
        });
    } else {
      toastAlert(toast, "All fields are required ", "warning");
    }
  };

  const hanleRender = () => {
    navigate("/LoginScreen");
  };
  return (
    <div className="input_wrapper">
      <div className="heading">
        <p>Sign Up</p>{" "}
      </div>
      <Input
        className="input_box"
        variant="flushed"
        onChange={(e) => handleChange(e)}
        name="name"
        type={"text"}
        placeholder="Enter User Name"
      />
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
        Sign Up{" "}
      </button>
      <div className="para_page">
        <div className="para">
          {" "}
          <p>Allready have an account ?</p>{" "}
        </div>
        <div className="para_link">
          {" "}
          <p onClick={hanleRender}>Sign In</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default SignUpScreen;
