import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useStateValue } from "../../../context/StateProvider";
import { auth } from "../../../firebase/firebaseConfig";
import Fuse from "fuse.js";
import Axios from "axios";
import { displayFilter } from "../../../utils/basicUtils";

function Header() {
  const [{ cart, user, profile, products }, dispatch] = useStateValue();
  const [address, setAddress] = useState({});
  const [filterProductsByCategory, setFilterProductsByCategory] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const uniqCategory = [...new Set(products.map((item) => item.category))];

  const fuse = new Fuse(filterProductsByCategory, {
    keys: ["seller", "title", "category", "price", "rating"],
  });
  const login = () => {
    if (user) auth.signOut();
  };

  useEffect(() => {
    const URL =
      "http://api.ipstack.com/116.72.212.165?access_key=1d58bc7d015ef00cfdb4078d50d8863b&format=1";
    const pineCodeFinder = async () => {
      try {
        const { data } = await Axios.get(URL);
        setAddress(data);
      } catch (error) {
        console.log(error);
      }
    };
    pineCodeFinder();
  }, []);
  useEffect(() => {
    setFilterProductsByCategory(displayFilter(products));
  }, [products]);
  const handleCategoryChange = (e) => {
    if (e.target.value === "all") {
      setFilterProductsByCategory(displayFilter(products));
      dispatch({
        type: "SET_DISPLAY_PRODUCTS",
        payload: displayFilter(products),
      });
    } else {
      const filterProducts = displayFilter(products).filter(
        (product) => product.category === e.target.value
      );
      setFilterProductsByCategory(filterProducts);
      dispatch({
        type: "SET_DISPLAY_PRODUCTS",
        payload: filterProducts,
      });
    }
  };
  console.log(filterProductsByCategory);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (!e.target.value) {
      dispatch({
        type: "SET_DISPLAY_PRODUCTS",
        payload: filterProductsByCategory,
      });
    } else {
      const matches = fuse.search(e.target.value);
      dispatch({
        type: "SET_DISPLAY_PRODUCTS",
        payload: matches.map((item) => item?.item),
      });
    }
  };
  return (
    <nav className="header">
      <div className="header__top">
        <div className="header__left-nav">
          <MenuIcon />
        </div>
        {/* Logo on left */}
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
          />
        </Link>

        {/* Search box */}
        <div className="header__search">
          <form className="header__search">
            <select
              name="category"
              id="category"
              onChange={handleCategoryChange}
              className="header__categorySelelctor"
            >
              <option value="all" selected>
                All Categories
              </option>
              {uniqCategory.map((category, index) => (
                <option value={category} key={`${category}-${index}`}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="searchInput"
              value={searchInput}
              onChange={handleInputChange}
              className="header__searchInput"
            />
            <SearchIcon className="header__searchIcon" />
          </form>
        </div>

        <div className="header__flag"></div>

        {/* 3 Links */}
        <div className="header__nav">
          {/* Link 1 - SignIn/SignOut */}
          {user ? (
            <Link to="/" className="header__link">
              <div onClick={login} className="header__option">
                <span className="header__optionLineOne">
                  Hello, {user ? profile?.userName : "Guest"}
                </span>
                <span className="header__optionLineTwo">
                  {user ? "Sign Out" : "Sign In"}
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="header__link">
              <div onClick={login} className="header__option">
                <span className="header__optionLineOne">
                  Hello, {user ? profile?.userName : "User"}
                </span>
                <span className="header__optionLineTwo">
                  {user ? "Sign Out" : "Sign In"}
                </span>
              </div>
            </Link>
          )}
          {/* Link 2 - Return Order */}
          <Link to="/orders" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">Return</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
          {/* Link 3 - Prime */}
          <Link to="/" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">Try</span>
              <span className="header__optionLineTwo">Prime</span>
            </div>
          </Link>
          {/* Link 4 - Profile */}
          <Link to="/profile" className="header__link">
            <div className="header__option">
              <span className="header__optionLineOne">Your</span>
              <span className="header__optionLineTwo">Profile</span>
            </div>
          </Link>
          {/* Basket*/}
          <Link to="/cart" className="header__link">
            <div className="header__optionBasket">
              {/* Shopping Basket Icon*/}
              <ShoppingCartIcon />
              {/* Number of items in basket */}
              <span className="header__optionLineTwo basket__count">
                {cart?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="header__bottom">
        {/* Address */}
        <div className="header__address">
          <div className="header__address-icon">
            <RoomOutlinedIcon />
          </div>
          <div className="header__option">
            <span className="header__optionLineOne">Deliver to</span>
            <span className="header__optionLineTwo">
              {address?.city}({address?.zip})
            </span>
          </div>
        </div>
        {/* Nav */}
        <div className="header__bottom-nav">
          <span>
            <Link to="/products" className="header__link">
              All Products
            </Link>
          </span>
          <span>Mobile</span>
          <span>Best Sellers</span>
          <span>Today's Deak</span>
          <span>Prime</span>
          <span>Computers</span>
          <span>Pantry</span>
          <span>Electronics</span>
        </div>
        {/* Advt */}
        <div className="header__bottom-app">
          <img
            className="header__bottom-image"
            alt="Amazon App"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/MAI/Sweepstakes/June20/SWM_DownloadApp._CB410314483_.jpg"
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
