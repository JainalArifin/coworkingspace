import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { HeroShaped, Map } from 'components/organisms';

const useStyles = makeStyles(() => ({
  root: {},
  map: {
    zIndex: 9,
  },
  icon: {
    background: 'transparent',
    borderRadius: 0,
  },
}));

const Contact = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <HeroShaped
        leftSide={
          <div>
            <SectionHeader
              title="Working Hours"
              subtitle="09:06 – 21:00"
              subtitleProps={{
                variant: 'body1',
                color: 'textPrimary',
              }}
              data-aos="fade-up"
              align="left"
            />
            <List disablePadding>
              <ListItem disableGutters data-aos="fade-up">
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar
                    src="/gambar/illustrations/contact-icon-phone.png"
                    srcSet="/gambar/illustrations/contact-icon-phone@2x.png 2x"
                    className={classes.icon}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary="Phone ( Reservation )"
                  secondary="(+62)857 0180 1049"
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'subtitle1',
                    color: 'textSecondary',
                  }}
                  secondaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'textPrimary',
                  }}
                />
              </ListItem>
              <ListItem disableGutters data-aos="fade-up">
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar
                    src="/gambar/illustrations/contact-icon-mail.png"
                    srcSet="/gambar/illustrations/contact-icon-mail@2x.png 2x"
                    className={classes.icon}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary="Email"
                  secondary="admin@trackingspace.id"
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'subtitle1',
                    color: 'textSecondary',
                  }}
                  secondaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'textPrimary',
                  }}
                />
              </ListItem>
              <ListItem disableGutters data-aos="fade-up">
                <ListItemAvatar className={classes.listItemAvatar}>
                  <Avatar
                    src="/gambar/illustrations/contact-icon-pin.png"
                    srcSet="/gambar/illustrations/contact-icon-pin@2x.png 2x"
                    className={classes.icon}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={classes.listItemText}
                  primary="Office ( Trasa CoWorking Space )"
                  secondary="Jl. Jenderal Ahmad Yani No.43, Mingkrik, Pakembaran, Kec. Slawi, Tegal, Jawa Tengah 52411"
                  primaryTypographyProps={{
                    className: classes.title,
                    variant: 'subtitle1',
                    color: 'textSecondary',
                  }}
                  secondaryTypographyProps={{
                    variant: 'subtitle1',
                    color: 'textPrimary',
                  }}
                />
              </ListItem>
            </List>
          </div>
        }
        rightSide={
          <Map
            center={[-6.979052, 109.139344]}
            pins={data}
            className={classes.map}
          />
        }
      />
    </div>
  );
};

Contact.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Contact;
