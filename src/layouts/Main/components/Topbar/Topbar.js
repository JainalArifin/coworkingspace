import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  List,
  ListItem,
  Typography,
  IconButton,
  colors,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircleOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { Image } from 'components/atoms';
import { ModalForm, FormLoginRegister } from 'components/organisms';
import MyMenu from '../MyMenu';
import Link from 'next/link';
import { IMAGES } from 'configs'; 

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    background: theme.palette.white,
    borderBottom: `1px solid ${colors.grey[200]}`,
    position: 'sticky',
    top: 0,
    zIndex: 5,
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    maxWidth: 1100,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  navLink: {
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      color: theme.palette.primary.dark,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      color: theme.palette.primary.dark,
    },
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  popover: {
    padding: theme.spacing(4),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 350,
    marginTop: theme.spacing(2),
  },
  iconButton: {
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: theme.palette.primary.dark,
  },
  logoContainer: {
    width: 100,
    height: 35,
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 40,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(5),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen, pages, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState('');
  const [isLogin, setLogin] = useState(false);

  const classes = useStyles();
  const router = useRouter();

  // const berandaPages = pages.beranda;
  // const locationPages = pages.location;
  // const classRoomPages = pages.classRoom;
  // const eventPages = pages.event;

  const ActiveLink = menuRoute => {
    if (!router) return false;

    if (router.pathname === menuRoute) return true;

    if (menuRoute === 'home' && router.pathname === '/') return true;

    if (menuRoute !== '/')
      return router.pathname && router.pathname.includes(menuRoute);
    else return false;
  };

  const handleOpen = isOpen => {
    setOpen(true);
    setIsOpen(isOpen);
  };

  useEffect(() => {
    let isLogin = localStorage.getItem('user-member')
      ? localStorage.getItem('user-member')
      : false;
    setLogin(isLogin);
  }, []);

  return (
    <AppBar
      {...rest}
      position="relative"
      className={clsx(classes.root, className)}
    >
      <Toolbar disableGutters className={classes.toolbar}>
        <div className={classes.logoContainer}>
          <Link href="/" title="tracking-space">
            <Image
              className={classes.logoImage}
              src={IMAGES.LOGO}
              alt="tracking-space"
              lazy={false}
            />
          </Link>
        </div>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <List className={classes.navigationContainer}>
            {pages.map((item, idx) => (
              <ListItem className={classes.listItem} key={idx}>
                <Link href={item.href}>
                  <Typography
                    variant="body1"
                    color={
                      ActiveLink(item.title.toLowerCase())
                        ? 'textPrimary'
                        : 'textSecondary'
                    }
                    className={classes.listItemText}
                    component="p"
                  >
                    {item.title}
                  </Typography>
                </Link>
              </ListItem>
            ))}
            <ListItem>
              {isLogin ? (
                <>
                  <MyMenu setLogin={data => setLogin(data)} />
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleOpen('login')}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 10 }}
                    onClick={() => handleOpen('register')}
                  >
                    Register
                  </Button>
                </>
              )}
            </ListItem>
            {/* <ListItem>
            </ListItem> */}
          </List>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.iconButton}
            onClick={onSidebarOpen}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <ModalForm open={open} setOpen={setOpen}>
        <FormLoginRegister
          isOpen={isOpen}
          setIsOpen={data => setOpen(data)}
          setLogin={data => setLogin(data)}
          handleOpen={data => handleOpen(data)}
        />
      </ModalForm>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object.isRequired,
};

export default Topbar;
