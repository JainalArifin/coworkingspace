import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Button } from '@material-ui/core';
import { SectionHeader, DescriptionCta } from 'components/molecules';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Application = props => {
  const { className, ...rest } = props;
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
            <span className="text-highlighted__primary">Apapun </span>
            yang tim Anda mungkin butuhkan.
          </span>
        }
        subtitle="Kami memastikan untuk memasukkan semua fasilitas dan kenyamanan yang mungkin dibutuhkan oleh startup yang sedang berkembang."
        align="left"
      />
      {/* <DescriptionCta
        title="Apply in 15 minutes"
        subtitle="Get your dream coworking space without the hassle."
        primaryCta={
          <Button
            variant="contained"
            color="primary"
            size={isMd ? 'large' : 'medium'}
          >
            Apply now
          </Button>
        }
        secondaryCta={
          <Button
            variant="outlined"
            color="primary"
            size={isMd ? 'large' : 'medium'}
          >
            Learn More
          </Button>
        }
        align={'left'}
      /> */}
    </div>
  );
};

Application.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Application;
