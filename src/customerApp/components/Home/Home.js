import React from "react";
import "./Home.css";
import Product from "../Product/Product";

import { ToastContainer } from "react-toastify";
import { useStateValue } from "../../../context/StateProvider";

import Carousel from "./Carousel";
const Home = () => {
  const [{ displayProducts }] = useStateValue();
  
  return (
    <div className="home">
      <div className="home__container">
        {/* Image Banner */}

        <div className="home__toast-container">
          <ToastContainer />
        </div>
        {/* carousel  */}
        <Carousel />
        {/* Product id, title, price, rating, image */}
        <div className="home__row">
          {/* Product */}
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
    </div>
  );
};

export default Home;
