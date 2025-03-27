import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  items: Yup.array()
    .of(
      Yup.object({
        id: Yup.string().required("Missing unique key"),
        name: Yup.string().required("Item name is required"),
      })
    )
    .required("At least one item is required"),
});

const App = () => {
  const initialValues = {
    items: [
      { id: "1", name: "Item 1" },
      { id: "2", name: "Item 2" },
      { id: "2", name: "" },
    ],
  };

  return (
    <div>
      <h1>List with Unique Keys & Console Errors</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("✅ Form Data Submitted:", values);
        }}
      >
        {({ values, errors }) => {
          useEffect(() => {
            const ids = values.items.map((item) => item.id);
            const duplicateKeys = ids.filter((id, index) => ids.indexOf(id) !== index);

            if (duplicateKeys.length > 0) {
              console.error("❌ Duplicate Keys Found:", duplicateKeys);
            }

            values.items.forEach((item, index) => {
              if (!item.id) {
                console.error(`❌ Missing Key at Index ${index}`);
              }
              if (!item.name) {
                console.error(`❌ Missing Name at Index ${index}`);
              }
            });

            if (Object.keys(errors).length > 0) {
              console.error("❌ Form Errors:", errors);
            }
          }, [values, errors]);

          return (
            <Form>
              <ul>
                {values.items.map((item, index) => (
                  <li key={index}>
                    <Field type="text" name={`items[${index}].id`} placeholder="ID" />
                    <Field type="text" name={`items[${index}].name`} placeholder="Name" />
                    <ErrorMessage name={`items[${index}].id`} component="div" className="error" />
                    <ErrorMessage name={`items[${index}].name`} component="div" className="error" />
                  </li>
                ))}
              </ul>
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;
