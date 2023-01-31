import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Avatar, Box, Divider, Tooltip } from '@material-ui/core';

import logo from '../../assets/commerce.png';
import Uicon from '../../assets/user.png';
import useStyles from './styles';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, ref, set, child, get } from 'firebase/database';
import '../css/navbar.css';

const PrimarySearchAppBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [userName, setUserName] = useState(null);
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('sign out success');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
    // Go to sign up page
    history.push('/signin');
  };

  useEffect(() => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    get(child(ref(db), `personalInfo/${uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUserName(snapshot.val().displayName);
        } else {
          alert(uid);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          component={Link}
          to='/cart'
          aria-label='Show cart items'
          color='inherit'
        >
          <Badge
            overlap='rectangular'
            badgeContent={totalItems}
            color='secondary'
          >
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography
            component={Link}
            to='/shop'
            variant='h6'
            className={classes.title}
            color='inherit'
          >
            <img src={logo} alt='zZ-Commerce' className={classes.image} />{' '}
            zZ-Commerce
          </Typography>
          <div className={classes.grow} />

          {location.pathname === '/shop' && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to='/cart'
                aria-label='Show cart items'
                color='inherit'
              >
                <Badge
                  overlap='rectangular'
                  badgeContent={totalItems}
                  color='secondary'
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}

          <Box
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            <Tooltip title='Account settings'>
              <IconButton
                onClick={handleClick}
                size='small'
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <img alt='' src={Uicon} height='20px' />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            className={classes.dropdownMenu}
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <div className='name'>user name : {userName}</div>
            <Divider component='li' sx={{ borderBottomWidth: 4 }} />
            <MenuItem component={Link} to='/checkouthistory'>
              Checkout History
            </MenuItem>
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default PrimarySearchAppBar;
