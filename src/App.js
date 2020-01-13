import React from "react";
import Login from "./components/login/Login";
import MainContainer from "./components/layout/MainContainer";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isUserLoading = useSelector(state => state.auth.isUserLoading);

  return (
    <div className='app'>
      {!isAuthenticated && !isUserLoading ? <Login /> : <MainContainer />}
    </div>
  );
}

export default App;
