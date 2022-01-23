import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { clearContacts, useContacts } from "../../context/contact/ContactState";
import { logout, useAuth } from "../../context/auth/AuthState";

const Navbar = ({ title, icon }) => {
  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const contactDispatch = useContacts()[1];

  const onLogout = () => {
    logout(authDispatch);
    clearContacts(contactDispatch);
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <Link onClick={onLogout} to="/login">
          <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
        </Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contacts",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
