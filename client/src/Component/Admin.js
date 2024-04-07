
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace these with your actual fetch calls
        const internResponse = await axios.get('http://localhost:5000/api/intern');
        const internData = internResponse.data;
        const employeeResponse = await axios.get('http://localhost:5000/api/employee');
        const employeeData = employeeResponse.data;
        const traineeResponse = await axios.get('http://localhost:5000/api/trainee');
        const traineeData = traineeResponse.data;

        const allUserData = [...internData, ...employeeData, ...traineeData];

        // Assuming these are fetched from localStorage
        const username = localStorage.getItem('userName');
        const userid = localStorage.getItem('userId');
        const password = ''; // Assuming password is stored securely or not needed for fetching user details

        // Find user details
        const userDetails = allUserData.find(user => user.id === userid && user.name === username);
        
        if (userDetails) {
          setUserDetails(userDetails);
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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="User Details" />
          </ListItemButton>
        </ListItem>
        {userDetails && Object.entries(userDetails).map(([key, value]) => (
          <ListItem key={key} disablePadding>
            <ListItemButton>
              <ListItemText primary={`${key}: ${value}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/admin" className="nav-logo">
            <span>WELCOME </span>
            {/* <i className="fas fa-code"></i> */}
           
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink>
              
              <Button onClick={() => setOpen(true)} style={{ color: 'white' }}>Open Drawer</Button>

      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    
  
              
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
               Schedule
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
                Assign_Training
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Progress
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

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