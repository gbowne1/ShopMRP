import { useState, useEffect } from 'react';
import { Tabs, Tab } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function EmployeeCreate() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  useEffect(() => {
    formik.resetForm();
  }, [currentTab]);

  return (
    <div>
      <Tabs value={currentTab} onChange={handleTabChange}>
        <Tab label="Create Employee" />
        <Tab label="Update Employee" />
      </Tabs>
      {currentTab === 0 && (
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" value={formik.values.firstName} onChange={formik.handleChange} />
          {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" value={formik.values.lastName} onChange={formik.handleChange} />
          {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange} />
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="text" value={formik.values.phone} onChange={formik.handleChange} />
          {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}

          <label htmlFor="address">Address</label>
          <input id="address" name="address" type="text" value={formik.values.address} onChange={formik.handleChange} />
          {formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}

          <button type="submit">Submit</button>
        </form>
      )}
      {currentTab === 1 && (
        <form onSubmit={formik.handleSubmit}>
          // Update employee form goes here
        </form>
      )}
    </div>
  );
}