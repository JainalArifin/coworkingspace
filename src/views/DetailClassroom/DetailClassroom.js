import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, colors } from '@material-ui/core';
import {
  Section,
  SectionAlternate,
  CardJobMinimal,
  CardBase,
} from 'components/organisms';
import { useRouter } from 'next/router';
import axios from 'axios';
import { IconText } from 'components/atoms';
import { SERVICES } from '../../configs';

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
  classCard: {
    // backgroundColor: 'white',
    padding: '5px 0',
    marginBottom: 10,
    borderRadius: 5,
    border: '1px solid #bdbbbb',
    // cursor: 'not-allowed',
  },
  footerNewsletterSection: {
    background: theme.palette.primary.main,
  },
  video: {
    width: '100%',
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

const DetailClassroom = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [video, setVideo] = useState({});

  const classes = useStyles();
  const {
    query: { id },
  } = useRouter();

  const getData = () => {
    // localStorage.setItem('video-class', '');
    setLoading(true);

    if (localStorage.getItem('video-class')) {
      setVideo(JSON.parse(localStorage.getItem('video-class')));
    }

    if (id) {
      axios
        .get(`${SERVICES.GET_KELAS_MEBER}/${id}`)
        .then(({ data }) => {
          if (data.videos[0]) {
            if (!localStorage.getItem('video-class')) {
              localStorage.setItem(
                'video-class',
                JSON.stringify(data.videos[0]),
              );
              selectVideo(data.videos[0]);
              setVideo(data.videos[0]);
            }
          }

          setData(data);
          setLoading(false);
        })
        .catch(err => setError(err));
    }
  };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const selectVideo = item => {
    axios
      .put(
        `${SERVICES.WATCH_KELAS_MEMBER}/${id}`,
        {
          videoId: item._id,
        },
        {
          headers: {
            Authorization: localStorage.getItem('user-member'),
          },
        },
      )
      .then(() => {
        getData();
        setVideo(item);
        localStorage.setItem('video-class', JSON.stringify(item));
      });
  };

  return (
    <div className={classes.root}>
      <Section>
        <Grid container justify="center" style={{ marginBottom: 30 }}>
          <Typography
            variant="h3"
            color="textPrimary"
            align="left"
            className={classes.fontWeight700}
          >
            {loading
              ? 'Loading ...'
              : data.classRoomId && data.classRoomId.title}
          </Typography>
        </Grid>
        <CardBase>
          {loading ? (
            <Typography
              variant="h6"
              color="textPrimary"
              align="left"
              className={classes.fontWeight700}
            >
              Loading ....
            </Typography>
          ) : (
            <>
              <iframe
                className={classes.video}
                src={video.videoLink}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </>
          )}
        </CardBase>
        <Grid
          container
          justify="center"
          direction="column"
          style={{ marginTop: 30 }}
        >
          <Typography
            variant="h6"
            color="textPrimary"
            align="center"
            className={classes.fontWeight700}
          >
            {loading ? 'Loading ...' : video.title}
          </Typography>
          {/* <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: 10 }}
            onClick={()=>handleNext()}
            >
            Lanjutkan
          </Button> */}
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

            if (data.videos) {
              return (
                data.videos.length !== 0 &&
                data.videos.map((item, idx) => (
                  <Grid
                    item
                    key={idx}
                    xs={12}
                    data-aos="fade-up"
                    className={classes.classCard}
                    style={{
                      backgroundColor: item.isWatch ? '#ee2953' : 'white',
                      cursor: item.isWatch ? 'not-allowed' : 'pointer',
                      color: item.isWatch && 'white',
                    }}
                    onClick={() => !item.isWatch && selectVideo(item)}
                  >
                    <IconText
                      fontIconClass="fa fa-play"
                      color={colors.purple[500]}
                      title={item.title}
                    />
                  </Grid>
                ))
              );
            }
            return null;
          })()}
        </Grid>
      </SectionAlternate>
    </div>
  );
};

export default DetailClassroom;
