import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './App.css'

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
    .positive("Age must be positive")
    .integer("Age must be a whole number")
    .required("Age is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

const App = () => {
  return (
    <div>
      <h1>Complex Form with Validation</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          age: "",
          password: "",
          confirmPassword: "",
          phone: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log("✅ Form Submitted Successfully:", values);
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, isSubmitting, errors }) => {
          if (Object.keys(errors).length > 0) {
            console.error("❌ Form Errors:", errors);
          }

          return (
            <Form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="age">Age:</label>
                <Field type="number" id="age" name="age" />
                <ErrorMessage name="age" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="phone">Phone:</label>
                <Field type="text" id="phone" name="phone" />
                <ErrorMessage name="phone" component="div" className="error" />
              </div>

              <div>
                <label htmlFor="address">Address:</label>
                <Field as="textarea" id="address" name="address" />
                <ErrorMessage name="address" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;
