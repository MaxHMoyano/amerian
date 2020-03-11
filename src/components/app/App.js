import React from "react";
import Login from "../login/Login";
import MainContainer from "../layout/MainContainer";
import { useSelector } from "react-redux";
import { Router } from "react-router-dom";
import { history } from "../../helpers/history";

function App() {
  const loggedIn = useSelector(({ auth }) => auth.loggedIn);

  return (
    <Router history={history}>
      <div className="app">{!loggedIn ? <Login /> : <MainContainer />}</div>
    </Router>
  );
}

export default App;
