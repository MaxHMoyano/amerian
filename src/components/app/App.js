import React from "react";
import Login from "../login/Login";
import MainContainer from "../layout/MainContainer";
import { useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const loggedIn = useSelector(({ auth }) => auth.loggedIn);

  return (
    <Router>
      <div className="app">{!loggedIn ? <Login /> : <MainContainer />}</div>
    </Router>
  );
}

export default App;
