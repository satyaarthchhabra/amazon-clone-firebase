/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./App.css";

import { trimmer } from "./utils/basicUtils";
import RouterFile from "./RouterFile";

import "react-toastify/dist/ReactToastify.css";

import { auth, db } from "./firebase/firebaseConfig";
import { useStateValue } from "./context/StateProvider";





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
          type: "SET_ALL_USERS",
          payload: trimmer(
            snapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
          ),
        });
      });
      db.collectionGroup("orders").onSnapshot((snapshot) => {
        dispatch({
          type: "SET_TOTAL_ORDERS",
          payload: snapshot.docs.map((doc) => doc.data()),
        });
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
    <>
      <div className="App">
        <RouterFile />
      </div>
    </>
  );
}

export default App;
