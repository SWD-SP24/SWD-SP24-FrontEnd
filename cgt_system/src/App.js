import React from "react";
import MainRoutes from "./app/routes/MainRoutes";
import "./app/styles/GlobalStyles/GlobalStyles.scss";
import Chatbot from "./app/components/ChatBot/ChatBot";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      {" "}
      {/* Fragment để bọc MainRoutes và Chatbot */}
      <ToastContainer />
      <MainRoutes />
    </>
  );
}
