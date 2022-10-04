import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "../Pages/Cart";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import PrivateRoute from "./PrivateRoute";


const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          // <PrivateRoute>
            <Home />
          // </PrivateRoute>
        }
      ></Route>
      <Route
        path="/cart"
        element={
          // <PrivateRoute>
            <Cart />
          // </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default AllRoutes;
