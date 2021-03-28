import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Button } from '@material-ui/core';
import {
  SectionHeader,
  SwiperImage,
  CountUpNumber,
} from 'components/molecules';
import { HeroShaped } from 'components/organisms';
import { IMAGES } from 'configs';

const useStyles = makeStyles(theme => ({
  root: {},
  swiperNavButton: {
    width: `${theme.spacing(3)}px !important`,
    height: `${theme.spacing(3)}px !important`,
    padding: `${theme.spacing(2)}px !important`,
  },
}));

const Hero = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <HeroShaped
        leftSide={
          <SectionHeader
            title={
              <span>
                Coworking Sukses{' '}
                <span className="text-highlighted__primary">Kolaborasi</span>
              </span>
            }
            subtitle="Working in our coworking space #TrackingSpace (TrasaMart Coworking) Space. "
            ctaGroup={[
              <CountUpNumber
                end={20}
                label="Ruang Public 20 kursi"
                textColor="secondary"
              />,
              <CountUpNumber end={15} label="Ruang Meeting 15 kursi" textColor="secondary" />,
            ]}
            align="left"
            titleVariant="h3"
          />
        }
        rightSide={
          <SwiperImage
            navigationButtonStyle={classes.swiperNavButton}
            items={[
              {
                src: IMAGES.HOME_SLIDER_1,
                srcSet: IMAGES.HOME_SLIDER_1,
                alt: '...',
              },
              {
                src: IMAGES.HOME_SLIDER_2,
                srcSet: IMAGES.HOME_SLIDER_2,
                alt: '...',
              },
              {
                src: IMAGES.HOME_SLIDER_3,
                srcSet: IMAGES.HOME_SLIDER_3,
                alt: '...',
              },
            ]}
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
