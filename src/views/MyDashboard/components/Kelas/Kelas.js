import React, { useState, useEffect } from 'react';
import { CardProduct, CardLoading } from 'components/organisms';
import { Grid, Typography, colors } from '@material-ui/core';
import axios from 'axios';
import { SERVICES } from 'configs';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Image, LearnMoreLink, IconText, IconUserText } from 'components/atoms';
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

export default function Kelas({ userId }) {
  const classes = useStyles();
  const { push } = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = () => {
    setLoading(true);
    axios
      .get(`${SERVICES.GET_KELAS_MEBER}`, {
        params: {
          memberId: userId,
        },
      })
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => setError(err));
  };

  useEffect(() => {
    getData();
  }, [userId]);

  const handleMasukKelas = link => {
    localStorage.removeItem('video-class');
    push(link);
  };

  if (loading) {
    return (
      <Grid container spacing={3} style={{ marginTop: 30 }}>
        <Grid item xs={12} sm={4}>
          <CardLoading />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardLoading />
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardLoading />
        </Grid>
      </Grid>
    );
  }

  if (data) {
    // const { data  } = data;
    return (
      <Grid container spacing={3} style={{ marginTop: 30 }}>
        {/* {console.log(data)} */}
        {data.data &&
          data.data.map((item, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <CardProduct
                // className={classes.cardProduct}
                withShadow
                liftUp
                mediaContent={
                  <>
                    <Image
                      src={`https://api-trackingspace.herokuapp.com/${item.classRoomId.imgLink}`}
                      alt={item.classRoomId.title}
                      lazyProps={{ width: '100%', height: '100%' }}
                    />
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
                        {item.classRoomId.title}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <IconUserText
                        imgLink={item.classRoomId.userId.imgLink}
                        alt={item.classRoomId.userId.fullName}
                        name={item.classRoomId.userId.fullName}
                        role={item.classRoomId.userId.role}
                      />
                      <LearnMoreLink
                        title="Masuk ke Kelas"
                        variant="body1"
                        color="secondary"
                        onClick={() =>
                          handleMasukKelas(
                            `/detail-classroom?title=${item.classRoomId.title}&id=${item._id}`,
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
          ))}
      </Grid>
    );
  }
}
