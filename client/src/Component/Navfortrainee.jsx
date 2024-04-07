import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
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
        const internResponse = await axios.get('http://localhost:5000/api/intern');
        const internData = internResponse.data;
        const employeeResponse = await axios.get('http://localhost:5000/api/employee');
        const employeeData = employeeResponse.data;
        const traineeResponse = await axios.get('http://localhost:5000/api/trainee');
        const traineeData = traineeResponse.data;

        const allUserData = [...internData, ...employeeData, ...traineeData];

        const username = localStorage.getItem('userName');
        const userid = localStorage.getItem('userId');
        const role = localStorage.getItem('Role');

        const userDetails = allUserData.find(user => user.id === userid && user.name === username);

        if (userDetails && role === 'intern') {
          setUserDetails(userDetails);
          setOpen(true);
        } else {
          console.log('User not found or not an intern');
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
          <NavLink  className="nav-logo">
            <span>Welcome </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Button onClick={() => setOpen(true)} style={{ color: 'white' }}>Profile</Button>
              <Drawer open={open} onClose={() => setOpen(false)}>
                {DrawerList}
              </Drawer>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/intern2"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/intern2"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Modules
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
