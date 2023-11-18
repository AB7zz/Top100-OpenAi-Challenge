import React, { useState, useContext } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Otp from "./pages/Otp/Otp";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Progress from "./pages/Progress/Progress";
import ProgressChart from "./pages/ProgressChart/ProgressChart";
import Test from "./pages/Test/test"
import SetData from "./pages/SetData/SetData";
import BotNav from "./components/BotNav";
import Questions from "./pages/Questions/Questions";
import TopNav from "./components/TopNav";
import { useStateContext } from "./context/StateContext";

function App() {
  const [count, setCount] = useState(0);
  const {userDetails} = useStateContext()
  return (
    <>
      {userDetails && <TopNav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/setdata" element={<SetData />} />
        <Route path="/questions/:id" element={<Questions />} />
        {/* <Route path="/Test" element={<Test />} /> */}
        <Route path="/Test" element={<Test />} />
        <Route path="/progress" element={<Progress/>} />
        <Route path="/progress/:id" element={<ProgressChart/>} />
      </Routes>
      {userDetails && <BotNav />}

    </>
  );
}

export default App;
