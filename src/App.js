/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {trimmer} from "./utils/basicUtils"
import {
  Home,
  Cart,
  Login,
  Orders,
  Profile,
  Payment,
  ProductList,
  GlobalStyles,
} from "./components";
import { Header, Footer, DashboardLayout } from "./layout";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { auth, db } from "./firebase/firebaseConfig";
import { useStateValue } from "./context/StateProvider";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import {
  DashboardView,

  CustomerListView,
  OrdersListView,

  ProductListView,
  NotFoundView,
} from "./views";

const promise = loadStripe(
  "pk_test_51GoSJxAItgkmdP1PK6MEKu6jKtSvPvIkc7fA4v83PhWzS4znGkC5AAkfbelCPPEe4NSbxQrUz2pJutDPg2DSg1SE00JCvV06ob"
);

function App() {
  const [profile, setProfile] = useState([]);
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
      
  }, [user]);

  useEffect(() => {
    try {
      db.collection("products").onSnapshot((snapshot) => {
        dispatch({
          type: "ADD_TO_PRODUCTS",
          payload: snapshot.docs.map((contentObj) => ({
            ...contentObj.data(),
            docId: contentObj.id,
          })),
        });
      });
      
      db.collectionGroup("profile").onSnapshot((snapshot) => {
        dispatch({
          type:"SET_ALL_USERS",
          payload:trimmer(snapshot.docs.map((doc) => ({...doc.data(),docId:doc.id}))),
        })
      });
      db.collectionGroup("orders").onSnapshot((snapshot) => {
        dispatch({
          type:"SET_TOTAL_ORDERS",
          payload:snapshot.docs.map(doc => doc.data()),
        })
      });
      
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_PROFILE",
      userName: profile[0],
    });
  }, [profile]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/cart">
            <Header />
            <Cart />
            <Footer />
          </Route>
          <Route path="/admin/dashboard">
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <DashboardLayout>
                <DashboardView />
              </DashboardLayout>
            </ThemeProvider>
          </Route>
          <Route path="/admin/customers">
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <DashboardLayout>
                <CustomerListView />
              </DashboardLayout>
            </ThemeProvider>
          </Route>
          <Route path="/admin/orders">
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <DashboardLayout>
                <OrdersListView />
              </DashboardLayout>
            </ThemeProvider>
          </Route>
          <Route path="/admin/products">
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <DashboardLayout>
                <ProductListView />
              </DashboardLayout>
            </ThemeProvider>
          </Route>
          <Route path="/admin/">
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <DashboardLayout>
                <DashboardView />
              </DashboardLayout>
            </ThemeProvider>
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
          <Route path="/" exact>
            <Header />
            <Home />
            <Footer />
          </Route>
          <Route path="*">
            <NotFoundView/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
