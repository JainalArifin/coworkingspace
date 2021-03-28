import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const ImgProfile = styled.img`
  width: 55px;
  border-radius: 50%;
  height: 55px;
  border: 2px solid white;
  box-shadow: 0px 0px 2px #2e2424;
`;

const NothingImage = styled.div`
  width: 55px;
  border-radius: 50%;
  height: 55px;
  border: 2px solid white;
  box-shadow: 0px 0px 2px #2e2424;
`;

export default function IconUserText({ imgLink, alt, name, role }) {
  return (
    <Grid container style={{ margin: '15px 0' }}>
      <Grid item style={{ marginRight: 15 }}>
        <div>
          {imgLink ? (
            <ImgProfile
              src={`https://api-trackingspace.herokuapp.com/${imgLink}`}
              // alt={alt}
            />
          ) : (
            <NothingImage />
          )}
        </div>
      </Grid>
      <Grid item>
        <h4 style={{ marginBottom: 5 }}>{name}</h4>
        <p>{role}</p>
      </Grid>
    </Grid>
  );
}
