import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './App.css';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, "Only alphabets are allowed")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  age: Yup.number()
    .positive("Age must be positive")
    .integer("Age must be a number")
    .required("Age is required"),
});

const App = () => {
  return (
    <div>
      <h1>Validated Form</h1>
      <Formik
        initialValues={{ name: "", email: "", age: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ handleSubmit, values }) => {
          if (values.name && !/^[A-Za-z ]*$/.test(values.name)) {
            console.log("Invalid Characters in Name:", values.name);
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

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;
