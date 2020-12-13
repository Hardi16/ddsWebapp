
import React, { useState, useEffect } from "react";
import classes from "./Styles.module.css";
import { Dropdown } from "react-bootstrap";
import { Redirect } from "react-router";


const Navbar = (props) => {
  const [redirect, setRedirect] = useState(null);
  const handleLogout = () => {
    localStorage.clear();
    setRedirect(<Redirect to="/login" />);
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className={classes.profileBtn}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <img
        className={classes.imgProfile}
        src={require("../assets/img-profile.png")}
      />
    </button>
  ));
  const [open, setOpen] = React.useState(false);
  return (
    <div className={classes.navbarContainer}>
       {!localStorage.getItem("userId") ? <Redirect to="/login" /> : null}
        {redirect}
      <div className={classes.evolkoLogoDiv}>
        <img
          className={classes.imgLogo}
          src={require("../assets/logo-white.png")}
        />
      </div>
      <div className={classes.searchBar}></div>
      <div className={classes.profileDiv}>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            Custom toggle
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* <Dropdown.Item eventKey="1">User Account</Dropdown.Item> */}
            <Dropdown.Item
              eventKey="1"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
