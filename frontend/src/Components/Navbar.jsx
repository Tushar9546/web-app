import React, { useState } from "react";
import "../Styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { getDataAll } from "../Redux/AppRedux/action";

let formData = {
  name: "",
};

function Navbar() {
  const navigate = useNavigate()
  const [data, setData] = useState(formData);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.AccountReducer.data) || [];

  let handleLogout = () => {
    localStorage.removeItem("token");
    return navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmitSearch = () => {
    const { name } = data;
    dispatch(getDataAll(name));
  };

  return (
    <div className="header">
      <div className="header_left">
        <Input
          className="input_box"
          variant="flushed"
          onChange={(e) => handleChange(e)}
          name="name"
          type={"text"}
          placeholder="Serch here"
        />
        <button onClick={handleSubmitSearch} className="submit_btn2">
          search
        </button>
      </div>
      <div className="header_right">
        <button onClick={handleLogout} className="submit_btn1">
          {" "}
          Log Out{" "}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
