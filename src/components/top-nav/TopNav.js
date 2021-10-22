import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import logo from '../../assets/images/logo_92.jpg';
import Call from '@material-ui/icons/Call';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import './TopNav.scss';

export default function TopNav() {
  return (
    <nav className="nav-area" role="navigation">
      <AppBar color="default">
          <Toolbar className="max-container">
            <Link to="/" className="logo">
              <img src={logo} alt="Recipe Book Icon" />
              <span>Recipe Book</span>
            </Link>
            {/* <div className="right">
              <IconButton aria-label="call"><Call/></IconButton>
              <IconButton aria-label="facebook"><ShoppingCart/></IconButton>
            </div> */}
          </Toolbar>
      </AppBar>
    </nav>
  );
}