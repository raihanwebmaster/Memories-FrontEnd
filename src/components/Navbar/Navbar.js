// import React, { useEffect, useState } from "react";
// import useStyles from "./styles";

// import memories from "../../images/memories.png";
// import { Link, useHistory, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import decode from "jwt-decode";
// import { AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
// import MoreIcon from '@material-ui/icons/MoreVert';


//  const  Navbar =() =>{
//   const classes = useStyles();
//   const history = useHistory();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
//   console.log(user);
//   const logout = () => {
//     dispatch({ type: "LOGOUT" });
//     history.push("/");
//     setUser(null);
//   };
//   useEffect(() => {
//     const token = user?.token;
//     if (token) {
//       const decodedToken = decode(token);
//       if (decodedToken.exp * 1000 < new Date().getTime()) logout();
//     }
//     setUser(JSON.parse(localStorage.getItem("profile")));
//   }, [location]);
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };
//   const close = (event) => {
//     handleMenuClose();
//     logout();
//   };
//   const menuId = "primary-search-account-menu";
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       onClose={handleMenuClose}
//     ></Menu>
//   );

//   const mobileMenuId = "primary-search-account-menu-mobile";
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{ vertical: "top", horizontal: "right" }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       {user ? (
//         <div>
//           <MenuItem>
//             <Avatar
//               className={classes.purple}
//               alt={user?.result.name}
//               src={user?.result.imageUrl}
//             >
//               {user?.result.name.charAt(0)}
//             </Avatar>
//           </MenuItem>
//           <MenuItem>
//             <Typography variant="h6">{user?.result.name}</Typography>
//           </MenuItem>
//           <MenuItem>
//             <Button
//               className={classes.logout}
//               variant="contained"
//               color="secondary"
//               onClick={close}
//             >
//               Logout
//             </Button>
//           </MenuItem>
//         </div>
//       ) : (
//         <MenuItem>
//           <Button
//             component={Link}
//             to="/auth"
//             variant="contained"
//             color="primary"
//             onClick={handleMenuClose}
//           >
//             {" "}
//             Sign in
//           </Button>
//         </MenuItem>
//       )}
//     </Menu>
//   );

//   return (
//     <div className={classes.grow}>
//       <AppBar className={classes.appBar} position="static" color="inherit">
//         <Toolbar>
//           <div className={classes.brandContainer}>
//             <Typography
//               component={Link}
//               to="/"
//               className={classes.heading}
//               variant="h2"
//               align="center"
//             >
//               Memories
//             </Typography>
//             <img className={classes.image} src={memories} alt="icon" />
//           </div>
//           <div className={classes.grow} />
//           <div className={classes.sectionDesktop}>
//             {user ? (
//               <div className={classes.toolbar}>
//                 <Avatar
//                   className={classes.purple}
//                   alt={user?.result.name}
//                   src={user?.result.imageUrl}
//                 >
//                   {user?.result.name.charAt(0)}
//                 </Avatar>
//                 <Typography className={classes.userName} variant="h6">
//                   {user?.result.name}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   className={classes.logout}
//                   color="secondary"
//                   onClick={logout}
//                 >
//                   Logout
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 component={Link}
//                 to="/auth"
//                 variant="contained"
//                 color="primary"
//               >
//                 {" "}
//                 Sign in
//               </Button>
//             )}
//           </div>
//           <div className={classes.sectionMobile}>
//             <IconButton
//               aria-label="show more"
//               aria-controls={mobileMenuId}
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <MoreIcon />
//             </IconButton>
//           </div>
//         </Toolbar>
//       </AppBar>
//       {renderMobileMenu}
//       {renderMenu}
//     </div>
//   );
// }
// export default Navbar;
import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button, IconButton, MenuItem, Menu } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  const [anchorEl, setAnchorEl] = React.useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
   const handleMobileMenuClose = () => {
     setMobileMoreAnchorEl(null);
   };
   const handleMenuClose = () => {
     setAnchorEl(null);
     handleMobileMenuClose();
   };
   const handleMobileMenuOpen = (event) => {
     setMobileMoreAnchorEl(event.currentTarget);
   };
   const close = (event) => {
     handleMenuClose();
     logout();
   };
   const menuId = "primary-search-account-menu";
   const renderMenu = (
     <Menu
       anchorEl={anchorEl}
       anchorOrigin={{ vertical: "top", horizontal: "right" }}
       id={menuId}
       keepMounted
       transformOrigin={{ vertical: "top", horizontal: "right" }}
       onClose={handleMenuClose}
     ></Menu>
   );
   const mobileMenuId = "primary-search-account-menu-mobile";
   const renderMobileMenu = (
     <Menu
       anchorEl={mobileMoreAnchorEl}
       anchorOrigin={{ vertical: "top", horizontal: "right" }}
       id={mobileMenuId}
       keepMounted
       transformOrigin={{ vertical: "top", horizontal: "right" }}
       open={isMobileMenuOpen}
       onClose={handleMobileMenuClose}
     >
       {user ? (
         <div>
           <MenuItem>
             <Avatar
               className={classes.purple}
               alt={user?.result.name}
               src={user?.result.imageUrl}
             >
               {user?.result.name.charAt(0)}
             </Avatar>
           </MenuItem>
           <MenuItem>
             <Typography variant="h6">{user?.result.name}</Typography>
           </MenuItem>
           <MenuItem>
             <Button
               className={classes.logout}
               variant="contained"
               color="secondary"
               onClick={close}
             >
               Logout
             </Button>
           </MenuItem>
         </div>
       ) : (
         <MenuItem>
           <Button
             component={Link}
             to="/auth"
             variant="contained"
             color="primary"
             onClick={handleMenuClose}
           >
             {" "}
             Sign in
           </Button>
         </MenuItem>
       )}
     </Menu>
   );

  return (
    <div className={classes.grow}>
       <AppBar className={classes.appBar} position="static" color="inherit">
         <Toolbar>
           <div className={classes.brandContainer}>
             <Typography
               component={Link}
               to="/"
               className={classes.heading}
               variant="h2"
               align="center"
             >
               Memories
             </Typography>
             <img className={classes.image} src={memories} alt="icon" />
           </div>
           <div className={classes.grow} />
           <div className={classes.sectionDesktop}>
             {user ? (
               <div className={classes.toolbar}>
                 <Avatar
                   className={classes.purple}
                   alt={user?.result.name}
                   src={user?.result.imageUrl}
                 >
                   {user?.result.name.charAt(0)}
                 </Avatar>
                 <Typography className={classes.userName} variant="h6">
                   {user?.result.name}
                 </Typography>
                 <Button
                   variant="contained"
                   className={classes.logout}
                   color="secondary"
                   onClick={logout}
                 >
                   Logout
                 </Button>
               </div>
             ) : (
               <Button
                 component={Link}
                 to="/auth"
                 variant="contained"
                 color="primary"
               >
                 {" "}
                 Sign in
               </Button>
             )}
           </div>
           <div className={classes.sectionMobile}>
             <IconButton
               aria-label="show more"
               aria-controls={mobileMenuId}
               aria-haspopup="true"
               onClick={handleMobileMenuOpen}
               color="inherit"
             >
               <MoreIcon />
             </IconButton>
           </div>
         </Toolbar>
       </AppBar>
       {renderMobileMenu}
       {renderMenu}
     </div>
   );
};

export default Navbar;
