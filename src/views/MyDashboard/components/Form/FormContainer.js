import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Form from './Form';
import Biodata from './Biodata';
import axios from 'axios';
import { SERVICES } from 'configs';

export default function FormContainer({ userId }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getData = () => {
    setLoading(true);
    if (userId !== '') {
      axios
        .get(`${SERVICES.GET_MEMBER}/${userId}`)
        .then(({ data }) => {
          setData(data);
          setLoading(false);
        })
        .catch(err => setError(err));
    }
  };

  useEffect(() => {
    getData();
  }, [userId]);

  return (
    <Grid container spacing={3}>
      <Grid item md={6}>
        <Form userId={userId} getData={getData} />
      </Grid>
      <Grid item md={6}>
        <Biodata data={data} loading={loading} error={error} />
      </Grid>
    </Grid>
  );
}
