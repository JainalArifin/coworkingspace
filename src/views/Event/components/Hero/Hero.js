import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  colors,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { Icon, Image } from 'components/atoms';
import { SectionHeader } from 'components/molecules';
import { Section } from 'components/organisms';
import { IMAGES } from 'configs';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: 'white',
    overflow: 'hidden',
  },
  image: {
    minHeight: 400,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  textWhite: {
    color: 'white',
    textShadow: '1px 3px 1px #5b2209'
  },
  title: {
    fontWeight: 'bold',
  },
  section: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: 0,
    paddingBottom: 0,
  },
  searchInputContainer: {
    background: 'white',
    padding: theme.spacing(2),
    boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.11)',
    borderRadius: theme.spacing(1),
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '0 !important',
    },
    '& .MuiInputAdornment-positionStart': {
      marginRight: theme.spacing(2),
    },
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: 0,
    },
    '& .MuiOutlinedInput-input': {
      padding: 0,
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  input: {
    background: 'white',
  },
  searchButton: {
    maxHeight: 45,
    minWidth: 135,
    [theme.breakpoints.down('sm')]: {
      minWidth: 'auto',
    },
  },
}));

const Hero = props => {
  const { className, search, handleChangeSearch, handleSearch, ...rest } = props;
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Image
        src={IMAGES.EVENT_1}
        srcSet={IMAGES.EVENT_1}
        alt="About"
        className={classes.image}
        lazyProps={{
          width: '100%',
          height: '100%',
        }}
      />
      <Section className={classes.section}>
        <SectionHeader
          title="Events"
          subtitle="Mari bergabung diacara agenda kita untuk meningkatkan skill"
          align="left"
          data-aos="fade-up"
          titleProps={{
            className: clsx(classes.title, classes.textWhite),
            variant: 'h3',
          }}
          subtitleProps={{
            className: classes.textWhite,
          }}
        />
        <div className={classes.searchInputContainer} data-aos="fade-up">
          <FormControl fullWidth variant="outlined">
            <OutlinedInput
              className={classes.input}
              size="large"
              startAdornment={
                <InputAdornment position="start">
                  <Icon
                    fontIconClass="fas fa-search"
                    fontIconColor={colors.blueGrey[900]}
                  />
                </InputAdornment>
              }
              placeholder="Search Event"
              name="search"
              value={search}
              onChange={handleChangeSearch}
            />
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            size="large"
            className={classes.searchButton}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </Section>
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
