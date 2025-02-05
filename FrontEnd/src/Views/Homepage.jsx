import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/HomePage.css";
const Homepage = () => {
  const userData = JSON.parse(localStorage.getItem("user"));

  // console.log(userData);

  return (
    <div className="main">
      <div className="Heading">
        <p className="Heading-welcome">Welcome</p>
        <p className="Heading-username">{userData.name}</p>
      </div>
    </div>
  );
};

export default Homepage;
