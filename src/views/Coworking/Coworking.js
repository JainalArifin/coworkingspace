import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'components/organisms';
import {
  About,
  Application,
  Hero,
  SectionRoom,
  Props,
  Spaces,
} from './components';
import { SERVICES } from '../../configs';

import { properties } from './data';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  appBarBottom: {
    top: 'auto',
    bottom: 0,
    background: 'transparent',
    boxShadow: 'none',
  },
  toolbarBottom: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  chatIconButton: {
    position: 'absolute',
    right: theme.spacing(3),
    left: 'auto',
    top: theme.spacing(-3),
    background: theme.palette.primary.main,
    width: 55,
    height: 55,
    boxShadow: '0 2px 10px 0 rgba(23,70,161,.11)',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
  forumIcon: {
    color: 'white',
    width: 25,
    height: 25,
  },
  contactForm: {
    padding: theme.spacing(3, 2),
    maxWidth: 800,
    margin: '0 auto',
  },
}));

const Coworking = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = () => {
    setLoading(true);
    axios
      .get(SERVICES.GET_ROOMS)
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={classes.root}>
      <Hero />
      <SectionAlternate>
        <About />
      </SectionAlternate>
      <Section>
        <SectionRoom 
          data={data} 
          loading={loading} 
          error={error} 
        />
      </Section>
      <Divider />
      <Section>
        <Spaces />
      </Section>
      <SectionAlternate>
        <Props data={properties} />
      </SectionAlternate>
      <Divider />
      <Section>
        <Application />
      </Section>
      <Divider />
    </div>
  );
};

// Coworking.getInitialProps = () => {
//   const [{ data: queryData, loading, error }] = useAxios({
//     url: SERVICES.GET_ROOMS,
//     method: 'GET',
//   });

//   return {
//     queryData,
//     loading,
//     error,
//   };
// };

export default Coworking;
