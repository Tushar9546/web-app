import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";
import "../Styles/SignUp.css";
import "../Styles/Navbar.css";

function AccountScreen() {
  const [data, setData] = useState([]);
  const state = useSelector((state) => state.AccountReducer);

  useEffect(() => {
    setData(state.AllDataList);
  }, [state.AllDataList]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="grid-container">
          {data &&
            data.map((elem) => {
              return <ProductCard key={elem.id} item={elem} />;
            })}
        </div>
      </div>
    </>
  );
}

export default AccountScreen;
