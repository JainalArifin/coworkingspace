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
} from '@material-ui/core';
import { Image, IconText, LearnMoreLink } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { CardProduct, CardLoading } from 'components/organisms';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  root: {},
  fontWeight700: {
    fontWeight: 700,
  },
  coverImage: {
    objectFit: 'cover',
  },
}));

const Events = ({ data: { data }, loading, error, className, ...rest }) => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="Events"
        subtitle="Agenda Terbaru di TrackingSpace"
      />
      <Grid container justify="center" spacing={isMd ? 4 : 2}>
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
            if (data.length === 0) {
              return (
                <Grid item container justify="center">
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.fontWeight700}
                  >
                    Event Belum Tersedia
                  </Typography>
                </Grid>
              );
            }
            return data.map((item, index) => (
              <Grid key={index} item xs={12} md={6} data-aos={'fade-up'}>
                <CardProduct
                  withShadow
                  liftUp
                  mediaContent={
                    <Image
                      className={classes.coverImage}
                      src={`https://api-trackingspace.herokuapp.com/${item.imgLink}`}
                      alt={item.title}
                      lazyProps={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
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
                          {item.title}
                        </Typography>
                      </Grid>
                      <Grid item container alignItems="center" xs={12}>
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          align="left"
                          className={classes.fontWeight700}
                        >
                          Date and Time
                        </Typography>
                        <IconText
                          size="small"
                          fontIconClass="far fa-clock"
                          color={colors.indigo[500]}
                          title={`${moment(item.date).format(
                            'DD MMMM YYYY',
                          )} (${item.time})`}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          align="left"
                          className={classes.fontWeight700}
                        >
                          Description
                        </Typography>
                        <Typography noWrap variant="body2">
                          {item.eventDetail}
                        </Typography>
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
          <Grid key={index} item xs={12} md={4} data-aos={'fade-up'}>
            <CardProduct
              withShadow
              liftUp
              mediaContent={
                <Image
                  className={classes.coverImage}
                  {...item.cover}
                  alt={item.title}
                  lazyProps={{
                    width: '100%',
                    height: '100%',
                  }}
                />
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
                      {item.title}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    wrap="nowrap"
                    xs={12}
                  >
                    <IconText
                      size="small"
                      fontIconClass="far fa-clock"
                      color={colors.indigo[500]}
                      title={item.time}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      noWrap
                      variant="body1"
                      color="primary"
                      className={classes.fontWeight700}
                    >
                      {item.place}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LearnMoreLink title={'Learn more'} variant="body1" href={`/detail-event?title=${item.title}&id=81278127`} />
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

Events.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Events;
