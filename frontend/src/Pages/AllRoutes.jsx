import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import AccountScreen from "./AccountScreen";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/SignUpScreen" element={<SignUpScreen />} />
        <Route path="/LoginScreen" element={<LoginScreen />} />
        <Route path="/AccountScreen" element={<AccountScreen />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
