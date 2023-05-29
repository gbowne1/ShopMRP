import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { Formik, Form, Field } from "formik";
import { string, object } from "yup";
import AuthService from "../services/auth.service";
import Alert from "@mui/lab/Alert";
import logo from "../assets/spms_logo.webp";
import mainImage from "../assets/engineering-cogs.webp";
import { Hidden } from "@mui/material";
import { AppContext } from "../context/AppContext";

const validationSchema = object({
  username: string().required("Username is required"),
  password: string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter a password"),
});

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    marginTop: theme.spacing(8),
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    borderRadius: "10px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertMessage: {
    marginTop: theme.spacing(2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const { setIsAuthenticated } = useContext(AppContext);

  const initialValues = {
    username: "",
    password: "",
  };

  const Navigation = useNavigate();

  return (
    <Container
      component="main"
      maxWidth="lg"
      className={classes.outerContainer}
    >
      <Grid container direction="row" wrap="nowrap" alignItems="center">
        <Hidden smDown={true}>
          <Grid item md={8}>
            <img
              className={classes.logo}
              src={mainImage}
              alt="engineering cogs"
              width="100%"
            />
          </Grid>
        </Hidden>

        <Grid item xs={12} md={4}>
          <Container maxWidth="xs" className={classes.innerContainer}>
            <img
              className={classes.logo}
              src={logo}
              alt="company logo"
              width="100%"
            />
            <Typography variant="h5">Sign In</Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                AuthService.login(values.username, values.password).then(
                  () => {
                    setIsAuthenticated(true);
                    Navigation.push("/");
                  },
                  (error) => {
                    const resMessage =
                      (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                      error.message ||
                      error.toString();

                    setSubmitting(false);
                    setMessage(resMessage);
                  }
                );
              }}
            >
              {({ isValid, isSubmitting, dirty }) => (
                <Form className={classes.form}>
                  <Field name="username">
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }) => (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        type="text"
                        autoFocus
                        data-test="signin-username"
                        error={
                          (touched || value !== initialValue) && Boolean(error)
                        }
                        helperText={
                          touched || value !== initialValue ? error : ""
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Field name="password">
                    {({
                      field,
                      meta: { error, value, initialValue, touched },
                    }) => (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        data-test="signin-password"
                        error={
                          touched && value !== initialValue && Boolean(error)
                        }
                        helperText={
                          touched && value !== initialValue && touched
                            ? error
                            : ""
                        }
                        {...field}
                      />
                    )}
                  </Field>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    data-test="signin-submit"
                    disabled={!isValid || isSubmitting || !dirty}
                  >
                    Sign In
                  </Button>
                  {message && (
                    <Alert
                      data-test="signin-error"
                      severity="error"
                      className={classes.alertMessage}
                    >
                      {message}
                    </Alert>
                  )}
                </Form>
              )}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
