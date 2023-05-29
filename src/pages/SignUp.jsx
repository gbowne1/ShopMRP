import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field } from "formik";
import { string, object, ref } from "yup";
import Alert from "@material-ui/lab/Alert";
import logo from "../assets/spms_logo.png";
import AuthService from "../services/auth.service";

const validationSchema = object({
  email: string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  username: string().required("Username is required"),
  password: string()
    .min(4, "Password must contain at least 4 characters")
    .required("Enter your password"),
  confirmPassword: string()
    .required("Confirm your password")
    .oneOf([ref("password")], "Password does not match"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const SignUpForm = ({ authService }) => {
  const classes = useStyles();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box>
          <img
            className={classes.logo}
            src={logo}
            alt="company logo"
            width="100%"
          />
        </Box>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setFieldValue }) => {
            setSubmitting(true);

            AuthService.register(
              values.username,
              values.email,
              values.password
            ).then(
              (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
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
                setSuccessful(false);
              }
            );
          }}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Form className={classes.form}>
              <Field name="email">
                {({ field, meta: { error, value, initialValue, touched } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    data-test="signup-email"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="username">
                {({ field, meta: { error, value, initialValue, touched } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    data-test="signup-username"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta: { error, value, initialValue, touched } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    data-test="signup-password"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="confirmPassword">
                {({ field, meta: { error, value, initialValue, touched } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Confirm Password"
                    id="confirmPassword"
                    data-test="signup-confirmPassword"
                    type="password"
                    error={
                      (touched || value !== initialValue) && Boolean(error)
                    }
                    helperText={touched || value !== initialValue ? error : ""}
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
                data-test="signup-submit"
                disabled={!isValid || isSubmitting}
              >
                Sign Up
              </Button>
              {message && (
                <Alert
                  data-test="signin-error"
                  severity={successful ? "success" : "error"}
                  className={classes.alertMessage}
                >
                  {message}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default SignUpForm;
