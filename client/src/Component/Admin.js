import { NavLink } from "react-router-dom";
import "./Admin.css";
import {  HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

function InternNavBar() {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // State to store user details
  const name = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace these with your actual fetch calls
        const internResponse = await axios.get('http://localhost:5000/api/intern');
        const employeeResponse = await axios.get('http://localhost:5000/api/employee');
        const traineeResponse = await axios.get('http://localhost:5000/api/trainee');

        const allUserData = [
          ...internResponse.data,
          ...employeeResponse.data,
          ...traineeResponse.data
        ];

        // Assuming these are fetched from localStorage
        const username = localStorage.getItem('userName');
        const userid = localStorage.getItem('userId');
        
        // Find user details
        const userDetails = allUserData.find(user => user.id === userid && user.name === username);
        
        if (userDetails) {
          // Filter out MongoDB fields and store the rest in an array-like structure
          const userDetailsArray = Object.entries(userDetails)
            .filter(([key]) => key !== '_id' && key !== '__v')
            .map(([key, value]) => ({ key, value }));

          setUserDetails(userDetailsArray);
          setOpen(true); // Open the drawer
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

 

  const handleClick = () => setClick(!click);

  const handleLogoutClick = () => {
    localStorage.clear();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/admin" className="nav-logo">
            <span>WELCOME {name} </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/newuser"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                CreateUser
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/thirdadmin"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Employee
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/admin2"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Schedule Intern
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/admin4"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Progress
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleLogoutClick}
              >
                Logout
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
   
    </>
  );
}

export default InternNavBar;
