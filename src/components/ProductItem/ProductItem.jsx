import React from "react";
import "./ProductItem.css";
import Button from "../Button/Button";

const ProductItem = ({ className, product, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  return (
    <div className={"product" + className}>
      <div className={"img"}></div>
      <div className={"title"}></div>
      <div className={"description"}></div>
      <div className={"price"}>
        <span>
          Price: <b>{product.price}</b>
        </span>
      </div>
      <Button onClick={onAddHandler} className={"add-btn"}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductItem;
