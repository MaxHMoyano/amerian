import React from "react";
import WelcomePage from "./welcomePage";
import { useSelector } from "react-redux";

function MainContainer() {
  const isUserLoading = useSelector(({ auth }) => auth.isUserLoading);

  return isUserLoading ? (
    <WelcomePage></WelcomePage>
  ) : (
    <div className='main_container'>Hello</div>
  );
}

export default MainContainer;
