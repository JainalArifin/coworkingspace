import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography } from '@material-ui/core';
import {
  Section,
  SectionAlternate,
  CardJobMinimal,
  CardBase,
} from 'components/organisms';
import { Form, Kelas } from './components';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SERVICES } from '../../configs';
import { decodeToken } from '../../utils/converter';

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

const MyDashboard = () => {
  const [category, setCategory] = useState('kelas');
  const [userId, setUserId] = useState('');


  const classes = useStyles();

  useEffect(() => {
    const token = localStorage.getItem('user-member');

    if (token) {
      const { userId } = decodeToken(token);
      setUserId(userId);
    }
  }, []);


  return (
    <div className={classes.root}>
      <SectionAlternate>
        <Grid container spacing={2}>
          <Typography
            variant="h4"
            color="textPrimary"
            align="left"
            className={classes.fontWeight700}
          >
            Dashboard saya
          </Typography>
        </Grid>
      </SectionAlternate>
      <Section>
        <Grid container>
          <Button
            onClick={() => setCategory('kelas')}
            color={category === 'kelas' ? 'primary' : ''}
            variant={category === 'kelas' ? 'contained' : 'outlined'}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            Kelas saya
          </Button>
          <Button
            onClick={() => setCategory('akun-saya')}
            color={category === 'akun-saya' ? 'primary' : ''}
            variant={category === 'akun-saya' ? 'contained' : 'outlined'}
            style={{ marginRight: 5, marginBottom: 5 }}
          >
            Akun saya
          </Button>
        </Grid>
        {category === 'akun-saya' ? <Form userId={userId} /> : <Kelas userId={userId} />}
      </Section>
    </div>
  );
};

export default MyDashboard;
