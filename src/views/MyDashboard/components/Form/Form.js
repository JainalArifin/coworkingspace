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
  root: {
    marginTop: 40,
  },
  form: {
    maxWidth: 550,
    margin: `0`,
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

const Form = ({ getData, userId, className, isOpen, ...rest }) => {
  const classes = useStyles();
  const [serverState, setServerState] = useState();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleServerResponse = (ok, msg) => {
    return setServerState({ ok, msg });
  };

  const handleUpdate = (values, actions) => {
    axios
      .put(`${SERVICES.UPDATE_MEMBER}/${userId}`, {
        ...values,
      })
      .then(({ data }) => {
        console.log({ data });
        if (data.message === 'Email sudah di gunakan') {
          actions.setSubmitting(false);
          return handleServerResponse(true, data.message);
        }
        actions.setSubmitting(false);
        actions.resetForm({});
        getData();
      })
      .catch(error => {
        console.log({ error });
        const { message } = error.response.data;
        actions.setSubmitting(false);
        handleServerResponse(true, message);
      });
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <SectionHeader
        title="Form"
        subtitle="Anda bisa mengubah akun anda"
        subtitleProps={{
          variant: 'body1',
          color: 'textPrimary',
        }}
        align={'left'}
      />
      <Formik
        initialValues={{
          email: '',
          password: '',
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
        onSubmit={handleUpdate}
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
            <div className={classes.form}>
              <Grid container spacing={isMd ? 4 : 2}>
                <Grid item xs={12}>
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

                <Grid item xs={12}>
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

                <Grid item xs={12}>
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
                    Update
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

Form.propTypes = {
  /**
   * External classes
   */
  className: PropTypes.string,
};

export default Form;
