import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 40,
  },
  textTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  subTitle: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Biodata({ data, loading, className, ...rest }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="My Data"
        subtitle="Data Pribadi anda"
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        align={'left'}
      />
      {(() => {
        return (
          <Grid container direction="column">
            <Grid item>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.textTitle}
              >
                Fullname :
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.subTitle}
              >
                {loading ? 'Loading...' : data.fullName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.textTitle}
              >
                Email :
              </Typography>
              <Typography
                variant="subtitle1"
                color="textPrimary"
                className={classes.subTitle}
              >
                {loading ? 'Loading...' : data.email}
              </Typography>
            </Grid>
          </Grid>
        );
      })()}
    </div>
  );
}
