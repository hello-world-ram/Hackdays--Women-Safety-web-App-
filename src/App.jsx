import React, { useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Home from "./Pages/Home";
import "./App.css";

function App() {
  const [page, setPage] = useState("login"); // 👈 yaha change

  return (
    <div className="app">
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "forgot" && <ForgotPassword setPage={setPage} />}
      {page === "home" && <Home />}
    </div>
  );
}

export default App;