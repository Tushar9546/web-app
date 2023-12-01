import React from "react";
import "../Styles/Navbar.css";
import { Image } from "@chakra-ui/react";

function ProductCard({ item }) {
  return (
    <div className="grid-item">
      <Image className="grid-item" src={item.urls.thumb} />
    </div>
  );
}

export default ProductCard;
