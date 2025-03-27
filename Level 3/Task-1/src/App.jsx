import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import './App.css';

const App = () => {
  return (
    <div>
      <h1>Simple Form</h1>
      <Formik
        initialValues={{ name: "" }} 
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <Field type="text" id="name" name="name" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
