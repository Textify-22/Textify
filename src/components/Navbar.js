import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";

export default function Navbar(props) {
  return (
    <>
      <div style={{display:'flex',justifyContent:'start'}}>
        
      <img src={logo} alt="" width="200px" height="100px"/>
      </div>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  abouttext: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "set title here",
  abouttext: "About",
};
