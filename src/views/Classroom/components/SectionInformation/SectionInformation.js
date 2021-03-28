import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { CardPromo } from 'components/organisms';

const useStyles = makeStyles(() => ({
  root: {},
}));

const SectionInformation = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title={
          <span>
            Kelas kami terbuka{' '}
            <span className="text-highlighted__primary">untuk semua</span>
          </span>
        }
        subtitle="Cara terbaik untuk belajar adalah dengan menggunakan keterampilan. Itulah mengapa setiap kelas memiliki proyek yang memungkinkan anda berlatih dan mendapatkan pengalaman baru."
        fadeUp
      />
      <Grid container justify="center" spacing={isMd ? 4 : 2}>
        {data.map((item, index) => (
          <Grid
            key={index}
            item
            container
            alignItems="center"
            direction="column"
            xs={12}
            sm={6}
            md={3}
            data-aos="fade-up"
          >
            <CardPromo
              variant="outlined"
              liftUp
              align={isMd ? 'left' : 'center'}
              title={item.loading ? '...' : item.total}
              subtitle={item.subtitle}
              description={item.description}
              fontIconClass={item.icon}
              color={item.color}
              titleColor="primary"
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

SectionInformation.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default SectionInformation;
