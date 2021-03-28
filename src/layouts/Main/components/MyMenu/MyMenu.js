import React, { useState } from 'react';
import { AccountCircleOutlined } from '@material-ui/icons';
import { Button, Menu, MenuItem } from '@material-ui/core';

export default function MyMenu({
  setLogin
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user-member');
    handleClose();
    setLogin(false);
    
    window.location.reload();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<AccountCircleOutlined />}
        style={{ width: 150 }}
        onClick={handleClick}
      >
        My Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{
          top: 50,
        }}
      >
        <MenuItem onClick={handleClose}>
          <a href="my-dashboard">My Dashboard</a>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
