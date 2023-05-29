import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import spmsAPI from "../apis/spms-erp";
import { getOne } from "../services/employee.service";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { Formik, Form, Field } from "formik";
import { string, object } from "yup";
import Alert from "@mui/lab/Alert";
import { Hidden, Snackbar } from "@mui/material";
import { AppContext } from "../context/AppContext";

const validationSchema = object({
  username: string().required("Username is required"),
  password: string()
    .min(8, "Password must contain at least 8 characters")
    .required("Enter a password"),
});

const useStyles = makeStyles((theme) => ({
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

const EmployeeDetail = (props) => {
  const classes = useStyles();
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  const [message, setMessage] = useState("");

  // retrieve employee with id when component mounts
  useEffect(() => {
    getOne(id)
      .then((response) => {
        setEmployee(() => response.data.recordset);
      })
      .catch((error) => {
        const errMsg =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(errMsg);
      });
  }, [id]);

  const initialValues = {
    id: employee.id,
    firstname: employee.firstname,
  };
  console.info(initialValues);

  return (
    <>
      {employee.id && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
          }}
        >
          {({ isValid, isSubmitting, dirty }) => (
            <Form className={classes.form}>
              <Field name="id">
                {({ field, meta: { error, value, initialValue, touched } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="id"
                    label="ID"
                    type="text"
                    disabled
                    helperText={touched || value !== initialValue ? error : ""}
                    {...field}
                  />
                )}
              </Field>
              <Field name="firstname">
                {({ field, meta: { error, value, initialValue, touched } }) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Firstname"
                    type="text"
                    id="firstname"
                    autoFocus
                    error={touched && value !== initialValue && Boolean(error)}
                    helperText={
                      touched && value !== initialValue && touched ? error : ""
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
                disabled={!isValid || isSubmitting || !dirty}
              >
                Update
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
      )}
    </>
  );
};

export default EmployeeDetail;