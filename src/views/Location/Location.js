import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import {  SectionAlternate } from 'components/organisms';
import { Contact, Form, Hero } from './components';

import { mapData } from './data';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));

const Location = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Hero />
      <Contact data={mapData} />
      {/* <SectionAlternate>
        <Form />
      </SectionAlternate> */}
      <Divider />
    </div>
  );
};

export default Location;
