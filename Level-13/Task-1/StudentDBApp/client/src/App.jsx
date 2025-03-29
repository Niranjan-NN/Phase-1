import React from 'react';
import StudentForm from './StudentForm';
import StudentList from './StudentList';

function App() {
    return (
        <div className="app-container">
            <h1>📚 Student Database Management</h1>
            <StudentForm />
            <StudentList />
        </div>
    );
}

export default App;
