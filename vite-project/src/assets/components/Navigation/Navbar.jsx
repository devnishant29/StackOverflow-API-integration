import React from "react";
import "./Navbar.css";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Dropdown } from "react-bootstrap";

const Navbar = () => {
  const storedUserName = localStorage.getItem("UserName");

  const [username, setUsername] = useState(storedUserName || "");
  console.log(username);

  const getInitials = (name) => {
    // Get the first letter of each word in the name and concatenate them
    const initials = name
      .split(" ")
      .map((word) => word[0])
      .join("");
    return initials.toUpperCase();
  };

  // Get the initial letter for the icon
  const userInitials = getInitials(username);
  console.log(userInitials);

  return (
    <div className="Navigation">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="d-flex justify-content-end align-items-center mb-3">
          <div className="user-icon">{userInitials}</div>
          <Dropdown>
            <Dropdown.Toggle variant="light" id="userDropdown">
              {username || "User"}{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#profile">Profile</Dropdown.Item>
              <Dropdown.Item href="#settings">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/home">
                Home
              </a>
            </li>
            {username !== "" && (
              <li className="nav-item">
                <a className="nav-link" href="/history">
                  History
                </a>
              </li>
            )}
          </ul>
          <form className="form my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
