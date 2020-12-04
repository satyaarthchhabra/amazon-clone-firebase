/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Home,
  Cart,
  Login,
  Orders,
  Profile,
  Payment,
  ProductList,
} from "./components";
import { Header, Footer } from "./layout";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { auth, db } from "./firebase/firebaseConfig";
import { useStateValue } from "./context/StateProvider";

const promise = loadStripe(
  "pk_test_51GoSJxAItgkmdP1PK6MEKu6jKtSvPvIkc7fA4v83PhWzS4znGkC5AAkfbelCPPEe4NSbxQrUz2pJutDPg2DSg1SE00JCvV06ob"
);

function App() {
  const [profile, setProfile] = useState([]);
  const [products, setProducts] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // user is logged in
      dispatch({
        type: "SET_USER",
        user: authUser ? authUser : null,
      });
    });

    return () => {
      // any cleanup
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && profile) {
      db.collection("users")
        .doc(user?.uid)
        .collection("profile")
        .onSnapshot((snapshot) =>
          setProfile(snapshot.docs.map((doc) => doc.data()))
        );
    } else setProfile([]);

    if (user && products) {
      db.collection("products")
        .doc()
        .collection("products")
        .onSnapshot((snapshot) =>
          setProducts(snapshot.docs.map((doc) => doc.data()))
        );
    } else setProducts([]);
  }, [user]);

  useEffect(() => {
    dispatch({
      type: "SET_PROFILE",
      userName: profile[0],
    });
  }, [profile]);

  // console.log(products);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/cart">
            <Header />
            <Cart />
            <Footer />  
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
            <Footer />
          </Route>
          <Route path="/products">
            <Header />
            <ProductList />
          <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
