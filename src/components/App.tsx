import React from "react";
import DashBoard from "./DashBoard";
import Error from "./Error";
import "./index.css";
import Login from "./Login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import { UseAppDispatch, UseAppSelector } from "./Hooks";
import { auth, db } from "../firebase";
import { getRedirectResult } from "firebase/auth";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="login" element={<Login />} />

        {/* <Route path="/dashboard">
          <DashBoard />
        </Route> */}

        {/* <Route path="/login">
          <Login />
        </Route> */}

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
