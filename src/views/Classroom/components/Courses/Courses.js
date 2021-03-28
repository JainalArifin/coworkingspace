import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  colors,
  Button,
  ButtonGroup,
} from '@material-ui/core';
import { Image, LearnMoreLink, IconText, IconUserText } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { CardProduct, CardLoading } from 'components/organisms';
import moment from 'moment';
import { useRouter } from 'next/router';

const useStyles = makeStyles(theme => ({
  root: {},
  cardProduct: {
    borderRadius: theme.spacing(3),
  },
  courseCardPrice: {
    padding: theme.spacing(1),
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    background: 'white',
    borderRadius: theme.spacing(1),
  },
  courseCardReviewAvatar: {
    marginLeft: theme.spacing(-2),
    border: '3px solid white',
    '&:first-child': {
      marginLeft: 0,
    },
  },
  courseCardReviewStar: {
    color: colors.yellow[800],
    marginRight: theme.spacing(1 / 2),
  },
  reviewCount: {
    marginLeft: theme.spacing(1),
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const Courses = ({
  data: { data },
  loading,
  error,
  online,
  category,
  handleChangeOnline,
  handleChangeCategory,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const { push } = useRouter();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const aboutClass = async (item) => {
    await localStorage.removeItem('video-class');
    return push(`/about-class?title=${item.title}&id=${item._id}`);
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title={
          <span>
            Pelajari <span className="text-highlighted">kelas kami </span>
          </span>
        }
        subtitle="Berikut kelas populer kami yang mungkin ingin Anda pelajari."
        fadeUp
      />
      <Grid container justify="center" style={{ marginBottom: 40 }}>
        <ButtonGroup>
          <Button
            onClick={() => handleChangeOnline(true, category)}
            color={online ? 'primary' : ''}
            variant={online ? 'contained' : ''}
          >
            kelas online
          </Button>
          <Button
            onClick={() => handleChangeOnline(false, category)}
            color={online ? '' : 'primary'}
            variant={online ? '' : 'contained'}
          >
            kelas offline
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid
        container
        justify="center"
        alignContent="center"
        style={{ marginBottom: 40 }}
        direction="column"
      >
        <Grid item container justify="center" style={{ marginBottom: 10 }}>
          <h4>Category</h4>
        </Grid>
        <Grid item container justify="center">
          <Button
            onClick={() => handleChangeCategory(online, '')}
            color={category === '' ? 'primary' : ''}
            variant={category === '' ? 'contained' : 'outlined'}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            All
          </Button>
          <Button
            onClick={() => handleChangeCategory(online, 'Developer')}
            color={category === 'Developer' ? 'primary' : ''}
            variant={category === 'Developer' ? 'contained' : 'outlined'}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            Developer
          </Button>
          <Button
            onClick={() => handleChangeCategory(online, 'Designer')}
            color={category === 'Designer' ? 'primary' : ''}
            variant={category === 'Designer' ? 'contained' : 'outlined'}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            Designer
          </Button>
          <Button
            onClick={() => handleChangeCategory(online, 'Data Science')}
            color={category === 'Data Science' ? 'primary' : ''}
            variant={category === 'Data Science' ? 'contained' : 'outlined'}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            Data Science
          </Button>
          <Button
            onClick={() => handleChangeCategory(online, 'Lainnya')}
            color={category === 'Lainnya' ? 'primary' : ''}
            variant={category === 'Lainnya' ? 'contained' : 'outlined'}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            Lainnya
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={isMd ? 4 : 2}>
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
                    {online ? 'Kelas Online' : 'Kelas Offline'} dengan Kategori{' '}
                    {category} belum tersedia
                  </Typography>
                </Grid>
              );
            }
            return data.map((item, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <CardProduct
                  className={classes.cardProduct}
                  withShadow
                  liftUp
                  mediaContent={
                    <>
                      <Image
                        src={`https://api-trackingspace.herokuapp.com/${item.imgLink}`}
                        alt={item.title}
                        lazyProps={{ width: '100%', height: '100%' }}
                      />
                      <div className={classes.courseCardPrice}>
                        {/* <Typography
                          variant="body1"
                          color="primary"
                          className={classes.fontWeight700}
                        >
                          free
                        </Typography> */}
                      </div>
                    </>
                  }
                  cardContent={
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={12}
                        style={{
                          borderBottom: '1px solid #eee',
                          paddingBottom: 15,
                        }}
                      >
                        <Typography
                          variant="h4"
                          color="textPrimary"
                          align="left"
                          className={classes.fontWeight700}
                        >
                          {item.title}
                        </Typography>
                      </Grid>

                      {online ? (
                        <Grid item xs={12}>
                          <IconUserText
                            imgLink={item.userId.imgLink}
                            alt={item.userId.fullName}
                            name={item.userId.fullName}
                            role={item.userId.role}
                          />
                          <LearnMoreLink
                            title="Lihat detail kelas"
                            variant="body1"
                            color="secondary"
                            onClick={() => aboutClass(item)}
                          />
                        </Grid>
                      ) : (
                        <div>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              color="textPrimary"
                              align="left"
                              className={classes.fontWeight700}
                            >
                              Max Participants
                            </Typography>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              align="left"
                            >
                              {item.participants ? item.participants : '-'}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              color="textPrimary"
                              align="left"
                              className={classes.fontWeight700}
                            >
                              Class Requirment
                            </Typography>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              align="left"
                            >
                              {item.classRequirement}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              color="textPrimary"
                              align="left"
                              className={classes.fontWeight700}
                            >
                              Day and Time
                            </Typography>
                            <IconText
                              size="small"
                              fontIconClass="far fa-clock"
                              color={colors.indigo[500]}
                              title={`${item.day ? item.day : '-'} (${
                                item.time ? item.time : '-'
                              })`}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="h6"
                              color="textPrimary"
                              align="left"
                              className={classes.fontWeight700}
                            >
                              Class Detail
                            </Typography>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              align="left"
                            >
                              {item.classDetail}
                            </Typography>
                          </Grid>
                        </div>
                      )}
                    </Grid>
                  }
                />
              </Grid>
            ));
          }
          return null;
        })()}
      </Grid>
    </div>
  );
};

Courses.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Courses;
