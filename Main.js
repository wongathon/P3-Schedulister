import React from "react";
import Navbar from "./sub/Navbar";

const Main = props => (
	<div className="buttons">
	<Link to="/login">Log in</Link>
    <Link to="/signup">Sign up</Link>
	</div>
    <Navbar />
    {props.children}
  </div>
  <div>
    <Navbar />
    {props.children}
  </div>
);

export default Main;