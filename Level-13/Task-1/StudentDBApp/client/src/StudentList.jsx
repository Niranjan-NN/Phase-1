import React, { useEffect, useState } from 'react';

function StudentList() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students`)
            .then((res) => res.json())
            .then((data) => setStudents(data));
    }, []);

    return (
        <div>
            <h2>📝 Student List</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        {student.name} - {student.grade} - {student.age} years old
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StudentList;
