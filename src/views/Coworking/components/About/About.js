import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  colors,
  Typography,
  Divider,
} from '@material-ui/core';
import { Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { HeroShaped, Section, CardBase } from 'components/organisms';
import { IMAGES } from 'configs';

const useStyles = makeStyles(theme => ({
  root: {},
  playStoreBtn: {
    maxWidth: 152,
  },
  cover: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
    },
  },
  coverImg: {
    objectFit: 'contain',
  },
  cardBase: {
    borderRadius: '35px',
    border: `2px solid ${colors.blueGrey[50]}`,
    maxWidth: 300,
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3, 0),
  },
  dot: {
    display: 'block',
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '100%',
    background: colors.grey[500],
    marginRight: theme.spacing(1),
    '&:last-child': {
      marginRight: 0,
    },
  },
  dotHighlighted: {
    background: colors.grey[900],
  },
  divider: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
}));

const About = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Section narrow>
        <Grid container spacing={isMd ? 4 : 2}>
          <Grid item xs={12} sm={6} data-aos="fade-up">
            <Grid container alignItems="flex-start" justify="center">
              <CardBase className={classes.cardBase} withShadow liftUp>
                <Image
                  src={IMAGES.MOBILE}
                  srcSet={IMAGES.MOBILE}
                  alt="mobile-app"
                  lazy={false}
                />
              </CardBase>
            </Grid>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            xs={12}
            sm={6}
            data-aos="fade-up"
          >
            <SectionHeader
              title={
                <span>
                  <span className="text-highlighted">MANY</span> FEATURES
                </span>
              }
              subtitle="Kami salah satu coworking space yang melakukan GoGreen dengan membuat aplikasi check in dan bisa memantau fasiliator atau mentor sedang berada di tempat kami, memantau event atau agenda yang sedang ada di tempat kami dengan menggunakan aplikasi dimana aplikasi tersebut memiliki QR Code, sekali scan member sudah bisa menikmati fasilitas kami. "
              label="ONE OF COWORKING SPACE KAB. TEGAL"
              subDesc="Bagi teman-teman / sedulur yang ingin menjadi member bisa download aplikasi kami di link berikut"
              ctaGroup={[
                <a
                  href="https://play.google.com/store/apps/details?id=com.trasacoworking.tegal"
                  target="blank"
                >
                  <Image
                    src="/gambar/mobile-addons/play-store.png"
                    alt="Get in on Play Market"
                    className={classes.playStoreBtn}
                    lazy={false}
                  />
                </a>,
              ]}
              align={isMd ? 'left' : 'center'}
              disableGutter
              titleVariant="h4"
            />
          </Grid>
        </Grid>
      </Section>
    </div>
  );
};

About.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default About;
