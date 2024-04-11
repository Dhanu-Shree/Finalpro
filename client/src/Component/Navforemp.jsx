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
import './Navforintern.css'

function EmpNavBar() {

  const username = localStorage.getItem('userName');
  const userid = localStorage.getItem('userId');
  const role = localStorage.getItem('Role');



  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const handleLogoutClick = () =>{
    localStorage.clear()
  }

   // State to store user details

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

     
        const userDetails = allUserData.find(user => user.id === userid && user.name === username);

        if (userDetails && role === 'employee') {
          setUserDetails(userDetails);
          setOpen(true);
        } else {
          console.log('User not found or not an trainee');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };
  const DrawerList = (
    <Box sx={{ width: 250, textAlign: 'center' }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        <ListItem disablePadding sx={{ borderBottom: '1px solid #ccc' }}>
          <ListItemButton>
            <ListItemText primary="User Details" sx={{ color: 'purple' }} />
          </ListItemButton>
        </ListItem>
        {userDetails &&
          Object.entries(userDetails).map(([key, value]) => {
            // Exclude _id, __v, and password fields
            if (key !== '_id' && key !== '__v' && key !== 'password') {
              return (
                <ListItem key={key} disablePadding sx={{ borderBottom: '1px solid #ccc' }}>
                  <ListItemButton>
                    <ListItemText
                      primary={
                        key === 'dob' ? (
                          <>
                            <span className="blue-text">{`${key}: `}</span>
                            <span>{formatDate(value)}</span>
                          </>
                        ) : (
                          <>
                            <span className="blue-text">{`${key}: `}</span>
                            <span>{value}</span>
                          </>
                        )
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            }
            return null; // Exclude these fields from rendering
          })}
      </List>
    </Box>
  );
  


  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink  className="nav-logo">
            <span className='center'>Welcome {username}</span>
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

export default EmpNavBar;
