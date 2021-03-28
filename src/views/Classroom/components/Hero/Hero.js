import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { HeroShaped } from 'components/organisms';
import { IMAGES } from 'configs';

const useStyles = makeStyles(() => ({
  root: {},
  image: {
    objectFit: 'cover',
  },
  fontWeight700: {
    fontWeight: 700,
  },
}));

const Hero = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <HeroShaped
        leftSide={
          <div>
            <SectionHeader
              title={
                <span>
                  <span className="text-highlighted__primary">
                  Pelajari keterampilan baru,
                  </span>{' '}
                  dapatkan lebih banyak pengalaman
                </span>
              }
              subtitle="Disini kita akan belajar bersama dengan mentor yang menyenangkan"
              align="left"
              titleVariant="h3"
            />
          </div>
        }
        rightSide={
          <Image
            src={IMAGES.CLASS_1}
            srcSet={IMAGES.CLASS_1}
            alt="..."
            className={classes.image}
            lazyProps={{
              width: '100%',
              height: '100%',
            }}
          />
        }
      />
    </div>
  );
};

Hero.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Hero;
