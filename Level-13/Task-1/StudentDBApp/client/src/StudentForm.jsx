import React, { useState } from 'react';

function StudentForm() {
    const [studentData, setStudentData] = useState({
        name: '',
        age: '',
        grade: '',
        subjects: '',
        address: {
            street: '',
            city: '',
            state: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('address')) {
            const field = name.split('.')[1];
            setStudentData((prev) => ({
                ...prev,
                address: { ...prev.address, [field]: value }
            }));
        } else {
            setStudentData({ ...studentData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert subjects to an array (comma-separated)
        const formattedData = {
            ...studentData,
            subjects: studentData.subjects.split(',').map((subject) => subject.trim())
        };

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/students/insertOne`, 
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formattedData)
                }
            );

            const responseData = await response.json();

            if (response.ok) {
                alert('✅ Student added successfully!');
            } else {
                alert(`❌ Failed to add student: ${responseData.error}`);
            }
        } catch (error) {
            console.error('❌ Error:', error);
            alert('❌ Error while adding student. Please check the console for details.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
            <input type="text" name="grade" placeholder="Grade" onChange={handleChange} required />
            <input 
                type="text" 
                name="subjects" 
                placeholder="Subjects (comma separated)" 
                onChange={handleChange} 
                required 
            />

            <h4>Address</h4>
            <input type="text" name="address.street" placeholder="Street" onChange={handleChange} required />
            <input type="text" name="address.city" placeholder="City" onChange={handleChange} required />
            <input type="text" name="address.state" placeholder="State" onChange={handleChange} required />

            <button type="submit">Add Student</button>
        </form>
    );
}

export default StudentForm;
