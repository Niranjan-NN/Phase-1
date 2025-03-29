import React from "react";
import './App.css';
import FetchData from "./Components/FetchData.jsx";
import FormSubmit from "./Components/FormSubmit.jsx";
import AuthForm from "./Components/AuthForm.jsx";
import CrudOperations from "./Components/CrudOperations.jsx";
import { AppProvider } from "./Components/AppContext.jsx";

function App() {
  return (
    <AppProvider> 
      <div>
        <h1>React API Features</h1>
        <FetchData />
        <FormSubmit />
        <AuthForm />
        <CrudOperations />
      </div>
    </AppProvider>
  );
}

export default App;
