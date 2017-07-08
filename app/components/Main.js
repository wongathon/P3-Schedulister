import React from "react";
import Navbar from "./sub/Navbar";

const Main = props => (
  <div>
    <Navbar />
    {props.children}
  </div>
);

export default Main;