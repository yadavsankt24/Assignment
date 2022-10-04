import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import AuthContextProvider from "./Context/AuthContext/AuthContextProvider";
import CartContextProvider from "./Context/CartContext/CartContextProvider";

// import all context providers
//
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <AuthContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
);

reportWebVitals();
