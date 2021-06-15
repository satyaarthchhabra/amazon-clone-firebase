import React from "react";
import { ToastContainer } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";

import Product from "../Product/Product";
import "./ProductList.css";

function ProductList() {
  const [{ displayProducts }] = useStateValue();


  return (
    <div className="productList">
      <div>
        <ToastContainer />
      </div>
      <div className="productList__row">
        {displayProducts.length === 0 ? (
          <h1 className="productList__notAvailable"> Nothing is there yet</h1>
        ) : (
          ""
        )}
        {displayProducts?.map((product, index) => (
          <Product
            key={product.docId}
            id={product.docId}
            title={product.title}
            price={product.price}
            rating={product.rating}
            image={product.image}
            seller={product.seller}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
