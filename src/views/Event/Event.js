import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Section, SectionAlternate } from 'components/organisms';
import { Faq, Contact, Hero, Events } from './components';
import axios from 'axios';
import { SERVICES } from '../../configs';

import { faq, events } from './data';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
}));

const Event = () => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const getData = () => {
    setLoading(true);
    axios
      .get(SERVICES.GET_EVENT, {
        params: {
          search,
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
  }, []);

  const handleSearch = () => {
    getData();
  };

  const handleChangeSearch =  e => {
   setSearch(e.target.value);
   getData(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Hero
        search={search}
        handleSearch={handleSearch}
        handleChangeSearch={handleChangeSearch}
      />
      <Section>
        <Events data={data} loading={loading} error={error} />
      </Section>
    </div>
  );
};

export default Event;
