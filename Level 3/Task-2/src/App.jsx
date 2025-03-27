import React from "react";
import { Formik, Form, Field } from "formik";
import './App.css';

const App = () => {
  return (
    <div>
      <h1>Multi-Field Form</h1>
      <Formik
        initialValues={{ name: "", email: "", age: "" }} 
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
            </div>

            <div>
              <label htmlFor="age">Age:</label>
              <Field type="number" id="age" name="age" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
