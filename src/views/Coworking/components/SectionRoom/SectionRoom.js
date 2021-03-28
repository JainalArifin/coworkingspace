import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import {
  useMediaQuery,
  Grid,
  Typography,
  Button,
  colors,
  Avatar,
} from '@material-ui/core';
import { LearnMoreLink, Image } from 'components/atoms';
import { SectionHeader, SwiperImage } from 'components/molecules';
import { CardProduct, CardLoading } from 'components/organisms';

const useStyles = makeStyles(theme => ({
  root: {},
  swiperNavButton: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    padding: `${theme.spacing(2)}px !important`,
  },
  locationCardPrice: {
    padding: theme.spacing(1),
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    background: 'white',
    borderRadius: theme.spacing(1),
    zIndex: 3,
  },
  fontWeight700: {
    fontWeight: 700,
  },
  locationCardReviewAvatar: {
    marginLeft: theme.spacing(-2),
    border: '3px solid white',
    '&:first-child': {
      marginLeft: 0,
    },
  },
  locationCardReviewStar: {
    color: colors.yellow[800],
    marginRight: theme.spacing(1 / 2),
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
  },
  image: {
    borderBottomLeftRadius: '40%',
  },
}));

const SectionRoom = ({
  data: { data },
  loading,
  error,
  className,
  ...rest
}) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title={
          <span>
            Terdapat Beberapa ruangan nyaman{' '}
            <span className="text-highlighted__primary">
              Raih mimpimu di Trackingspace 1
            </span>
          </span>
        }
        subtitle="Misi kami adalah membantu Anda mengembangkan bisnis, bertemu, dan terhubung dengan orang-orang yang memiliki minat yang sama. Kami membantu Anda memenuhi potensi terbaik Anda melalui pengalaman gaya hidup yang menarik."
        fadeUp
      />
      <Grid container spacing={2}>
        {(() => {
          if (loading) {
            return (
              <>
                <Grid item xs={12} sm={6}>
                  <CardLoading />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardLoading />
                </Grid>
              </>
            );
          }
          if (data) {
            return data.map((item, index) => (
              <Grid key={index} item xs={12} sm={12} md={6}>
                <CardProduct
                  withShadow
                  liftUp
                  mediaContent={
                    <>
                      <Image
                        className={classes.image}
                        src={`https://api-trackingspace.herokuapp.com/${item.imgLink}`}
                        alt={item.title}
                        lazyProps={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <div className={classes.locationCardPrice}>
                        <Typography
                          variant="body1"
                          color="primary"
                          className={classes.fontWeight700}
                        >
                          {/* {item.price} */}
                        </Typography>
                      </div>
                    </>
                  }
                  cardContent={
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          align="left"
                          className={classes.fontWeight700}
                        >
                          {item.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          align="left"
                        >
                          {item.type}
                        </Typography>
                      </Grid>
                      <Grid item container xs={12}>
                        <Grid item container xs={12}>
                          {/* {item.facility.map((list, index) => {
                            return (
                              <>
                                <p key={index}>
                                  {list}
                                  {item.facility.length - 1 !== index && ','}
                                </p>
                                &nbsp;
                              </>
                            );
                          })} */}
                        </Grid>
                      </Grid>
                      <Grid item container justify="flex-end" xs={12}>
                        <p>{item.roomDetail}</p>
                      </Grid>
                    </Grid>
                  }
                />
              </Grid>
            ));
          }

          return null;
        })()}
        {/* {data.map((item, index) => (
          <Grid key={index} item xs={12} sm={12} md={6} data-aos="fade-up">
            <CardProduct
              withShadow
              liftUp
              mediaContent={
                <>
                  <SwiperImage
                    navigationButtonStyle={classes.swiperNavButton}
                    items={item.imgLink}
                    imageClassName={classes.image}
                  />
                  <div className={classes.locationCardPrice}>
                    <Typography
                      variant="body1"
                      color="primary"
                      className={classes.fontWeight700}
                    >
                      {item.price}
                    </Typography>
                  </div>
                </>
              }
              cardContent={
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      color="textPrimary"
                      align="left"
                      className={classes.fontWeight700}
                    >
                      {item.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      align="left"
                    >
                      {item.type}
                    </Typography>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item container xs={12}>
                      {item.facility.map((list, index) => {
                        return (
                          <>
                            <p key={index}>
                              {list}
                              {item.facility.length-1 !== index && ','}
                            </p>
                            &nbsp;
                          </>
                        );
                      })}
                    </Grid>
                  </Grid>
                  <Grid item container justify="flex-end" xs={12}>
                    <p>{item.roomDetail}</p>
                  </Grid>
                </Grid>
              }
            />
          </Grid>
        ))} */}
      </Grid>
    </div>
  );
};

SectionRoom.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default SectionRoom;
