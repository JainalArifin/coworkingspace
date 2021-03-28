import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Grid,
  List,
  ListItem,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { Image } from 'components/atoms';
import { IMAGES } from 'configs'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '30px 0px',
    background: '#1b1642',
  },
  footerContainer: {
    maxWidth: 1100,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  logoContainerItem: {
    paddingTop: 0,
  },
  logoContainer: {
    width: 120,
    height: 32,
  },
  logoImage: {
    width: '80%',
    height: '100%',
  },
  groupTitle: {
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
    color: 'rgba(255,255,255,.6)',
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
  menuListContainer: {
    padding: '0 !important',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    margin: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
    paddingBottom: theme.spacing(1 / 2),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
    color: 'white',
  },
  divider: {
    width: '100%',
  },
  colorFooter: {
    color: 'rgba(255,255,255,.6)',
    marginTop: '20px',
    padding: '10px',
  },
  linkSocial: {
    marginRight: '10px',
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const Footer = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.footerContainer}>
        <Grid container spacing={4} alignContent="center" alignItems="center">
          <Grid item xs={6} md={4}>
            <List disablePadding>
              <ListItem disableGutters className={classes.logoContainerItem}>
                <div className={classes.logoContainer}>
                  <a href="/" title="trackinng-space">
                    <Image
                      className={classes.logoImage}
                      src={IMAGES.LOGO}
                      alt="trackinng-space"
                      lazy={false}
                    />
                  </a>
                </div>
              </ListItem>
              <ListItem disableGutters>
                <a
                  target="_blank"
                  href="https://www.facebook.com/pages/category/Product-Service/Trasa-Coworking-Space-113313396905429/"
                  className={classes.linkSocial}
                >
                  <IconButton className={classes.socialIcon}>
                    <FacebookIcon className={classes.icon} />
                  </IconButton>
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/coworkingtegal/"
                  className={classes.linkSocial}
                >
                  <IconButton className={classes.socialIcon}>
                    <InstagramIcon className={classes.icon} />
                  </IconButton>
                </a>
                <a
                  target="_blank"
                  href="https://twitter.com/Trasacoworking"
                  className={classes.linkSocial}
                >
                  <IconButton className={classes.socialIcon}>
                    <TwitterIcon className={classes.icon} />
                  </IconButton>
                </a>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6} md={8} className={classes.menuListContainer}>
            <Grid container spacing={0}>
              <Grid item className={classes.listItem}>
                <h4 style={{ color: 'white' }}>
                  Office ( Trasa CoWorking Space ) Jl. Jenderal Ahmad Yani
                  No.43, Mingkrik, Pakembaran, Kec. Slawi, Tegal, Jawa Tengah
                  52411
                </h4>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <hr/> */}
        {/* <Grid container className={classes.colorFooter}>
          <Grid item xs={12} md={8}></Grid>
          <Grid item xs={12} md={4}>
            <a href="terms.php" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>{' '}
            |{' '}
            <a href="privacy.php" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            | All right reserved.
          </Grid>
        </Grid> */}
      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object.isRequired,
};

export default Footer;
