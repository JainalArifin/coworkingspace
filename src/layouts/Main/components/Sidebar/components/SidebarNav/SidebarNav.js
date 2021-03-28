/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  Typography,
  ListItemIcon,
  Divider,
  Button,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import { AccountCircleOutlined } from '@material-ui/icons';
import { ModalForm, FormLoginRegister } from 'components/organisms';
import MyMenu from 'layouts/Main/components/MyMenu';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  navLink: {
    fontWeight: 300,
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  closeIcon: {
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    marginRight: theme.spacing(8),
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
  divider: {
    width: '100%',
  },
}));

const SidebarNav = props => {
  const { pages, onClose, className, ...rest } = props;
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState('');
  const [isLogin, setLogin] = useState(false);

  const classes = useStyles();
  const router = useRouter();

  // const MenuGroup = props => {
  //   const { item } = props;
  //   return (
  //     <List disablePadding>
  //       <ListItem disableGutters>
  //         <Typography
  //           variant="body2"
  //           color="primary"
  //           className={classes.menuGroupTitle}
  //         >
  //           {item.groupTitle}
  //         </Typography>
  //       </ListItem>
  //       {item.pages.map((page, i) => (
  //         <ListItem disableGutters key={i} className={classes.menuGroupItem}>
  //           <Typography
  //             variant="body2"
  //             component={'a'}
  //             href={page.href}
  //             className={clsx(classes.navLink, 'submenu-item')}
  //             color="textPrimary"
  //             onClick={onClose}
  //           >
  //             {page.title}
  //           </Typography>
  //         </ListItem>
  //       ))}
  //     </List>
  //   );
  // };

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
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={onClose}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Divider className={classes.divider} />
      </ListItem>
      {pages.map((item, idx) => (
        <ListItem className={classes.listItem}>
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

      <ModalForm open={open} setOpen={setOpen}>
        <FormLoginRegister
          isOpen={isOpen}
          setIsOpen={data => setOpen(data)}
          setLogin={data => setLogin(data)}
          handleOpen={data => handleOpen(data)}
        />
      </ModalForm>
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default SidebarNav;
