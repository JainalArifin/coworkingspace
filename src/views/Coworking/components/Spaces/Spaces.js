import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import { SectionHeader, OverlapedImages } from 'components/molecules';
import { IMAGES } from 'configs';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Spaces = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <SectionHeader
            label="SCALABLE"
            title={
              <span>
                <span className="text-highlighted">
                  Ruang kantor yang fleksibel{' '}
                </span>
                mengembangkan tim Anda itu mudah.
              </span>
            }
            subtitle="Daripada mengkhawatirkan berpindah kantor setiap beberapa tahun, Anda malah dapat tinggal di lokasi yang sama dan tumbuh dari ruang kerja bersama menjadi kantor yang menempati satu lantai."
            align="left"
            fadeUp
            disableGutter
          />
        </Grid>
        <Grid item xs={12} sm={6} data-aos="fade-up">
          <OverlapedImages
            image1={{
              src: IMAGES.SCALABLE_1,
              srcSet: IMAGES.SCALABLE_1,
              alt: '...',
            }}
            image2={{
              src: IMAGES.SCALABLE_2,
              srcSet: IMAGES.SCALABLE_2,
              alt: '...',
            }}
            image3={{
              src: IMAGES.SCALABLE_3,
              srcSet: IMAGES.SCALABLE_3,
              alt: '...',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Spaces.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Spaces;
