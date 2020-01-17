import React from "react";
import Login from "../login/Login";
import MainContainer from "../layout/MainContainer";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isUserLoading = useSelector(state => state.auth.isUserLoading);

  return (
    <div className="app">
      {!isAuthenticated && !isUserLoading ? <Login /> : <MainContainer />}
    </div>
  );
}

export default App;
