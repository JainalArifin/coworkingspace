import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  useMediaQuery,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { SectionHeader } from 'components/molecules';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { SERVICES } from 'configs';

const useStyles = makeStyles(theme => ({
  root: {},
  form: {
    maxWidth: 550,
    margin: `0 auto`,
    '& .MuiTextField-root': {
      background: 'white',
    },
    '& .MuiOutlinedInput-input': {
      background: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      border: 'solid 1px rgba(0, 0, 0, 0.2)',
    },
  },
  inputTitle: {
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
}));

const FormRegister = props => {
  const { className, handleOpen, ...rest } = props;
  const [serverState, setServerState] = useState();

  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleServerResponse = (ok, msg) => {
    return setServerState({ ok, msg });
  };

  const handleRegister = (values, actions) => {
    axios
      .post(`${SERVICES.LOGIN_MEMBER}/register`, {
        ...values,
      })
      .then(({ data }) => {
        console.log({ data })
        if (data.message === 'Email sudah di gunakan') {
          actions.setSubmitting(false);
          return handleServerResponse(true, data.message);
        }
        console.log({ data })
        actions.setSubmitting(false);
        handleOpen('login');
      })
      .catch(error => {
        console.log({ error })
        const { message } = error.response.data;
        actions.setSubmitting(false);
        handleServerResponse(true, message);
      });
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="Form Register"
        subtitle="Register menggunakan email"
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        data-aos="fade-up"
        align={isMd ? 'center' : 'left'}
      />
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string()
            .max(45)
            .required('Fullname is required'),
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup.string()
            .max(255)
            .required('Password is required'),
        })}
        onSubmit={handleRegister}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            {serverState && (
              <p
                style={{ color: 'red' }}
                className={!serverState.ok ? 'errorMsg' : ''}
              >
                {serverState.msg}
              </p>
            )}
            <Grid container spacing={isMd ? 4 : 2}>
              <Grid item xs={12} data-aos="fade-up">
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  className={classes.inputTitle}
                >
                  Fullname
                </Typography>
                <TextField
                  error={Boolean(touched.fullName && errors.fullName)}
                  helperText={touched.fullName && errors.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  placeholder="Your Fullname"
                  variant="outlined"
                  size="medium"
                  name="fullName"
                  fullWidth
                  type="text"
                />
              </Grid>

              <Grid item xs={12} data-aos="fade-up">
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  className={classes.inputTitle}
                >
                  E-mail
                </Typography>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  placeholder="Your e-mail address"
                  variant="outlined"
                  size="medium"
                  name="email"
                  fullWidth
                  type="email"
                />
              </Grid>

              <Grid item xs={12} data-aos="fade-up">
                <Typography
                  variant="subtitle1"
                  color="textPrimary"
                  className={classes.inputTitle}
                >
                  Password
                </Typography>
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  placeholder="Your password"
                  variant="outlined"
                  size="medium"
                  name="password"
                  fullWidth
                  type="password"
                />
              </Grid>

              <Grid item container xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  size="large"
                  disabled={isSubmitting}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

FormRegister.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default FormRegister;
