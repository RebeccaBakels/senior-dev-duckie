import React from "react";

import Duckies from "../components/Duckies";

function Home() {
  return (
    <>
      <img
        className="banner"
        src="assets\banner.png"
        alt="white banner that says Senior Dev Duckie"
      ></img>
      <br />
      <Duckies />
    </>
  );
}

export default Home;
