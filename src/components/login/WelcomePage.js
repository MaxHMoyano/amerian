import React from "react";
import { useSelector } from "react-redux";

const WelcomePage = () => {

  const name = useSelector(({ user }) => user.current.first_name);

  return (
    <div className="welcome_page">
      <h2>Hola!</h2>
      <h1>{name}</h1>
    </div>
  );
};

export default WelcomePage;
