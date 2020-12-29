import React from "react";
import "./Home.css";
import Product from "../Product/Product";
import { toast } from "react-toastify";
import { useEffect } from "react";
import faker from "faker";
import { ToastContainer } from "react-toastify";
import { useStateValue } from "../../context/StateProvider";
import { displayFilter } from "../../utils/basicUtils";

const Home = () => {
    const [{ products, }, ] = useStateValue();
  
    
  useEffect(() => slider(0), []);

  return (
    <div className="home">
      <div className="home__container">
        {/* Image Banner */}

        <div className="home__toast-container">
          <ToastContainer />
        </div>
        <div className="home__slider-container">
          <div className="home__slide">
            <img
              className="home__image "
              src="https://images-eu.ssl-images-amazon.com/images/G/31/skillsstore/2020/August/Medh_Alexa_GW_3000x1200._CB405585145_.jpg"
              alt="image0"
            />
          </div>
          <div className="home__slide">
            <img
              className="home__image "
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonDevices/2019/Post_AugArt/GW_Echo_PC_2x_V2._CB405879256_.jpg"
              alt="image1"
            />
          </div>
          <div className="home__slide">
            <img
              className="home__image"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/M51/8thSept_GW/P38983965_IN_WLME_SamsungGalaxy_M51_New_Launch_DesktopTallHero_2_1500x600._CB405103024_.jpg"
              alt="image2"
            />
          </div>
          <div className="home__slide">
            <img
              className="home__image"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Aug/1500x600_Hero-Tall_np._CB404803728_.jpg"
              alt="image3"
            />
          </div>
          <div className="home__slide">
            <img
              className="home__image"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/SingleTitle/TheBoyss2/3000x1200_Hero-Tall_p._CB404993994_.jpg"
              alt="image4"
            />
          </div>
          <div className="home__slide">
            <img
              className="home__image"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/SamsungM/M51/GWTO/Pre_Launch/P38983965_IN_WLME_SamsungGalaxy_M51_New_Launch_M51_tallhero_1500x600_1._CB405468917_.jpg"
              alt="image5"
            />
          </div>
          <div className="home__slide">
            <img
              className="home__image"
              src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/September/GWBanners/Control/DesktopHero_1500x600._CB405007888_.jpg"
              alt="image6"
            />
          </div>
        </div>
        {/* Product id, title, price, rating, image */}
        <div className="home__row">
          {/* Product */}
          {
              displayFilter(products)?.map((product,index) =>(
                  <Product
                  key={product.docId}
                    id={product.docId}
                    title={product.title}
                    price={product.price}
                    rating={product.rating}
                    image={product.image}
                    seller={product.seller}
                  />
                  
              ))
          }
         
        </div>
      </div>
    </div>
  );
};

function slider(counter) {
  const slides = document.querySelectorAll(".home__image");

  slides.forEach((slide, index) => {
    if (index !== counter) {
      slide.style.visibility = `hidden`;
      slide.classList.add(`image-${index}`);
    }
  });
  moveCorousal(counter, slides, slides.length);
}

function moveCorousal(counter, slides, len) {
  if (slides) {
    if (counter >= len - 1) counter = 0;
    else counter += 1;

    slides.forEach((slide, index) => {
      if (index === counter) {
        slide.style.visibility = `visible`;
      } else {
        slide.style.visibility = `hidden`;
      }
    });
  }
  setTimeout(() => {
    moveCorousal(counter, slides, len);
  }, 5000);

  parseInt(counter) % 2 === 0
    ? setTimeout(() => {
        toast.info(`${faker.name.findName()} added new product to cart`, {
          position: "bottom-left",
        });
      }, 10500)
    : setTimeout(() => {}, 21000);
}

export default Home;
