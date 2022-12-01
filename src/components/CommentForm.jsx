import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

function CommentForm({ setComments }) {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    if (!values.name) {
      errors.name = 'Required';
    } else if (values.name.length === 1 && values.name.length >= 20) {
      errors.name =
        'Name should have longer than 1 character and shorter than 20 characters ';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      body: '',
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post('https://jsonplaceholder.typicode.com/comments', {
          name: values.name,
          email: values.email,
          body: values.body,
        })
        .then((res) => setComments((prev) => [...prev, res.data]));
    },
  });

  return (
    <form className="form-group w-50 m-3" onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <label htmlFor="" className="form-label">
          Name
        </label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.name}
        />
      </div>
      {formik.touched.name && formik.errors.name ? (
        <div className="alert alert-danger">
          <p>{formik.errors.name}</p>
        </div>
      ) : null}
      <div className="form-group">
        <label htmlFor="" className="form-label">
          E-mail
        </label>
        <input
          type="text"
          id="email"
          name="email"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.email}
        />
      </div>
      {formik.touched.email && formik.errors.email ? (
        <div className="alert alert-danger">
          <p>{formik.errors.email}</p>
        </div>
      ) : null}
      <div className="form-group">
        <label htmlFor="" className="form-label">
          Text
        </label>
        <input
          type="text"
          id="body"
          name="body"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.body}
        />
        <button className="btn btn-primary m-3" type="submit">
          Submit
        </button>
        <button type="reset" onClick={(e) => formik.resetForm()}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
