import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, colors, Button } from '@material-ui/core';
import {
  Section,
  SectionAlternate,
  CardReview,
  CardBase,
  CardLoading,
  Notif,
} from 'components/organisms';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SERVICES } from '../../configs';
import { IconText } from 'components/atoms';
import { IconAlternate } from 'components/molecules';
import { decodeToken } from 'utils/converter';

// import Swal from 'sweetalert2'
// import Swal from 'sweetalert2'

// import 'sweetalert2/src/sweetalert2.scss'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  sidebarNewsletter: {
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2),
    },
  },
  footerNewsletterSection: {
    background: theme.palette.primary.main,
  },
  titleClass: {
    fontWeight: 'bold',
  },
  reqruirment: {
    whiteSpace: 'pre',
  },
  classCard: {
    backgroundColor: 'white',
    padding: '5px 0',
    marginBottom: 10,
    borderRadius: 5,
    border: '1px solid #bdbbbb',
    cursor: 'not-allowed',
  },
  video: {
    width: '100%',
    borderRadius: 10,
    [theme.breakpoints.down('lg')]: {
      height: '500px',
    },
    [theme.breakpoints.down('md')]: {
      height: '500px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      height: '175px',
    },
  },
}));

const AboutClass = () => {
  const { push } = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memberId, setMemberId] = useState(false);
  const [openScnackbar, setOpenSnackbar] = useState(false);

  const [video, setVideo] = useState('');

  const classes = useStyles();
  const {
    query: { id },
  } = useRouter();

  const getData = () => {
    setLoading(true);

    if (localStorage.getItem('video-class')) {
      setVideo(JSON.parse(localStorage.getItem('video-class')));
    }

    if (id) {
      const { userId } = decodeToken(localStorage.getItem('user-member'));
      if (userId) {
        setMemberId(userId);
      }
      axios
        .get(`${SERVICES.GET_CLASS}/${id}`, {
          params: {
            memberId: userId,
          },
        })
        .then(({ data }) => {
          if (data.member) {
            setMemberId(userId);
          }

          setData(data);
          setLoading(false);
          if (!localStorage.getItem('video-class')) {
            localStorage.setItem(
              'video-class',
              JSON.stringify(data.videoId[0]),
            );
            setVideo(data.videoId[0]);
          }
        })
        .catch(err => setError(err));
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleDaftar = async () => {
    if (memberId) {
      setLoading(true);
      await axios
        .put(
          `${SERVICES.UPDATE_KELAS(data._id)}`,
          {
            memberId,
          },
          {
            headers: {
              Authorization: localStorage.getItem('user-member'),
            },
          },
        )
        .then(({ data }) => {
          if (data.message !== 'memberId sudah ada') {
            axios
              .post(
                `${SERVICES.ADD_KELAS_MEMBER}`,
                {
                  memberId: memberId,
                  classRoomId: data._id,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem('user-member'),
                  },
                },
              )
              .then(() => {
                getData();
              });
          }
        });
    } else {
      setOpenSnackbar(true)
    }
  };

  return (
    <div className={classes.root}>
      <Section>
        <Grid container justify="center" style={{ marginBottom: 30 }}>
          <Typography
            variant="h3"
            color="textPrimary"
            align="left"
            className={classes.titleClass}
          >
            {loading ? 'Loading ...' : data.title}
          </Typography>
        </Grid>
        <CardBase>
          {loading ? (
            <CardLoading />
          ) : (
            <iframe
              className={classes.video}
              src={video.videoLink}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          )}
        </CardBase>
        <Grid container style={{ marginTop: 30 }} direction="column">
          <Typography
            variant="h5"
            color="textPrimary"
            align="left"
            className={classes.titleClass}
          >
            Tentang
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            align="left"
            className={classes.fontWeight700}
          >
            {loading ? 'Loading ...' : data.classDetail}
          </Typography>
        </Grid>
        <Grid container style={{ marginTop: 30 }} direction="column">
          <Typography
            variant="h5"
            color="textPrimary"
            align="left"
            className={classes.titleClass}
          >
            Syarat Kelas
          </Typography>
          <Typography
            variant="h6"
            color="textPrimary"
            align="left"
            className={classes.reqruirment}
          >
            {loading ? 'Loading ...' : data.classRequirement}
          </Typography>
        </Grid>
        <Grid container style={{ marginTop: 30 }} direction="column">
          <Grid item sm={4}>
            <Box border="1px solid #ccc" borderRadius="4px">
              {() => {
                if (loading) {
                  return <CardLoading />;
                }
                if (data.userId) {
                  return (
                    <CardReview
                      align="left"
                      text="Mentor"
                      withShadow
                      icon={
                        <IconAlternate
                          fontIconClass="fas fa-user-circle"
                          size="medium"
                          color={colors.indigo}
                        />
                      }
                      authorName={data.userId.fullName}
                      authorTitle={data.userId.role}
                      authorPhoto={{
                        src: `https://api-trackingspace.herokuapp.com/${data.userId.imgLink}`,
                      }}
                    />
                  );
                }
                return null;
              }}
            </Box>
          </Grid>
        </Grid>
      </Section>
      <SectionAlternate>
        <Grid container spacing={2}>
          {(() => {
            if (error)
              return (
                <Typography
                  variant="h6"
                  color="textPrimary"
                  align="left"
                  className={classes.fontWeight700}
                >
                  {error}
                </Typography>
              );

            if (loading)
              return (
                <Typography
                  variant="h6"
                  color="textPrimary"
                  align="left"
                  className={classes.fontWeight700}
                >
                  Loading ....
                </Typography>
              );

            if (data.videoId) {
              return data.videoId.map((item, idx) => (
                <Grid
                  item
                  key={idx}
                  xs={12}
                  data-aos="fade-up"
                  className={classes.classCard}
                >
                  <IconText
                    fontIconClass="fa fa-play"
                    color={colors.purple[500]}
                    title={item.title}
                  />
                </Grid>
              ));
            }
            return null;
          })()}
          <Grid container>
            {data && data.member ? (
              <Button
                data-aos="fade-up"
                variant="contained"
                color="primary"
                onClick={() => push('/my-dashboard')}
              >
                Pelajari kelas
              </Button>
            ) : (
              <Button
                data-aos="fade-up"
                variant="contained"
                color="primary"
                onClick={() => handleDaftar()}
              >
                {loading ? 'Loading...' : 'Gabung Kelas'}
              </Button>
            )}
          </Grid>
        </Grid>
      <Notif severity="error" open={openScnackbar} setOpen={setOpenSnackbar} message="anda belum login" />
      </SectionAlternate>
    </div>
  );
};

export default AboutClass;
