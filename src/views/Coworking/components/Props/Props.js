import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { useMediaQuery, Grid, Button, colors } from '@material-ui/core';
import { IconText } from 'components/atoms';
import { SectionHeader } from 'components/molecules';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Props = props => {
  const { data, className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        spacing={isMd ? 4 : 0}
        alignItems={isMd ? 'center' : 'flex-start'}
      >
        <Grid item xs={12} md={3} data-aos="fade-up">
          <SectionHeader
            title="Apa yang ada disini"
            fadeUp
            align={isMd ? 'left' : 'center'}
            disableGutter={isMd}
          />
        </Grid>
        <Grid item xs={12} md={9} data-aos="fade-up">
          <Grid container spacing={4}>
            {data.map((item, index) => (
              <Grid key={index} item xs={6} sm={4} data-aos={'fade-up'}>
                <Grid item container alignItems="center" xs={12} wrap="nowrap">
                  <IconText
                    fontIconClass={item.icon}
                    color={colors.indigo[500]}
                    title={item.title}
                  />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Props.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
  /**
   * data to be rendered
   */
  data: PropTypes.array.isRequired,
};

export default Props;
